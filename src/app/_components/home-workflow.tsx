"use client"

import { Reveal, RevealGroup, RevealItem } from "./reveal"

const STEPS = [
  {
    n: "01",
    title: "Import",
    body: "Pull a base model from Hugging Face or your own registry, and point at a dataset in object storage. On-premise corpora never have to be published anywhere public.",
  },
  {
    n: "02",
    title: "Fine-tune",
    body: "Pick LoRA rank, learning rate, epochs, and sequence length, then launch. Loss curves and logs stream into the run view while it trains.",
  },
  {
    n: "03",
    title: "Evaluate",
    body: "Score the result against a held-out set and compare runs head to head, so a version ships on evidence rather than on a hunch.",
  },
  {
    n: "04",
    title: "Serve",
    body: "Export to your engine of choice and expose an OpenAI-compatible endpoint. Adapters are pinned by name, so rolling out a new version changes no client code.",
  },
] as const

export function HomeWorkflow() {
  return (
    <section
      id="workflow"
      className="relative scroll-mt-20 border-y border-border bg-[var(--sidebar)]"
      aria-labelledby="workflow-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Workflow
          </p>
          <h2
            id="workflow-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Four steps, no context switching
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground">
            The same path every time, whether it is your first adapter or your fortieth.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <RevealItem key={step.n}>
              <article className="relative h-full rounded-xl border border-border bg-card p-6">
                <span className="font-mono text-xs font-semibold text-primary">
                  {step.n}
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
