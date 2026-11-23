import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { scrollToSection } from '../lib'
import { profile } from '../data'

const ease = [0.22, 1, 0.36, 1] as const

const WORD = 'BEIRUTH'

// Cada letra do nome gigante tem a sua cor, num degradê do lilás ao laranja
const FROM = [167, 139, 250]
const TO = [255, 107, 53]
function letterColor(index: number, total: number) {
  const t = total > 1 ? index / (total - 1) : 0
  return `rgb(${FROM.map((f, k) => Math.round(f + (TO[k] - f) * t)).join(',')})`
}

/**
 * Hero em camadas: nome gigante espaçado de ponta a ponta, o personagem na frente cortando as
 * letras, e dois blocos de texto nos cantos de baixo.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const wordY = useTransform(scrollYProgress, [0, 1], ['0px', '-90px'])
  const mascotY = useTransform(scrollYProgress, [0, 1], ['0px', '70px'])

  return (
    <section ref={ref} id="inicio" className="relative isolate h-svh min-h-[640px] overflow-hidden">
      {/* brilho suave atrás do personagem, para o moletom preto não sumir no fundo */}
      <div
        className="pointer-events-none absolute left-1/2 top-[48%] -z-10 size-[min(120vw,85svh)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.2),rgba(255,107,53,0.07)_46%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* nome gigante, atrás do personagem */}
      <motion.h1
        style={{ y: wordY }}
        className="absolute inset-x-[2.5vw] top-[10svh] z-0 flex select-none justify-between font-condensed text-[min(30vw,56svh)] font-extralight leading-[0.8]"
      >
        <span className="sr-only">{profile.name}</span>
        {[...WORD].map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            aria-hidden="true"
            style={{ color: letterColor(i, WORD.length) }}
            initial={{ opacity: 0, y: '16%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 + i * 0.07, ease }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      {/* personagem: some na base para se misturar com o fundo */}
      <motion.img
        src={profile.mascot}
        alt="Ilustração de Matheus Beiruth em estilo chibi: cabelo cacheado, barba e moletom preto, de braços cruzados"
        width={1302}
        height={1208}
        style={{ y: mascotY }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease }}
        className="absolute bottom-0 left-1/2 z-10 h-[68%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_68%,transparent)] sm:h-[90%]"
      />

      {/* textos dos cantos */}
      <div className="absolute inset-x-5 bottom-[9svh] z-20 grid items-end gap-7 sm:inset-x-[3vw] md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7, ease }}>
          <p className="mb-5 hidden text-[10px] uppercase tracking-[0.18em] text-mute sm:block">
            {profile.role} · {profile.location.split(',')[0]}, RJ
          </p>
          <p className="font-condensed text-[clamp(2.3rem,5.4vw,5.4rem)] font-light uppercase leading-[1.12] tracking-[0.03em] text-text">
            Da interface à
            <br />
            camada de <span className="text-ember">dados</span>
          </p>
        </motion.div>

        <motion.div
          className="md:max-w-[26rem] md:justify-self-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
        >
          <p className="hidden text-[11px] uppercase leading-[1.9] tracking-[0.12em] text-text/80 sm:block">
            Apps mobile, APIs e sistemas web com {profile.stackLine.replace(/ · /g, ', ')}. Estudante de Engenharia de Software, em busca de estágio ou vaga júnior.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:mt-6">
            <button
              type="button"
              onClick={() => scrollToSection('trabalhos')}
              className="inline-flex items-center gap-3 bg-ember px-5 py-3.5 text-[10px] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ember-soft"
            >
              Ver projetos
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </button>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-text/70 pb-0.5 text-[10px] uppercase tracking-[0.16em] text-text transition-colors hover:border-ember hover:text-ember"
            >
              Baixar currículo
            </a>
          </div>
        </motion.div>
      </div>

      {/* rodapé da hero */}
      <div className="absolute inset-x-5 bottom-4 z-20 flex items-center justify-between gap-4 text-[9px] uppercase tracking-[0.18em] text-mute sm:inset-x-[3vw]">
        <span>{profile.status}</span>
        <button type="button" onClick={() => scrollToSection('sobre')} className="group inline-flex items-center gap-2 transition-colors hover:text-text">
          Role para entrar
          <ArrowDown className="size-3 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
