import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import CommandPalette from './components/CommandPalette'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Journey from './sections/Journey'
import SkillSphere from './sections/SkillSphere'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'
import { useActiveSection } from './lib'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const active = useActiveSection()

  const showToast = useCallback((message: string) => setToast(message), [])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 1800)
    return () => clearTimeout(id)
  }, [toast])

  return (
    <>
      <Nav active={active} onOpenPalette={() => setPaletteOpen(true)} />

      <main>
        <Hero />
        <About />
        <Work />
        <Journey />
        <SkillSphere />
        <Certificates />
        <Contact />
      </main>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} onToast={showToast} />

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-mint/30 bg-panel px-4 py-2 font-mono text-xs text-mint shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
