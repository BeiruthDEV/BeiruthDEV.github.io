import { lazy, Suspense, useRef, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, FileText } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from '../components/BrandIcons'
import { scrollToSection } from '../lib'
import { profile } from '../data'

// O fundo 3D fica num pacote separado para não atrasar o primeiro carregamento
const WaveField = lazy(() => import('../components/WaveField'))

const ease = [0.22, 1, 0.36, 1] as const

/** Linha do título: sobe de dentro de uma máscara, uma de cada vez. */
function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span className="block" initial={{ y: '108%' }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease }}>
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} id="inicio" className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-10 pt-24 sm:px-8">
      {/* Malha 3D que some na base para encontrar a próxima seção */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" aria-hidden="true">
        <Suspense fallback={null}>
          <WaveField paused={!inView} />
        </Suspense>
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px]">
        <motion.p
          style={{ opacity: fade }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 max-w-[16rem] font-mono text-[11px] uppercase leading-relaxed tracking-wider text-mute"
        >
          {profile.role}
          <br />
          {profile.location}
        </motion.p>

        <motion.h1 style={{ y: titleY }} className="display text-[clamp(4.25rem,19.5vw,17rem)]">
          <Line delay={0.1}>Matheus</Line>
          <Line delay={0.22}>
            <span className="bg-gradient-to-r from-ember via-ember-soft to-lilac bg-clip-text text-transparent">Beiruth</span>
            <span className="text-ember">.</span>
          </Line>
        </motion.h1>

        <motion.div
          style={{ opacity: fade }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease }}
          className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
        >
          <button
            type="button"
            onClick={() => scrollToSection('sobre')}
            className="group flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-mute transition-colors hover:text-text"
          >
            Role para entrar
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" aria-hidden="true" />
          </button>

          <div className="max-w-md md:text-right">
            <p className="text-lg leading-snug text-text/90">
              Apps, APIs e sistemas web, da interface à camada de dados, com <span className="text-ember">clareza técnica</span>.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 md:justify-end">
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-ember-soft"
              >
                Currículo <FileText className="size-4" aria-hidden="true" />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2.5 text-sm backdrop-blur transition hover:border-ember/60"
              >
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2.5 text-sm backdrop-blur transition hover:border-ember/60"
              >
                <GitHubIcon className="size-4" /> GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
