import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function GlowingMesh() {
  const meshRef = useRef()
  const { pointer } = useThree()

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x += 0.001

    // Subtle mouse reactivity
    meshRef.current.rotation.x += (pointer.y * 0.3 - meshRef.current.rotation.x) * 0.02
    meshRef.current.rotation.y += (pointer.x * 0.3 - meshRef.current.rotation.y) * 0.02
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={2.2}>
        <torusKnotGeometry args={[1, 0.35, 128, 16, 3, 4]} />
        <MeshDistortMaterial
          color="#ff4a57"
          emissive="#ff4a57"
          emissiveIntensity={0.1}
          roughness={0.4}
          metalness={0.6}
          wireframe
          transparent
          opacity={0.75}
          distort={0.12}
          speed={1.5}
        />
      </mesh>
    </Float>
  )
}

const PARTICLE_COUNT = 80
const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
  particlePositions[i] = (Math.random() - 0.5) * 12
  particlePositions[i + 1] = (Math.random() - 0.5) * 12
  particlePositions[i + 2] = (Math.random() - 0.5) * 8
}

function BackgroundParticles() {
  const ref = useRef()

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0003
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particlePositions}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff707b"
        size={0.03}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ff4a57" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#ff707b" />

      <GlowingMesh />
      <BackgroundParticles />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
          intensity={0.2}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  )
}
