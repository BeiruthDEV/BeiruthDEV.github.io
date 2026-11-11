import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from '../lib'
import { projects, type Project } from '../data'

function Card({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir ${project.name} (${project.urlLabel})`}
      className="group block w-[82vw] shrink-0 snap-center sm:w-[60vw] lg:w-[min(44vw,640px)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-panel">
        <img
          src={project.image}
          alt={`Tela do projeto ${project.name}`}
          loading="lazy"
          className="size-full object-cover object-top transition duration-700 group-hover:scale-[1.04] [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-2.5 py-1 font-mono text-[11px] text-text backdrop-blur">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-ember text-ink opacity-0 transition duration-300 group-hover:opacity-100">
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto] items-start gap-x-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-mute">{project.category}</p>
          <h3 className="display mt-2 text-3xl !leading-none !tracking-[-0.03em] transition-colors group-hover:text-ember sm:text-4xl">
            {project.name}
          </h3>
        </div>
        <ul className="mt-1 flex max-w-[14rem] flex-wrap justify-end gap-1.5" aria-label="Tecnologias">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-text/80">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">{project.description}</p>
    </a>
  )
}

/**
 * Galeria horizontal. Em telas largas a seção "fixa" na tela e a rolagem vertical desloca os
 * cards para o lado. No celular (ou com movimento reduzido) vira uma fileira rolável com encaixe.
 */
// Quantos pixels de rolagem vertical valem 1 px de deslocamento lateral. Acima de 1, a galeria anda mais devagar.
const SLOWDOWN = 1.7

export default function Work() {
  const reduced = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const distance = useRef(0)
  const [pinned, setPinned] = useState(false)
  const [height, setHeight] = useState<number | undefined>(undefined)

  const x = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const measure = () => {
      const canPin = window.innerWidth >= 1024 && !reduced
      setPinned(canPin)
      if (!canPin || !track.current) {
        setHeight(undefined)
        distance.current = 0
        x.set(0)
        return
      }
      distance.current = Math.max(0, track.current.scrollWidth - window.innerWidth)
      setHeight(window.innerHeight + distance.current * SLOWDOWN)
      x.set(-scrollYProgress.get() * distance.current)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(document.documentElement)
    if (track.current) observer.observe(track.current)
    return () => observer.disconnect()
  }, [reduced, scrollYProgress, x])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (pinned) x.set(-p * distance.current)
  })

  return (
    <section ref={section} id="trabalhos" style={{ height }} className="relative">
      <div className={pinned ? 'sticky top-0 flex h-svh flex-col justify-center overflow-hidden' : 'py-24'}>
        <header className="mx-auto mb-10 flex w-full max-w-[1400px] flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ember">( 02 ) Projetos</p>
            <h2 className="display text-[clamp(3rem,9vw,8rem)]">
              O que <span className="text-mute">construí</span>
              <span className="text-ember">.</span>
            </h2>
          </div>
          {pinned && (
            <div className="w-40" aria-hidden="true">
              <p className="mb-2 text-right font-mono text-[11px] text-mute">arraste a rolagem →</p>
              <div className="h-px bg-line">
                <motion.div style={{ width: progressWidth }} className="h-px bg-ember" />
              </div>
            </div>
          )}
        </header>

        {pinned ? (
          <motion.div ref={track} style={{ x }} className="flex w-max items-start gap-8 pl-[max(2rem,calc((100vw-1400px)/2+2rem))] pr-[20vw]">
            {projects.map((project, i) => (
              <Card key={project.slug} project={project} index={i} />
            ))}
          </motion.div>
        ) : (
          <div ref={track} className="no-scrollbar flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-5 pb-4 sm:px-8">
            {projects.map((project, i) => (
              <Card key={project.slug} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
