import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { profile } from '../data'

const statement =
  'Sou desenvolvedor full-stack e graduando em Engenharia de Software. Construo apps mobile, APIs e sistemas web, transformando regras de negócio em código consistente e dados em interfaces fáceis de entender.'

const words = statement.split(' ')

function Word({ word, index, progress }: { word: string; index: number; progress: MotionValue<number> }) {
  const start = index / words.length
  const end = start + 1 / words.length
  const opacity = useTransform(progress, [start, end], [0.16, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.22em] inline-block">
      {word}
    </motion.span>
  )
}

const facts = [
  { label: 'Foco', value: profile.focus },
  { label: 'Stack', value: profile.stackLine },
  { label: 'Formação', value: 'Engenharia de Software, Universidade de Vassouras · 7º período, conclusão em julho de 2027' },
  { label: 'IA no dia a dia', value: 'Codex, Claude e Gemini para gerar, revisar e refatorar código, depurar e documentar' },
  { label: 'Status', value: profile.status },
]

/** Parágrafo grande que "acende" palavra por palavra conforme a rolagem, seguido de uma ficha curta. */
export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })

  return (
    <section ref={ref} id="sobre" className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40">
      <p className="mb-8 font-mono text-[11px] uppercase tracking-widest text-ember">( 01 ) Sobre</p>

      <p className="display text-[clamp(2rem,5.6vw,5.25rem)] !leading-[1.04] !tracking-[-0.035em]" aria-label={statement}>
        {words.map((word, i) => (
          <Word key={`${word}-${i}`} word={word} index={i} progress={scrollYProgress} />
        ))}
      </p>

      <div className="mt-20 grid gap-12 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
        <motion.figure
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xs justify-self-start"
        >
          <div className="overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-ember/30 via-panel-2 to-lilac/30 p-1.5">
            <img src={profile.photo} alt={`Retrato de ${profile.name}`} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
          </div>
          <figcaption className="mt-3 flex items-center gap-2 font-mono text-[11px] text-mute">
            <MapPin className="size-3.5 text-ember" aria-hidden="true" />
            {profile.location}
          </figcaption>
        </motion.figure>

        <dl className="divide-y divide-line self-end border-y border-line">
          {facts.map((fact) => (
            <div key={fact.label} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="font-mono text-[11px] uppercase tracking-widest text-mute">{fact.label}</dt>
              <dd className="text-lg text-text/90">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
