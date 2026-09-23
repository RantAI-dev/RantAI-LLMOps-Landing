import { codeToHtml } from "shiki"

import { ServingCode, type Lang } from "./serving-code"

const POINTS = [
  "Drop-in OpenAI-compatible API — change the base URL, keep your client",
  "Adapters selected per request through the model field",
  "API keys and a model allowlist in front of the engine",
  "vLLM, Ollama, and llama.cpp as serving targets",
] as const

const CODE: Record<Lang, { lang: string; src: string }> = {
  ts: {
    lang: "typescript",
    src: `import OpenAI from "openai"

const client = new OpenAI({
  baseURL: "https://llm.your-company.internal/v1",
  apiKey: process.env.LLMOPS_API_KEY,
})

const res = await client.chat.completions.create({
  model: "support-agent",   // your fine-tuned adapter
  messages: [{ role: "user", content: "How do I reset my password?" }],
})`,
  },
  py: {
    lang: "python",
    src: `import os
from openai import OpenAI

client = OpenAI(
    base_url="https://llm.your-company.internal/v1",
    api_key=os.environ["LLMOPS_API_KEY"],
)

res = client.chat.completions.create(
    model="support-agent",  # your fine-tuned adapter
    messages=[{"role": "user", "content": "How do I reset my password?"}],
)`,
  },
  curl: {
    lang: "bash",
    src: `curl https://llm.your-company.internal/v1/chat/completions \\
  -H "Authorization: Bearer $LLMOPS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "support-agent",
    "messages": [{"role": "user", "content": "How do I reset my password?"}]
  }'`,
  },
}

/**
 * A theme matched to the code-window tokens in globals.css, so the block sits in
 * the same palette as the rest of the page rather than importing a stock theme.
 */
const THEME = {
  name: "rantai-llmops",
  type: "dark" as const,
  colors: { "editor.background": "#0b1220", "editor.foreground": "#e6edf3" },
  settings: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#6b7a90" } },
    { scope: ["string", "string.quoted", "constant.character"], settings: { foreground: "#ffd89b" } },
    {
      scope: ["keyword", "storage", "storage.type", "keyword.control", "support.function", "entity.name.function"],
      settings: { foreground: "#74d4ff" },
    },
    { scope: ["variable", "meta.object-literal.key", "entity.name.tag"], settings: { foreground: "#e6edf3" } },
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#74d4ff" } },
  ],
}

export async function HomeServing() {
  const entries = await Promise.all(
    (Object.keys(CODE) as Lang[]).map(async (k) => {
      const html = await codeToHtml(CODE[k].src, { lang: CODE[k].lang, theme: THEME })
      return [k, html] as const
    })
  )
  const html = Object.fromEntries(entries) as Record<Lang, string>

  return (
    <section
      id="serving"
      className="mx-auto w-full max-w-[1200px] scroll-mt-20 px-5 py-[120px] sm:px-8 sm:py-[140px]"
      aria-labelledby="serving-heading"
    >
      <div className="flex flex-wrap items-center gap-x-[72px] gap-y-12">
        <div className="min-w-0 shrink grow basis-[400px]">
          <p className="font-mono text-[12px] text-primary">Serving</p>
          <h2
            id="serving-heading"
            className="mt-3 text-balance text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em]"
          >
            Ships as an API your code already knows
          </h2>
          <p className="mt-4 max-w-[480px] text-[16px] leading-[1.6] text-muted-foreground">
            A fine-tuned model is only useful once something can call it. Models served here
            speak the OpenAI protocol, so integrating means changing a base URL — not
            rewriting a client.
          </p>

          <ul className="mt-9 border-t border-border">
            {POINTS.map((point, i) => (
              <li key={point} className="flex gap-4 border-b border-border py-[13px]">
                <span className="shrink-0 font-mono text-[12px] text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14.5px] leading-[1.6]">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 shrink grow-[1.15] basis-[480px]">
          <ServingCode html={html} />
        </div>
      </div>
    </section>
  )
}
