"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { PANELS } from "./workflow-panels"

const STEPS = [
  {
    n: "01",
    title: "Import",
    path: "hub",
    body: "Pull a base model from Hugging Face or your own registry, and point at a dataset in object storage. On-premise corpora never have to be published anywhere public.",
  },
  {
    n: "02",
    title: "Fine-tune",
    path: "finetune",
    body: "Pick LoRA rank, learning rate, epochs, and sequence length, then launch. Loss curves and logs stream into the run view while it trains.",
  },
  {
    n: "03",
    title: "Evaluate",
    path: "evals",
    body: "Score the result against a held-out set and compare runs head to head, so a version ships on evidence rather than on a hunch.",
  },
  {
    n: "04",
    title: "Serve",
    path: "deployments",
    body: "Export to your engine of choice and expose an OpenAI-compatible endpoint. Adapters are pinned by name, so rolling out a new version changes no client code.",
  },
] as const

export function HomeWorkflow() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const stepRefs = useRef<Array<HTMLDivElement | null>>([])

  // A band across the middle of the viewport decides which step is current:
  // whichever step's box intersects it wins.
  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLDivElement[]
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const i = els.indexOf(entry.target as HTMLDivElement)
          if (i >= 0) setActive(i)
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const Panel = PANELS[active]
  const step = STEPS[active]

  return (
    <section
      id="workflow"
      className="scroll-mt-20 border-y border-border bg-[var(--sidebar)]"
      aria-labelledby="workflow-heading"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-[120px] sm:px-8 sm:py-[140px]">
        <div className="flex flex-wrap gap-x-[72px] gap-y-12">
          {/* steps */}
          <div className="min-w-0 shrink grow basis-[380px]">
            <p className="font-mono text-[12px] text-primary">Workflow</p>
            <h2
              id="workflow-heading"
              className="mt-3 text-balance text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em]"
            >
              Four steps, no context switching
            </h2>
            <p className="mt-4 max-w-[460px] text-[16px] leading-[1.6] text-muted-foreground">
              The same path every time, whether it is your first adapter or your fortieth.
            </p>

            <div className="mt-10">
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  ref={(el) => {
                    stepRefs.current[i] = el
                  }}
                  onClick={() => setActive(i)}
                  className={cn(
                    "cursor-pointer border-l-2 py-7 pl-6 transition-all duration-300 lg:min-h-[34vh]",
                    i === active
                      ? "border-primary opacity-100"
                      : "border-border opacity-[0.38]"
                  )}
                >
                  <p className="font-mono text-[12px] text-primary">{s.n}</p>
                  <h3 className="mt-2 text-[28px] font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2.5 max-w-[440px] text-[14.5px] leading-[1.6] text-muted-foreground">
                    {s.body}
                  </p>

                  {/* On narrow screens the window is not sticky, so the active
                      panel is shown inline under its own step instead. */}
                  {i === active ? (
                    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card p-4 lg:hidden">
                      <Panel />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* sticky window */}
          <div className="hidden min-w-0 shrink grow-[1.2] basis-[460px] lg:block">
            <div className="sticky top-[110px] overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(5,10,48,.04),0_24px_60px_-24px_rgba(5,10,48,.18)]">
              <div className="flex h-10 items-center justify-between border-b border-border bg-[var(--sidebar)] px-4">
                <span className="truncate font-mono text-[11px] text-muted-foreground">
                  demo.llmops.rantai.dev/{step.path}
                </span>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {step.n} / 04
                </span>
              </div>
              <div className="min-h-[420px] p-5" style={{ fontFamily: "var(--font-mock)" }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Panel />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
