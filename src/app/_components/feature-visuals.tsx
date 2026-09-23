/**
 * The six bento visuals. All server components — plain markup, no icons, no
 * client JS. Each one shows a concrete artefact from the product rather than
 * decorating the card with a glyph.
 */

function Well({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-lg bg-[var(--sidebar)] p-6 sm:min-h-[220px]">
      {children}
    </div>
  )
}

/** 1 · Nothing leaves the perimeter. */
export function VisualDataStaysPut() {
  return (
    <Well>
      <div className="flex w-full flex-wrap items-center justify-center gap-6">
        <div className="relative min-w-0 max-w-[300px] shrink grow basis-[240px] rounded-[10px] border-[1.5px] border-dashed border-ring p-5 pt-6">
          <span className="absolute -top-2.5 left-4 bg-[var(--sidebar)] px-1.5 font-mono text-[11px] text-muted-foreground">
            your-infrastructure
          </span>
          <div className="flex flex-wrap gap-2">
            {["training data", "model weights", "inference traffic"].map((chip) => (
              <span
                key={chip}
                className="rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-[11.5px]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0">
          <p className="font-mono text-[11px] text-muted-foreground">outbound</p>
          <p className="mt-1 font-mono text-[28px] font-semibold leading-none tracking-tight">
            0 B
          </p>
          <p className="mt-2 font-mono text-[11px] text-muted-foreground line-through">
            hosted API
          </p>
        </div>
      </div>
    </Well>
  )
}

/** 2 · Several adapters over one frozen base on one card. */
export function VisualManyBehaviours() {
  return (
    <Well>
      <div className="w-full space-y-2">
        <div className="flex flex-wrap gap-2">
          {["ask", "learn", "practice"].map((a) => (
            <span
              key={a}
              className="min-w-0 shrink grow basis-[80px] rounded-md bg-primary-tint px-3 py-2 text-center font-mono text-[12px] text-primary"
            >
              {a}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2">
          <span className="font-mono text-[12px]">base</span>
          <span className="truncate font-mono text-[11.5px] text-muted-foreground">
            Gemma-SEA-LION-v4-4B
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-md bg-[var(--brand-2)] px-3 py-2">
          <span className="font-mono text-[12px] text-white">GPU 0</span>
          <span className="font-mono text-[11.5px] text-[var(--brand-1)]">NVIDIA GB10</span>
        </div>
      </div>
    </Well>
  )
}

const SCORES = [
  { label: "rantai-ask-4b · grounded", value: "98.0%", pct: 98, primary: true },
  { label: "Qwen2.5-3B · arc_easy", value: "76.9%", pct: 76.9, primary: false },
  { label: "Qwen2.5-3B · winogrande", value: "74.8%", pct: 74.8, primary: false },
] as const

/** 3 · Scores side by side against the base model. */
export function VisualEvaluate() {
  return (
    <Well>
      <div className="w-full space-y-4">
        {SCORES.map((s) => (
          <div key={s.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate font-mono text-[11.5px]">{s.label}</span>
              <span className="shrink-0 font-mono text-[11.5px] font-medium">{s.value}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={s.primary ? "h-full rounded-full bg-primary" : "h-full rounded-full bg-ring"}
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Well>
  )
}

const ENGINES = [
  { name: "vLLM", detail: "http://vllm:8000/v1" },
  { name: "Ollama", detail: "http://localhost:11434/v1" },
  { name: "llama.cpp", detail: "GGUF export" },
] as const

/** 4 · Export targets. */
export function VisualEngines() {
  return (
    <Well>
      <div className="w-full space-y-2">
        {ENGINES.map((e) => (
          <div
            key={e.name}
            className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2.5"
          >
            <span className="font-mono text-[12px]">{e.name}</span>
            <span className="truncate font-mono text-[11.5px] text-primary">{e.detail}</span>
          </div>
        ))}
      </div>
    </Well>
  )
}

/** 5 · Run metadata, with the one changed cell highlighted. */
export function VisualReproducible() {
  return (
    <Well>
      <div className="w-full font-mono text-[11.5px]">
        <div className="grid grid-cols-[1.6fr_0.7fr_0.7fr_1fr] gap-x-3 border-b border-border pb-2 text-muted-foreground">
          <span>run</span>
          <span>rank</span>
          <span>lr</span>
          <span>dataset</span>
        </div>
        <div className="grid grid-cols-[1.6fr_0.7fr_0.7fr_1fr] gap-x-3 border-b border-border py-2.5">
          <span className="truncate">practice-4b</span>
          <span>16</span>
          <span>2e-4</span>
          <span>learn/v4</span>
        </div>
        <div className="grid grid-cols-[1.6fr_0.7fr_0.7fr_1fr] items-center gap-x-3 py-2.5">
          <span className="truncate">learn-4b-full</span>
          <span>16</span>
          <span>2e-4</span>
          <span className="w-fit rounded bg-primary-tint px-1.5 py-0.5 text-primary">learn/v5</span>
        </div>
      </div>
    </Well>
  )
}

const PIPELINE = ["import", "fine-tune", "evaluate", "export", "serve"] as const

/** 6 · The whole path, end to end. */
export function VisualPipeline() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-lg bg-[var(--sidebar)] p-6">
      <div className="flex w-full flex-wrap items-center gap-y-3">
        {PIPELINE.map((stage, i) => {
          const last = i === PIPELINE.length - 1
          return (
            <div key={stage} className="flex min-w-0 shrink grow items-center">
              <span
                className={
                  last
                    ? "shrink-0 rounded-md bg-primary px-3 py-2 font-mono text-[12px] text-primary-foreground"
                    : "shrink-0 rounded-md border border-border bg-card px-3 py-2 font-mono text-[12px]"
                }
              >
                {stage}
              </span>
              {!last ? <span className="h-px min-w-3 shrink grow bg-border" aria-hidden /> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
