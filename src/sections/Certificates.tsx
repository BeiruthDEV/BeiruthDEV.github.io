import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { certificates } from '../data'

/**
 * Lista tipográfica: cada certificado é uma linha grande. No desktop, uma prévia do PDF segue o
 * cursor; no celular, a miniatura aparece dentro da própria linha.
 */
export default function Certificates() {
  const [hover, setHover] = useState<number | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.4 })
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.4 })

  // posiciona a prévia ao lado do cursor; ao aparecer, pula direto (sem deslizar desde o canto)
  const place = (clientX: number, clientY: number, instant: boolean) => {
    mx.set(clientX + 28)
    my.set(clientY - 110)
    if (instant) {
      x.jump(clientX + 28)
      y.jump(clientY - 110)
    }
  }

  return (
    <section
      id="certificados"
      className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40"
      onMouseMove={(e) => place(e.clientX, e.clientY, false)}
    >
      <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ember">( 05 ) Certificações</p>
      <h2 className="display text-[clamp(3rem,10vw,9rem)]">
        Sempre
        <br />
        <span className="text-mute">aprendendo</span>
        <span className="text-ember">.</span>
      </h2>

      <ul className="mt-16 border-t border-line" onMouseLeave={() => setHover(null)}>
        {certificates.map((cert, i) => (
          <li key={cert.title} className="border-b border-line">
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir certificado ${cert.title} (PDF)`}
              onMouseEnter={(e) => {
                place(e.clientX, e.clientY, hover === null)
                setHover(i)
              }}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="group grid items-center gap-x-8 gap-y-3 py-7 sm:grid-cols-[3rem_1fr_auto_2.5rem]"
            >
              <span className="hidden font-mono text-xs text-mute sm:block">{String(i + 1).padStart(2, '0')}</span>
              <span className="display text-3xl !leading-[1.05] !tracking-[-0.03em] transition-colors duration-300 group-hover:text-ember sm:text-5xl">
                {cert.title}
              </span>
              <span className="font-mono text-xs text-mute sm:text-right">
                {cert.issuer} · {cert.year}
                <span className="mt-1 block text-[11px] normal-case tracking-normal text-mute/80">{cert.detail}</span>
              </span>
              <ArrowUpRight className="hidden size-6 text-mute transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ember sm:block" aria-hidden="true" />
              <img src={cert.image} alt="" loading="lazy" className="mt-2 aspect-[4/3] w-48 rounded-lg border border-line object-cover sm:hidden" />
            </a>
          </li>
        ))}
      </ul>

      {/* Prévia que segue o cursor (só com mouse) */}
      <AnimatePresence>
        {hover !== null && (
          <motion.div
            key="preview"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none fixed left-0 top-0 z-30 hidden w-72 overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] [@media(hover:hover)]:block"
            aria-hidden="true"
          >
            <img src={certificates[hover].image} alt="" className="aspect-[4/3] w-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
