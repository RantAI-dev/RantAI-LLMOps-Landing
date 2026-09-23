"use client"

import {
  Boxes,
  GitBranch,
  Gauge,
  Lock,
  Server,
  Workflow,
} from "lucide-react"

import { Reveal, RevealGroup, RevealItem } from "./reveal"

const FEATURES = [
  {
    icon: Lock,
    title: "Your data stays put",
    body: "Training data, model weights, and inference traffic never leave your servers. For universities, government, and regulated industries, that is not a feature — it is the requirement that rules out every hosted API.",
  },
  {
    icon: Workflow,
    title: "Dataset to endpoint, one place",
    body: "Import a model and a dataset, fine-tune, evaluate, export, and serve — without switching tools or writing glue scripts between five of them.",
  },
  {
    icon: Boxes,
    title: "Many behaviours, one GPU",
    body: "LoRA adapters attach to a single frozen base model, so several fine-tuned behaviours can share one card instead of each needing its own deployment.",
  },
  {
    icon: Gauge,
    title: "Evaluate before you ship",
    body: "Run a trained adapter against a held-out set and compare it with the base model, side by side. Promote a version because the numbers moved, not because the loss curve looked pleasant.",
  },
  {
    icon: Server,
    title: "Bring your own engine",
    body: "Export to vLLM, Ollama, or llama.cpp and serve over an OpenAI-compatible API. Existing clients point at a new base URL and keep working.",
  },
  {
    icon: GitBranch,
    title: "Every run is reproducible",
    body: "Hyperparameters, dataset version, and base model are recorded per job. Compare runs, trace a regression back to what changed, and rerun it.",
  },
] as const

export function HomeFeatures() {
  return (
    <section
      id="platform"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="platform-heading"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Platform
        </p>
        <h2
          id="platform-heading"
          className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Everything between a raw model and a working endpoint
        </h2>
        <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground">
          Most teams stitch this together from notebooks, shell scripts, and a serving
          container nobody wants to touch. This replaces that seam.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <RevealItem key={feature.title}>
            <article className="h-full rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/8 text-primary">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  )
}
