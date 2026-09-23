"use client"

import { LOSS, lossPoints } from "./hero-run-mock"

/** The four panels shown in the sticky window, one per workflow step. */

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[12.5px] text-muted-foreground">{label}</p>
      <p className="mt-1.5 truncate rounded-md border border-border bg-card px-3 py-2 font-mono text-[12px]">
        {value}
      </p>
    </div>
  )
}

export function PanelImport() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 border-b border-border">
        <span className="border-b-2 border-foreground pb-2 text-[13px] font-medium">Models</span>
        <span className="pb-2 text-[13px] text-muted-foreground">Datasets</span>
      </div>

      <div className="space-y-2">
        {[
          { name: "Qwen-SEA-LION-v4-4B-VL", tag: "Q8_0 · GGUF" },
          { name: "Qwen-SEA-LION-v4-8B-VL", tag: "Q8_0 · GGUF" },
        ].map((m) => (
          <div
            key={m.name}
            className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-[12px]">{m.name}</p>
              <p className="font-mono text-[11px] text-muted-foreground">{m.tag}</p>
            </div>
            <span className="shrink-0 rounded-md border border-border px-2.5 py-1 text-[12px] font-medium">
              Pull
            </span>
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-primary/30 bg-primary-tint-surface px-3 py-2.5">
          <p className="min-w-0 truncate font-mono text-[12px]">Gemma-SEA-LION-v4-4B-VL</p>
          <span className="shrink-0 rounded-full bg-success-surface px-2 py-0.5 font-mono text-[10.5px] font-medium text-success">
            Downloaded
          </span>
        </div>
      </div>

      <Field label="Dataset" value="s3://buku-korpus/learn/v5/" />
    </div>
  )
}

const METHODS = [
  { name: "SFT", body: "Instruction tuning (prompt → completion)", on: true },
  { name: "GRPO · RL", body: "Reasoning — rewards correct answers", on: false },
  { name: "TTS", body: "Text-to-speech", on: false },
] as const

export function PanelFinetune() {
  return (
    <div className="space-y-4">
      <p className="text-[15px] font-semibold tracking-tight">New fine-tune (LoRA)</p>

      <div>
        <p className="text-[12.5px] text-muted-foreground">Training method</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {METHODS.map((m) => (
            <div
              key={m.name}
              className={
                m.on
                  ? "min-w-0 shrink grow basis-[150px] rounded-md border-[1.5px] border-foreground px-3 py-2.5"
                  : "min-w-0 shrink grow basis-[150px] rounded-md border border-border px-3 py-2.5"
              }
            >
              <p className="text-[12.5px] font-semibold">{m.name}</p>
              <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">{m.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Base model" value="Gemma-SEA-LION-v4-4B-VL" />
        <Field label="Dataset" value="s3://buku-korpus/learn/v5/" />
        <Field label="LoRA rank" value="16" />
        <Field label="Learning rate" value="2e-4" />
      </div>

      <div className="rounded-lg border border-border p-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[12.5px] font-medium">learn-4b-full</span>
          <span className="font-mono text-[11.5px] text-primary">
            loss {LOSS[200].toFixed(4)}
          </span>
        </div>
        <svg
          viewBox="0 0 560 160"
          preserveAspectRatio="none"
          className="mt-2 block h-24 w-full"
          role="img"
          aria-label="Training loss curve"
        >
          <polyline
            points={lossPoints(200)}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  )
}

const RUNS = [
  {
    name: "rantai-ask-4b",
    note: "Only 10% of questions ran — raise coverage before comparing.",
    scores: [
      { label: "grounded", value: "98.0%", pct: 98 },
      { label: "citation", value: "94.2%", pct: 94.2 },
    ],
  },
  {
    name: "Qwen2.5-3B · base",
    note: null,
    scores: [
      { label: "arc_easy", value: "76.9%", pct: 76.9 },
      { label: "winogrande", value: "74.8%", pct: 74.8 },
    ],
  },
] as const

export function PanelEvals() {
  return (
    <div className="space-y-3">
      <p className="text-[15px] font-semibold tracking-tight">Run history</p>
      {RUNS.map((run) => (
        <div key={run.name} className="rounded-lg border border-border p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[12px]">{run.name}</span>
            <span className="shrink-0 rounded-full bg-success-surface px-2 py-0.5 font-mono text-[10.5px] font-medium text-success">
              COMPLETE
            </span>
          </div>

          {run.note ? (
            <p className="mt-2 rounded-md bg-warning-surface px-2.5 py-1.5 text-[11.5px] leading-snug text-warning">
              {run.note}
            </p>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-4">
            {run.scores.map((s) => (
              <div key={s.label} className="min-w-0 shrink grow basis-[130px]">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-mono text-[11.5px] text-muted-foreground">
                    {s.label}
                  </span>
                  <span className="font-mono text-[11.5px] font-medium">{s.value}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function PanelDeployments() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[15px] font-semibold tracking-tight">vLLM LoRA adapters</p>
        <span className="shrink-0 rounded-full bg-success-surface px-2.5 py-0.5 font-mono text-[10.5px] font-medium text-success">
          Active
        </span>
      </div>
      <p className="text-[12.5px] text-muted-foreground">
        Base model: <span className="font-semibold text-foreground">base</span> · serving{" "}
        <span className="font-mono text-[11.5px]">Gemma-SEA-LION-v4-4B-VL</span>
      </p>

      <div>
        <p className="text-[12.5px] font-medium">Attached (3)</p>
        <div className="mt-2 space-y-2">
          {["ask", "learn", "practice"].map((a) => (
            <div
              key={a}
              className="flex flex-wrap items-baseline gap-2 rounded-md border border-border px-3 py-2.5"
            >
              <span className="font-mono text-[12px] font-medium">{a}</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                route with model={a}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Field label="Gateway access (external clients)" value="https://llm.your-company.internal/v1" />
    </div>
  )
}

export const PANELS = [PanelImport, PanelFinetune, PanelEvals, PanelDeployments] as const
