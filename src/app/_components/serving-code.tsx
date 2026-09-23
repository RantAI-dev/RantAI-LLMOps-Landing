"use client"

import { useEffect, useRef, useState } from "react"
import { Tabs } from "radix-ui"
import { useInView, useReducedMotion } from "motion/react"

export type Lang = "ts" | "py" | "curl"

const TAB_LABELS: Record<Lang, string> = {
  ts: "TypeScript",
  py: "Python",
  curl: "curl",
}

const RESPONSE =
  "Open Settings → Account and choose Reset password. A reset link goes to your registered email and expires after 30 minutes."

/**
 * Tabs plus the streamed response. The highlighted markup for each language is
 * rendered by shiki on the server and handed in as `html`, so no highlighter
 * ships to the browser.
 */
export function ServingCode({ html }: { html: Record<Lang, string> }) {
  const [lang, setLang] = useState<Lang>("ts")
  const [resp, setResp] = useState("")
  const [running, setRunning] = useState(false)
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3, once: false })
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const stream = () => {
    if (timer.current) clearInterval(timer.current)
    if (reduce) {
      setResp(RESPONSE)
      setRunning(false)
      return
    }
    const words = RESPONSE.split(" ")
    let i = 0
    setResp("")
    setRunning(true)
    timer.current = setInterval(() => {
      i += 1
      setResp(words.slice(0, i).join(" "))
      if (i >= words.length) {
        if (timer.current) clearInterval(timer.current)
        setRunning(false)
      }
    }, 70)
  }

  // Run on first view and whenever the language changes; stop when off-screen.
  useEffect(() => {
    if (!inView) {
      if (timer.current) clearInterval(timer.current)
      return
    }
    stream()
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, lang, reduce])

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-code-border bg-code-bg"
    >
      <Tabs.Root value={lang} onValueChange={(v) => setLang(v as Lang)}>
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4">
          <Tabs.List className="flex gap-4" aria-label="Client language">
            {(Object.keys(TAB_LABELS) as Lang[]).map((k) => (
              <Tabs.Trigger
                key={k}
                value={k}
                className="relative py-3 font-mono text-[12px] text-[var(--code-comment)] outline-none transition-colors data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-2px_0_var(--brand-1)] focus-visible:text-white"
              >
                {TAB_LABELS[k]}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <button
            type="button"
            onClick={stream}
            className="my-2 shrink-0 rounded-md bg-[var(--brand-1)] px-2.5 py-1 font-mono text-[12px] font-semibold text-[var(--brand-2)] transition-opacity hover:opacity-90"
          >
            {running ? "Streaming…" : "Run ▸"}
          </button>
        </div>

        {(Object.keys(TAB_LABELS) as Lang[]).map((k) => (
          <Tabs.Content key={k} value={k} className="outline-none">
            <div
              className="overflow-x-auto px-[22px] py-5 font-mono text-[12.5px] leading-[1.75] [&_pre]:!bg-transparent [&_pre]:!m-0 [&_code]:!bg-transparent"
              dangerouslySetInnerHTML={{ __html: html[k] }}
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>

      <div className="border-t border-white/[0.08] px-[22px] py-4">
        <p className="font-mono text-[11px] text-[var(--code-comment)]">
          response · model: support-agent · engine: vllm
        </p>
        <p className="mt-2 text-[13.5px] leading-[1.7] text-code-ink">
          {resp}
          {running ? (
            <span
              className="ml-0.5 inline-block h-[1.1em] w-[0.5ch] translate-y-[0.15em] bg-[var(--brand-1)] align-baseline motion-safe:animate-caret-blink"
              aria-hidden
            />
          ) : null}
        </p>
      </div>
    </div>
  )
}
