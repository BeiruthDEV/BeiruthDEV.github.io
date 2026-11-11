import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  siDjango,
  siDocker,
  siExpo,
  siFastapi,
  siGit,
  siJavascript,
  siKotlin,
  siMongodb,
  siMysql,
  siNextdotjs,
  siPostgresql,
  siPython,
  siRabbitmq,
  siReact,
  siRedis,
  siSpringboot,
  siSupabase,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons'
import { useReducedMotion } from '../lib'

type Tech = { name: string; icon?: SimpleIcon; image?: string }

// O logo do Java não existe na biblioteca simple-icons, então vem de um arquivo SVG local (public/img/tech)
// A posição na lista define o ponto na esfera: os do meio (índices 9 e 10) ficam no equador e passam pela frente com força total, por isso o Java está ali
const techs: Tech[] = [
  { name: 'Python', icon: siPython },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'Kotlin', icon: siKotlin },
  { name: 'FastAPI', icon: siFastapi },
  { name: 'Redis', icon: siRedis },
  { name: 'Next.js', icon: siNextdotjs },
  { name: 'PostgreSQL', icon: siPostgresql },
  { name: 'Docker', icon: siDocker },
  { name: 'React Native / Expo', icon: siExpo },
  { name: 'Java', image: 'img/tech/java.svg' },
  { name: 'React', icon: siReact },
  { name: 'Django', icon: siDjango },
  { name: 'MongoDB', icon: siMongodb },
  { name: 'RabbitMQ', icon: siRabbitmq },
  { name: 'Spring Boot', icon: siSpringboot },
  { name: 'Supabase', icon: siSupabase },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'MySQL', icon: siMysql },
  { name: 'JavaScript', icon: siJavascript },
  { name: 'Git', icon: siGit },
]

type Vec = [number, number, number]

const normalize = ([x, y, z]: Vec): Vec => {
  const len = Math.hypot(x, y, z) || 1
  return [x / len, y / len, z / len]
}

/**
 * Distribui n pontos sobre a esfera (espiral de Fibonacci), sem usar as calotas dos polos.
 * A esfera só gira no eixo vertical, então um logo perto do polo ficaria sempre no fundo,
 * pequeno e apagado, sem nunca passar para a frente.
 */
function fibonacciSphere(n: number, band = 0.8): Vec[] {
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const y = (1 - ((i + 0.5) / n) * 2) * band
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    return [Math.cos(theta) * r, y, Math.sin(theta) * r] as Vec
  })
}

