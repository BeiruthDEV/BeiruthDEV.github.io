import { useState } from 'react'
import { ArrowUpRight, Check, Copy, FileText } from 'lucide-react'
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '../components/BrandIcons'
import { profile } from '../data'

const socials = [
  { label: 'WhatsApp', href: profile.links.whatsapp, icon: WhatsAppIcon },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: LinkedInIcon },
  { label: 'GitHub', href: profile.links.github, icon: GitHubIcon },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contato" className="relative overflow-hidden px-5 pb-6 pt-28 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ember">( 06 ) Contato</p>
        <h2 className="display text-[clamp(3.25rem,13vw,12rem)]">
          Vamos
          <br />
          conversar<span className="text-ember">.</span>
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="max-w-lg text-lg text-mute">Estou buscando estágio ou vaga júnior em desenvolvimento full-stack. Se tiver uma oportunidade ou projeto, é só chamar.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="display break-all text-2xl !leading-tight !tracking-[-0.02em] underline decoration-ember decoration-2 underline-offset-[10px] transition-colors hover:text-ember sm:text-4xl"
              >
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-mute transition hover:border-ember/60 hover:text-text"
              >
                {copied ? <Check className="size-3.5 text-mint" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                <span aria-live="polite">{copied ? 'copiado' : 'copiar'}</span>
              </button>
            </div>
          </div>

          <ul className="divide-y divide-line border-y border-line">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-4 transition-colors hover:text-ember">
                  <Icon className="size-5 text-mute transition-colors group-hover:text-ember" />
                  <span className="flex-1 text-lg">{label}</span>
                  <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-4 transition-colors hover:text-ember">
                <FileText className="size-5 text-mute transition-colors group-hover:text-ember" aria-hidden="true" />
                <span className="flex-1 text-lg">Currículo (PDF)</span>
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        {/* Assinatura gigante cortada na base da página */}
        <p
          aria-hidden="true"
          className="display mt-20 select-none whitespace-nowrap bg-gradient-to-b from-line to-transparent bg-clip-text text-center text-[clamp(4rem,23vw,22rem)] !leading-[0.8] text-transparent"
        >
          BEIRUTH
        </p>

        <div className="relative z-10 -mt-2 flex flex-col gap-2 border-t border-line pt-5 font-mono text-[11px] text-mute sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </span>
          <span>React · Three.js · Tailwind</span>
        </div>
      </div>
    </section>
  )
}
