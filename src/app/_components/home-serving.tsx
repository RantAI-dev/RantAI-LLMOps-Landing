"use client"

import { Check } from "lucide-react"

import { Reveal } from "./reveal"

const POINTS = [
  "Drop-in OpenAI-compatible API — change the base URL, keep your client",
  "Adapters selected per request through the model field",
  "API keys and a model allowlist in front of the engine",
  "vLLM, Ollama, and llama.cpp as serving targets",
] as const

const SNIPPET = `import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://llm.your-company.internal/v1",
  apiKey: process.env.LLMOPS_API_KEY,
})

const res = await client.chat.completions.create({
  model: "support-agent",   // your fine-tuned adapter
  messages: [{ role: "user", content: "How do I reset my password?" }],
})`

export function HomeServing() {
  return (
    <section
      id="serving"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="serving-heading"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Serving
          </p>
          <h2
            id="serving-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Ships as an API your code already knows
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A fine-tuned model is only useful once something can call it. Models served here
            speak the OpenAI protocol, so integrating means changing a base URL — not
            rewriting a client.
          </p>

          <ul className="mt-7 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3" />
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-xl border border-border bg-[#0b1220] shadow-sm">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
              <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
              <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
              <span className="ml-2 font-mono text-[11px] text-white/40">
                call-your-model.ts
              </span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-relaxed text-[#e6edf3]">
              <code>{SNIPPET}</code>
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
