import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CornerDownLeft, Copy, FileText, Search } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from './BrandIcons'
import { cn, scrollToSection, sections } from '../lib'
import { profile, projects } from '../data'

type Command = {
  id: string
  group: 'Navegar' | 'Projetos' | 'Links' | 'Ações'
  label: string
  hint?: string
  icon: ReactNode
  keywords?: string
  run: () => void | Promise<void>
}

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

const openExternal = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onToast: (message: string) => void
}

/** Paleta de comandos global (Ctrl+K / ⌘K): navegação, projetos, links e ações. */
export default function CommandPalette({ open, onOpenChange, onToast }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map(({ id, label, icon: Icon }) => ({
        id: `nav-${id}`,
        group: 'Navegar' as const,
        label: `Ir para ${label}`,
        icon: <Icon className="size-4" />,
        run: () => scrollToSection(id),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: 'Projetos' as const,
        label: p.name,
        hint: p.category,
        keywords: p.tags.join(' '),
        icon: <ArrowUpRight className="size-4" />,
        run: () => openExternal(p.url),
      })),
      { id: 'link-github', group: 'Links', label: 'Abrir GitHub', hint: 'BeiruthDEV', icon: <GitHubIcon className="size-4" />, run: () => openExternal(profile.links.github) },
      { id: 'link-linkedin', group: 'Links', label: 'Abrir LinkedIn', icon: <LinkedInIcon className="size-4" />, run: () => openExternal(profile.links.linkedin) },
      { id: 'link-whatsapp', group: 'Links', label: 'Conversar no WhatsApp', icon: <WhatsAppIcon className="size-4" />, run: () => openExternal(profile.links.whatsapp) },
      { id: 'action-resume', group: 'Ações', label: 'Abrir currículo (PDF)', icon: <FileText className="size-4" />, keywords: 'cv curriculo resume', run: () => openExternal(profile.resume) },
      {
        id: 'action-email',
        group: 'Ações',
        label: 'Copiar e-mail',
        hint: profile.email,
        icon: <Copy className="size-4" />,
        keywords: 'email contato',
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email)
            onToast('E-mail copiado')
          } catch {
            window.location.href = `mailto:${profile.email}`
          }
        },
      },
    ],
    [onToast],
  )

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return commands
    return commands.filter((c) => normalize(`${c.label} ${c.hint ?? ''} ${c.keywords ?? ''} ${c.group}`).includes(q))
  }, [commands, query])

  // Atalho global
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  // Estado inicial a cada abertura
  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
    }
  }, [open])

  useEffect(() => setIndex(0), [query])

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const run = (command: Command | undefined) => {
    if (!command) return
    onOpenChange(false)
    void command.run()
  }

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[index])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onOpenChange(false)
    }
  }

  let lastGroup: string | null = null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/60 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onOpenChange(false)
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Paleta de comandos"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)]"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 shrink-0 text-mute" aria-hidden="true" />
              <input
                ref={inputRef}
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar seções, projetos, links…"
                className="h-12 w-full bg-transparent text-[15px] text-text placeholder:text-mute focus:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-results"
                aria-activedescendant={results[index] ? `palette-${results[index].id}` : undefined}
              />
              <kbd className="shrink-0 rounded border border-line px-1.5 font-mono text-[10px] text-mute">esc</kbd>
            </div>

            <ul ref={listRef} id="palette-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-mute">Nada encontrado para “{query}”.</li>}
              {results.map((command, i) => {
                const header = command.group !== lastGroup ? command.group : null
                lastGroup = command.group
                return (
                  <li key={command.id} role="presentation">
                    {header && <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-mute/80">{header}</p>}
                    <button
                      type="button"
                      id={`palette-${command.id}`}
                      role="option"
                      aria-selected={i === index}
                      data-index={i}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => run(command)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                        i === index ? 'bg-ember/15 text-text' : 'text-text/85',
                      )}
                    >
                      <span className={cn('grid size-7 place-items-center rounded-md border', i === index ? 'border-ember/40 text-ember' : 'border-line text-mute')}>
                        {command.icon}
                      </span>
                      <span className="flex-1 truncate">{command.label}</span>
                      {command.hint && <span className="hidden truncate font-mono text-[11px] text-mute sm:block">{command.hint}</span>}
                      {i === index && <CornerDownLeft className="size-3.5 text-mute" aria-hidden="true" />}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[10px] text-mute">
              <span>↑↓ navegar</span>
              <span>↵ abrir</span>
              <span className="ml-auto">Ctrl K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
