import { Command } from 'lucide-react'
import { scrollToSection, sections, type SectionId } from '../lib'

type NavProps = {
  active: SectionId
  onOpenPalette: () => void
}

/**
 * Menu fixo e discreto. O `mix-blend-difference` inverte a cor do texto sobre fundos
 * claros, então ele continua legível nas seções de papel.
 */
export default function Nav({ active, onOpenPalette }: NavProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 text-white mix-blend-difference">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 text-[13px] sm:px-8" aria-label="Navegação principal">
        <button type="button" onClick={() => scrollToSection('inicio')} className="font-display text-xl font-extrabold tracking-tighter" aria-label="Ir para o início">
          mb<span aria-hidden="true">.</span>
        </button>

        <ul className="hidden items-center gap-7 md:flex">
          {sections.slice(1).map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollToSection(id)}
                aria-current={active === id ? 'location' : undefined}
                className={active === id ? 'underline decoration-1 underline-offset-8' : 'opacity-70 transition-opacity hover:opacity-100'}
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
            className="border-b border-white pb-0.5 transition-opacity hover:opacity-70"
          >
            Vamos conversar ↗
          </button>
        </div>
      </nav>
    </header>
  )
}
