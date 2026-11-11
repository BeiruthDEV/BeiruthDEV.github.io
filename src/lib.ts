import { useEffect, useState } from 'react'
import { Award, FolderGit2, House, Mail, Route, UserRound, type LucideIcon } from 'lucide-react'

export type SectionId = 'inicio' | 'sobre' | 'trabalhos' | 'trajetoria' | 'certificados' | 'contato'

export const sections: { id: SectionId; label: string; icon: LucideIcon }[] = [
  { id: 'inicio', label: 'Início', icon: House },
  { id: 'sobre', label: 'Sobre', icon: UserRound },
  { id: 'trabalhos', label: 'Projetos', icon: FolderGit2 },
  { id: 'trajetoria', label: 'Trajetória', icon: Route },
  { id: 'certificados', label: 'Certificações', icon: Award },
  { id: 'contato', label: 'Contato', icon: Mail },
]

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

export function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}

/** Seção em foco, para destacar o item ativo no menu. */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('inicio')
  useEffect(() => {
    const ratios = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target.id, entry.intersectionRatio)
        let best: SectionId = 'inicio'
        let bestRatio = 0
        for (const { id } of sections) {
          const ratio = ratios.get(id) ?? 0
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        if (bestRatio > 0) setActive(best)
      },
      { threshold: [0, 0.1, 0.3, 0.5, 0.8], rootMargin: '-20% 0px -40% 0px' },
    )
    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])
  return active
}
