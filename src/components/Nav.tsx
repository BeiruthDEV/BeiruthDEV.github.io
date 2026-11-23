import { Command } from 'lucide-react'
import { scrollToSection, sections, type SectionId } from '../lib'

type NavProps = {
  active: SectionId
  onOpenPalette: () => void
}

/**
 * Menu fixo e discreto: marca fina à esquerda, links em caixa-alta no centro e o botão de contato
 * à direita. O `mix-blend-difference` inverte a cor do texto sobre fundos claros, então ele
 * continua legível nas seções de papel.
 */
export default function Nav({ active, onOpenPalette }: NavProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 text-white mix-blend-difference">
      <nav className="flex items-center justify-between px-5 py-4 sm:px-[3vw]" aria-label="Navegação principal">
        <button
          type="button"
          onClick={() => scrollToSection('inicio')}
          className="font-condensed text-xl font-light uppercase tracking-[0.32em]"
          aria-label="Ir para o início"
        >
          Beiruth
        </button>

        <ul className="hidden items-center gap-8 text-[10px] uppercase tracking-[0.18em] md:flex">
          {sections.slice(1).map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollToSection(id)}
                aria-current={active === id ? 'location' : undefined}
                className={active === id ? 'border-b border-white pb-1' : 'pb-1 opacity-70 transition-opacity hover:opacity-100'}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden items-center gap-1 font-mono text-[11px] opacity-70 transition-opacity hover:opacity-100 sm:flex"
            aria-label="Abrir a paleta de comandos (Ctrl+K)"
          >
            <Command className="size-3.5" aria-hidden="true" />K
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contato')}
            className="border border-white px-4 py-2.5 text-[10px] uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-black"
          >
            Vamos conversar
          </button>
        </div>
      </nav>
    </header>
  )
}
