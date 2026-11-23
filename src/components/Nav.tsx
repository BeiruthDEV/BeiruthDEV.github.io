import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Command, Menu, X } from 'lucide-react'
import { cn, scrollToSection, sections, type SectionId } from '../lib'

type NavProps = {
  active: SectionId
  onOpenPalette: () => void
}

const links = sections.slice(1)
const ease = [0.22, 1, 0.36, 1] as const

/**
 * Menu fixo. No topo é transparente; ao rolar vira vidro fosco e encolhe. Esconde ao descer e
 * volta ao subir. Troca de cor sozinho sobre a seção clara (papel). Tem indicador deslizante no
 * link ativo, barra de progresso da página e, no celular, um menu em tela cheia.
 */
export default function Nav({ active, onOpenPalette }: NavProps) {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [overPaper, setOverPaper] = useState(false)
  const [open, setOpen] = useState(false)

  // com o menu do celular aberto o cabeçalho fica sempre escuro e visível
  const light = overPaper && !open

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 520 && y > previous && !open)
    const paper = document.getElementById('trajetoria')
    if (paper) {
      const rect = paper.getBoundingClientRect()
      setOverPaper(rect.top <= 40 && rect.bottom >= 40)
    }
  })

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id: SectionId) => {
    setOpen(false)
    // espera o menu fechar e a rolagem do corpo voltar antes de rolar
    window.setTimeout(() => scrollToSection(id), open ? 250 : 0)
  }

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease }}
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter,color] duration-500',
          light ? 'text-paper-ink' : 'text-white',
          scrolled
            ? light
              ? 'border-paper-ink/10 bg-paper/80 backdrop-blur-xl'
              : 'border-white/10 bg-ink/65 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <nav
          className={cn(
            'flex items-center justify-between px-5 transition-[padding] duration-500 sm:px-[3vw]',
            scrolled ? 'py-3' : 'py-5',
          )}
          aria-label="Navegação principal"
        >
          {/* marca */}
          <button
            type="button"
            onClick={() => go('inicio')}
            className="group flex items-baseline gap-0.5 font-condensed text-[1.7rem] font-light uppercase leading-none tracking-[0.34em]"
            aria-label="Ir para o início"
          >
            Beiruth
            <span className="text-ember transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true">
              .
            </span>
          </button>

          {/* links, com o indicador que desliza até o item ativo */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map(({ id, label }) => {
              const isActive = active === id
              return (
                <li key={id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className={cn('absolute inset-0 rounded-full', light ? 'bg-paper-ink/[0.07]' : 'bg-white/10')}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => go(id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'group relative px-4 py-2 text-[13px] font-medium uppercase tracking-[0.14em] transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-65 hover:opacity-100',
                    )}
                  >
                    {label}
                    <span
                      className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-ember transition-transform duration-300 ease-out group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          {/* ações */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenPalette}
              className={cn(
                'hidden items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-colors lg:flex',
                light ? 'border-paper-ink/20 hover:border-ember hover:text-ember-deep' : 'border-white/20 hover:border-ember hover:text-ember',
              )}
              aria-label="Abrir a paleta de comandos (Ctrl+K)"
            >
              <Command className="size-3.5" aria-hidden="true" />K
            </button>

            <button
              type="button"
              onClick={() => go('contato')}
              className={cn(
                'group relative hidden items-center gap-2 overflow-hidden border px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-300 sm:inline-flex',
                light ? 'border-paper-ink hover:text-paper-ink' : 'border-white hover:text-ink',
              )}
            >
              <span
                className="absolute inset-0 -translate-x-full bg-ember transition-transform duration-500 ease-out group-hover:translate-x-0"
                aria-hidden="true"
              />
              <span className="relative">Vamos conversar</span>
              <ArrowUpRight
                className="relative size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center border border-current md:hidden"
              aria-label={open ? 'Fechar o menu' : 'Abrir o menu'}
              aria-expanded={open}
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* progresso da página */}
        <motion.div
          style={{ scaleX: progress }}
          className={cn(
            'absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-gradient-to-r from-lilac via-ember-soft to-ember transition-opacity duration-300',
            scrolled ? 'opacity-100' : 'opacity-0',
          )}
          aria-hidden="true"
        />
      </motion.header>

      {/* menu em tela cheia (celular) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="space-y-1">
              {sections.map(({ id, label }, i) => (
                <li key={id} className="overflow-hidden">
                  <motion.button
                    type="button"
                    onClick={() => go(id)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease }}
                    className={cn(
                      'font-condensed text-[3.4rem] font-extralight uppercase leading-[1.05] tracking-[0.04em]',
                      active === id ? 'text-ember' : 'text-text',
                    )}
                  >
                    {label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onOpenPalette()
              }}
              className="mt-10 w-fit font-mono text-xs uppercase tracking-widest text-mute"
            >
              Buscar · Ctrl K
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