/** Malha geodésica: icosaedro subdividido; devolve vértices e arestas únicas. */
function geodesicMesh(level: number) {
  const t = (1 + Math.sqrt(5)) / 2
  const verts: Vec[] = (
    [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
    ] as Vec[]
  ).map(normalize)

  let faces: [number, number, number][] = [
    [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
    [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
    [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
    [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
  ]

  const cache = new Map<string, number>()
  const midpoint = (a: number, b: number) => {
    const key = a < b ? `${a}_${b}` : `${b}_${a}`
    const hit = cache.get(key)
    if (hit !== undefined) return hit
    const [ax, ay, az] = verts[a]
    const [bx, by, bz] = verts[b]
    verts.push(normalize([ax + bx, ay + by, az + bz]))
    cache.set(key, verts.length - 1)
    return verts.length - 1
  }

  for (let l = 0; l < level; l++) {
    faces = faces.flatMap(([a, b, c]) => {
      const ab = midpoint(a, b)
      const bc = midpoint(b, c)
      const ca = midpoint(c, a)
      return [
        [a, ab, ca],
        [b, bc, ab],
        [c, ca, bc],
        [ab, bc, ca],
      ] as [number, number, number][]
    })
  }

  const edgeKeys = new Set<string>()
  const edges: [number, number][] = []
  for (const [a, b, c] of faces) {
    for (const [p, q] of [[a, b], [b, c], [c, a]] as [number, number][]) {
      const key = p < q ? `${p}_${q}` : `${q}_${p}`
      if (!edgeKeys.has(key)) {
        edgeKeys.add(key)
        edges.push([p, q])
      }
    }
  }
  return { verts, edges }
}

const logoPoints = fibonacciSphere(techs.length)
const mesh = geodesicMesh(2)

/** Logos escuros demais somem no fundo preto: nesses casos usa um cinza claro. */
function markColor(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luminance < 0.22 ? '#ececf1' : `#${hex}`
}

function TechMark({ tech }: { tech: Tech }) {
  if (tech.icon) {
    return (
      <svg viewBox="0 0 24 24" className="size-full" aria-hidden="true">
        <path d={tech.icon.path} fill={markColor(tech.icon.hex)} />
      </svg>
    )
  }
  return <img src={tech.image} alt="" draggable={false} className="size-full object-contain" />
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

/**
 * Esfera 3D interativa: os logos giram sobre uma malha de arame. Os da frente ficam grandes e
 * nítidos, os de trás somem. Passar o mouse pausa e mostra o nome; arrastar gira à mão.
 */
export default function SkillSphere() {
  const reduced = useReducedMotion()
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const logos = useRef<(HTMLSpanElement | null)[]>([])
  const [active, setActive] = useState<number | null>(null)

  // estado da animação fica em refs para não re-renderizar a cada quadro
  const rot = useRef({ x: -0.3, y: 0 })
  const velocity = useRef(0)
  const hovered = useRef<number | null>(null)
  const drag = useRef<{ on: boolean; x: number; y: number; t: number }>({ on: false, x: 0, y: 0, t: 0 })
  const visible = useRef(true)

  const setHover = (index: number | null) => {
    hovered.current = index
    setActive(index)
  }

  useEffect(() => {
    const el = box.current
    const cv = canvas.current
    if (!el || !cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let size = el.clientWidth
    const resize = () => {
      size = el.clientWidth
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(size * dpr)
      cv.height = Math.round(size * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw()
    })
    resizeObserver.observe(el)

    const io = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
    })
    io.observe(el)

    const rotate = (p: Vec, sx: number, cx: number, sy: number, cy: number): Vec => {
      const x1 = p[0] * cy + p[2] * sy
      const z1 = -p[0] * sy + p[2] * cy
      const y1 = p[1] * cx - z1 * sx
      const z2 = p[1] * sx + z1 * cx
      return [x1, y1, z2]
    }

    function draw() {
      const { x, y } = rot.current
      const sx = Math.sin(x), cx = Math.cos(x), sy = Math.sin(y), cy = Math.cos(y)
      const radius = size * 0.36
      const mid = size / 2

      ctx!.clearRect(0, 0, size, size)

      // malha de arame, mais clara onde está de frente
      const projected = mesh.verts.map((v) => rotate(v, sx, cx, sy, cy))
      ctx!.lineWidth = 1
      for (const [a, b] of mesh.edges) {
        const pa = projected[a]
        const pb = projected[b]
        const depth = (pa[2] + pb[2]) / 2
        ctx!.strokeStyle = `rgba(167,139,250,${(0.05 + 0.17 * ((depth + 1) / 2)).toFixed(3)})`
        ctx!.beginPath()
        ctx!.moveTo(mid + pa[0] * radius, mid + pa[1] * radius)
        ctx!.lineTo(mid + pb[0] * radius, mid + pb[1] * radius)
        ctx!.stroke()
      }
      ctx!.strokeStyle = 'rgba(167,139,250,0.22)'
      ctx!.beginPath()
      ctx!.arc(mid, mid, radius, 0, Math.PI * 2)
      ctx!.stroke()

      // logos: posição, escala e opacidade pela profundidade
      logoPoints.forEach((point, i) => {
        const item = logos.current[i]
        if (!item) return
        const [px, py, pz] = rotate(point, sx, cx, sy, cy)
        const t = (pz + 1) / 2 // 0 = atrás, 1 = na frente
        const scale = 0.55 + 0.6 * t
        item.style.transform = `translate(-50%, -50%) translate(${px * radius * 1.08}px, ${py * radius * 1.08}px) scale(${scale.toFixed(3)})`
        item.style.opacity = (0.12 + 0.88 * Math.pow(t, 1.4)).toFixed(3)
        item.style.zIndex = String(Math.round(t * 100))
        item.style.pointerEvents = t > 0.45 ? 'auto' : 'none'
      })
    }

    let raf = 0
    let last = performance.now()
    const autoSpin = reduced ? 0 : 0.32 // rad/s

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!visible.current) return

      if (!drag.current.on) {
        const target = hovered.current !== null ? 0 : autoSpin
        velocity.current += (target - velocity.current) * Math.min(1, dt * 4)
        rot.current.y += velocity.current * dt
      }
      draw()
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      io.disconnect()
    }
  }, [reduced])

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { on: true, x: e.clientX, y: e.clientY, t: performance.now() }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d.on) return
    const now = performance.now()
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    rot.current.y += dx * 0.008
    rot.current.x = clamp(rot.current.x + dy * 0.008, -1.1, 1.1)
    velocity.current = clamp((dx * 0.008) / Math.max(0.001, (now - d.t) / 1000), -4, 4)
    drag.current = { on: true, x: e.clientX, y: e.clientY, t: now }
  }
  const onPointerUp = () => {
    drag.current.on = false
  }

  return (
    <section id="stack" className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-40">
      {/* halo atrás da esfera */}
      <div
        className="pointer-events-none absolute left-1/2 top-[62%] size-[min(130vw,980px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16),rgba(255,107,53,0.06)_45%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ember">( 04 ) Stack</p>
          <h2 className="display text-[clamp(3rem,9vw,8rem)]">
            Minhas{' '}
            <span className="bg-gradient-to-r from-lilac to-ember bg-clip-text text-transparent">skills</span>
            <span className="text-ember">.</span>
          </h2>
        </motion.header>

        <div
          ref={box}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="relative mx-auto mt-6 aspect-square w-[min(92vw,600px)] cursor-grab touch-pan-y select-none active:cursor-grabbing"
          aria-hidden="true"
        >
          <canvas ref={canvas} className="absolute inset-0 size-full" />
          {techs.map((tech, i) => (
            <span
              key={tech.name}
              ref={(el) => {
                logos.current[i] = el
              }}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover(null)}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <span
                className={`block size-10 transition-[filter] duration-300 sm:size-12 ${
                  active === i ? 'drop-shadow-[0_0_16px_rgba(255,255,255,0.6)]' : ''
                }`}
              >
                <TechMark tech={tech} />
              </span>
              <span
                className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ember px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink transition-opacity duration-200 ${
                  active === i ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {tech.name}
              </span>
            </span>
          ))}
        </div>

        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-widest text-mute">
          <span className="sm:hidden">arraste para girar</span>
          <span className="hidden sm:inline">arraste para girar · passe o mouse para ver o nome</span>
        </p>

        <ul className="sr-only">
          {techs.map((tech) => (
            <li key={tech.name}>{tech.name}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
