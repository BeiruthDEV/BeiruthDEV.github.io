import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '../lib'

/*
  Fundo 3D: uma malha de pontos que ondula como um relevo,
  com gradiente lilás → brasa. O mouse inclina a malha e move a câmera de leve.
*/

const COLS = 150
const ROWS = 64
const WIDTH = 30
const DEPTH = 15

function height(x: number, z: number, t: number) {
  return (
    Math.sin(x * 0.42 + t * 0.7) * 0.42 +
    Math.cos(z * 0.68 + t * 0.55) * 0.3 +
    Math.sin((x + z) * 0.22 - t * 0.35) * 0.32
  )
}

function Field({ animate }: { animate: boolean }) {
  const points = useRef<THREE.Points>(null)
  const pointer = useRef({ x: 0, y: 0 })

  const { positions, colors } = useMemo(() => {
    const count = COLS * ROWS
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const lilac = new THREE.Color('#a78bfa')
    const ember = new THREE.Color('#ff6b35')
    const color = new THREE.Color()
    let i = 0
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const x = (col / (COLS - 1) - 0.5) * WIDTH
        const z = (row / (ROWS - 1) - 0.5) * DEPTH
        positions[i * 3] = x
        positions[i * 3 + 1] = height(x, z, 0)
        positions[i * 3 + 2] = z
        // gradiente na diagonal, apagando nas bordas do fundo
        const mix = Math.min(1, Math.max(0, col / (COLS - 1) * 0.8 + (1 - row / (ROWS - 1)) * 0.35))
        const fade = 0.35 + 0.65 * (row / (ROWS - 1))
        color.copy(lilac).lerp(ember, mix).multiplyScalar(fade)
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b
        i++
      }
    }
    return { positions, colors }
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((state) => {
    const mesh = points.current
    if (!mesh) return

    if (animate) {
      const t = state.clock.elapsedTime
      const attr = mesh.geometry.getAttribute('position') as THREE.BufferAttribute
      const arr = attr.array as Float32Array
      for (let i = 0; i < arr.length; i += 3) arr[i + 1] = height(arr[i], arr[i + 2], t)
      attr.needsUpdate = true
    }

    const { x, y } = pointer.current
    mesh.rotation.z += (x * 0.06 - mesh.rotation.z) * 0.05
    mesh.rotation.x += (y * 0.05 - mesh.rotation.x) * 0.05
    state.camera.position.x += (x * 0.8 - state.camera.position.x) * 0.03
    state.camera.lookAt(0, -0.4, 0)
  })

  return (
    <points ref={points} position={[0, -1.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/** `paused` para de desenhar quando o fundo sai da tela, poupando bateria e GPU. */
export default function WaveField({ paused = false }: { paused?: boolean }) {
  const reduced = useReducedMotion()
  const running = !reduced && !paused
  return (
    <Canvas
      camera={{ position: [0, 2.2, 7.5], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      frameloop={running ? 'always' : 'demand'}
      aria-hidden="true"
    >
      <fog attach="fog" args={['#0b0b10', 6, 16]} />
      <Field animate={running} />
    </Canvas>
  )
}
