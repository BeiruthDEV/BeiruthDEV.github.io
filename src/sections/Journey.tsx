import { motion } from 'framer-motion'
import { journey } from '../data'

/** Seção clara (papel): anos enormes como eixo visual, cada linha clareia o fundo no hover. */
export default function Journey() {
  return (
    <section id="trajetoria" className="bg-paper text-paper-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-40">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-ember-deep">( 03 ) Trajetória</p>
            <h2 className="display text-[clamp(3rem,10vw,9rem)]">
              Formação
              <br />
              <span className="text-ember-deep">e prática</span>
              <span className="text-paper-ink">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-paper-mute lg:justify-self-end">
            Da faculdade aos projetos independentes e ao estágio: o caminho que me levou a APIs, dashboards e sistemas web.
          </p>
        </div>

        <ol className="mt-20 border-t border-paper-ink/20">
          {journey.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group grid items-baseline gap-3 border-b border-paper-ink/20 py-8 transition-colors hover:bg-paper-2 md:grid-cols-[minmax(0,20rem)_1fr_1fr] md:gap-10 md:px-4"
            >
              <time className="display whitespace-nowrap text-4xl !leading-none text-paper-ink/90 transition-colors group-hover:text-ember-deep sm:text-5xl">{step.period}</time>

              <div>
                <h3 className="text-xl font-medium sm:text-2xl">{step.title}</h3>
                {step.bullets && <p className="mt-1 text-paper-mute">{step.detail}</p>}
              </div>

              {step.bullets ? (
                <ul className="space-y-3 text-sm leading-relaxed text-paper-mute">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-[0.55em] size-1 shrink-0 rounded-full bg-ember-deep" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-paper-mute md:text-right">{step.detail}</p>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
