/**
 * BHARATH M PORTFOLIO — Express Backend
 *
 * SETUP:
 *   1. npm install
 *   2. npm run dev          (Vite dev server with API proxy — for development)
 *   3. npm run build        (build React for production)
 *   4. node server.js       (serves built React app + API — for production)
 *
 * In development, Vite's dev server proxies /api/* to this Express server.
 * In production, Express serves the built dist/ folder directly.
 */

import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// --- Data file setup ---
const DATA_DIR = path.join(import.meta.dirname, 'data')
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json')
const VISITORS_FILE = path.join(DATA_DIR, 'visitors.json')

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR)
if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]', 'utf8')
if (!fs.existsSync(VISITORS_FILE)) fs.writeFileSync(VISITORS_FILE, JSON.stringify({ count: 124 }), 'utf8')

function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')) }
  catch { return null }
}

function writeJSON(file, data) {
  try { fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8'); return true }
  catch { return false }
}

// --- API Routes ---

/** GET /api/visitors — Increment and return visitor count */
app.get('/api/visitors', (req, res) => {
  const data = readJSON(VISITORS_FILE) || { count: 0 }
  data.count = (data.count || 0) + 1
  writeJSON(VISITORS_FILE, data)
  res.json({ count: data.count })
})

/** POST /api/contact — Save contact message */
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' })
  }

  const messages = readJSON(MESSAGES_FILE) || []
  messages.push({
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
    name, email, message,
    timestamp: new Date().toISOString(),
  })

  if (writeJSON(MESSAGES_FILE, messages)) {
    res.status(201).json({ success: true, message: 'Message saved.' })
  } else {
    res.status(500).json({ error: 'Failed to save message.' })
  }
})

/** GET /api/messages — List all messages (admin) */
app.get('/api/messages', (req, res) => {
  res.json(readJSON(MESSAGES_FILE) || [])
})

/** GET /api/admin/stats — Retrieve statistics (visitors count and messages count) without incrementing */
app.get('/api/admin/stats', (req, res) => {
  const visitorData = readJSON(VISITORS_FILE) || { count: 0 }
  const messages = readJSON(MESSAGES_FILE) || []
  res.json({
    visitors: visitorData.count,
    messagesCount: messages.length
  })
})

/** DELETE /api/messages/:id — Delete a specific message */
app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params
  const messages = readJSON(MESSAGES_FILE) || []
  const filtered = messages.filter(m => m.id !== id)
  if (writeJSON(MESSAGES_FILE, filtered)) {
    res.json({ success: true, message: 'Message deleted.' })
  } else {
    res.status(500).json({ error: 'Failed to delete message.' })
  }
})

// --- Serve React build in production ---
const distPath = path.join(import.meta.dirname, 'dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get(/.*/, (req, res) => res.sendFile(path.join(distPath, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`\n  Portfolio API running → http://localhost:${PORT}\n`)
})
