"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useInView, useReducedMotion } from "motion/react"

const TOTAL = 200

/**
 * The loss curve the mock draws. Deterministic, so the shape is identical on the
 * server and the client and every visitor sees the same run: an exponential decay
 * with a slow ripple and a fine jitter on top, which is what a real training curve
 * looks like. A perfectly smooth line reads as fabricated.
 */
export const LOSS: number[] = Array.from(
  { length: TOTAL + 1 },
  (_, i) =>
    2.35 * Math.exp(-i / 38) +
    0.42 +
    0.07 * Math.sin(i * 1.7) * Math.exp(-i / 120) +
    0.025 * Math.sin(i * 5.3)
)

/** Map the series onto the 560×160 viewBox the SVG uses. */
export function lossPoints(upTo: number, width = 560, height = 160) {
  const pts: string[] = []
  for (let i = 0; i <= upTo; i++) {
    const x = (i / TOTAL) * width
    const y = height - 10 - ((LOSS[i] - 0.3) / 2.6) * (height - 20)
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return pts.join(" ")
}

const SIDEBAR_MAIN = ["Dashboard", "Traces", "Interact", "Fine-tune", "Evals", "Prompts", "Deployments"]
const SIDEBAR_WORKSPACE = ["Hub", "Model Registry", "Dataset", "Compute"]

function clockAt(step: number) {
  // A fixed base time keeps server and client markup identical — a live clock
  // would differ between the two renders and trip hydration.
  const base = 17 * 3600 + 9 * 60 + 28
  const t = base + Math.floor(step * 0.7)
  const hh = String(Math.floor(t / 3600) % 24).padStart(2, "0")
  const mm = String(Math.floor(t / 60) % 60).padStart(2, "0")
  const ss = String(t % 60).padStart(2, "0")
  return `${hh}:${mm}:${ss}`
}

function logLine(i: number) {
  const grad = (0.4 + 0.3 * Math.abs(Math.sin(i))).toFixed(3)
  return `${clockAt(i)}  step ${String(i).padStart(3, " ")}/${TOTAL}  loss ${LOSS[i].toFixed(
    4
  )}  lr 2.00e-4  grad_norm ${grad}  1.42 it/s`
}

export function HeroRunMock() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.15 })
  const [step, setStep] = useState(reduce ? TOTAL : 130)

  useEffect(() => {
    // Frozen for reduced motion, and paused while off-screen so an idle tab is
    // not repainting a chart nobody is looking at.
    if (reduce || !inView) return
    const id = setInterval(() => {
      setStep((s) => (s >= TOTAL ? 12 : s + 1))
    }, 140)
    return () => clearInterval(id)
  }, [reduce, inView])

  const util = 93 + (step % 6)
  const points = useMemo(() => lossPoints(step), [step])
  const lines = useMemo(
    () => Array.from({ length: 5 }, (_, k) => logLine(Math.max(0, step - 4 + k))),
    [step]
  )

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(5,10,48,.04),0_24px_60px_-24px_rgba(5,10,48,.18)]"
      style={{ fontFamily: "var(--font-mock)" }}
    >
      {/* chrome */}
      <div className="flex h-10 items-center justify-between border-b border-border bg-[var(--sidebar)] px-4">
        <span className="font-mono text-[11px] text-muted-foreground">
          demo.llmops.rantai.dev/finetune
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">admin</span>
      </div>

      <div className="flex flex-wrap">
        {/* sidebar */}
        <aside className="hidden shrink-0 grow-0 basis-[190px] border-r border-border py-4 sm:block">
          <div className="flex items-center gap-2 px-4 pb-4">
            <Image src="/logo/rantai-mark.svg" alt="" width={130} height={100} className="h-4 w-auto" />
            <span className="text-[12.5px] font-semibold tracking-tight">RantAI LLMOps</span>
          </div>
          <p className="px-4 pb-1.5 pt-2 text-[11px] text-muted-foreground">Main</p>
          {SIDEBAR_MAIN.map((item) => {
            const active = item === "Fine-tune"
            return (
              <div
                key={item}
                className={
                  active
                    ? "mx-2 rounded-md bg-muted px-2.5 py-1.5 text-[12.5px] font-medium text-foreground shadow-[inset_3px_0_0_var(--foreground)]"
                    : "mx-2 px-2.5 py-1.5 text-[12.5px] text-muted-foreground"
                }
              >
                {item}
              </div>
            )
          })}
          <p className="px-4 pb-1.5 pt-4 text-[11px] text-muted-foreground">Workspace</p>
          {SIDEBAR_WORKSPACE.map((item) => (
            <div key={item} className="mx-2 px-2.5 py-1.5 text-[12.5px] text-muted-foreground">
              {item}
            </div>
          ))}
        </aside>

        {/* main */}
        <div className="flex min-w-0 shrink grow basis-[520px] flex-col gap-3.5 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[15px] font-semibold tracking-tight">learn-4b-full</p>
              <p className="mt-1 truncate font-mono text-[12px] text-muted-foreground">
                aisingapore/Gemma-SEA-LION-v4-4B-VL · s3://buku-korpus/learn/v5/
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[11px] font-medium">
              <span className="size-1.5 rounded-full bg-primary motion-safe:animate-mock-blink" aria-hidden />
              RUNNING
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-foreground transition-[width] duration-150 ease-linear"
                style={{ width: `${(step / TOTAL) * 100}%` }}
              />
            </div>
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
              step {step}/{TOTAL}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* loss chart */}
            <div className="min-w-0 shrink grow-[2] basis-[320px] rounded-lg border border-border p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium">Training loss</span>
                <span className="font-mono text-[12px] text-primary">{LOSS[step].toFixed(4)}</span>
              </div>
              <svg
                viewBox="0 0 560 160"
                preserveAspectRatio="none"
                className="mt-2.5 block h-[160px] w-full"
                role="img"
                aria-label={`Training loss curve, currently ${LOSS[step].toFixed(4)}`}
              >
                {[40, 80, 120].map((y) => (
                  <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="var(--muted)" strokeWidth="1" />
                ))}
                <polyline
                  points={points}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* gpu */}
            <div className="min-w-0 shrink grow basis-[200px] rounded-lg border border-border p-3.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-medium">GPU 0 · NVIDIA GB10</span>
                <span className="font-mono text-[11px] text-muted-foreground">72°C · 25W</span>
              </div>

              <div className="mt-3.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] text-muted-foreground">GPU util</span>
                  <span className="font-mono text-[12px]">{util}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-foreground" style={{ width: `${util}%` }} />
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] text-muted-foreground">VRAM</span>
                  <span className="font-mono text-[12px]">66.4 / 121.6 GB</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[55%] rounded-full bg-foreground" />
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 font-mono text-[11.5px]">
                <dt className="text-muted-foreground">method</dt>
                <dd className="text-right">SFT · LoRA</dd>
                <dt className="text-muted-foreground">rank</dt>
                <dd className="text-right">16</dd>
                <dt className="text-muted-foreground">lr</dt>
                <dd className="text-right">2e-4</dd>
              </dl>
            </div>
          </div>

          {/* log */}
          <div className="h-[118px] overflow-hidden rounded-lg bg-[var(--sidebar)] px-3.5 py-2.5">
            {lines.map((line, i) => (
              <p
                key={i}
                className="truncate font-mono text-[11.5px] leading-[1.75] text-mock-ink"
              >
                <span className="text-muted-foreground">{line.slice(0, 8)}</span>
                {line.slice(8)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
