"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { brand } from "@/lib/branding"
import { HeroRunMock } from "./hero-run-mock"

const ROTATING_WORDS = ["Fine-tune", "Evaluate", "Serve"] as const
const ROTATE_INTERVAL_MS = 2800

const STATS = [
  { label: "Runs where you host it", value: "Your GPU" },
  { label: "Hugging Face or your registry", value: "Any open model" },
  { label: "Serves over a standard API", value: "OpenAI-compatible" },
] as const

export function HomeHero() {
  const [wordIndex, setWordIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length)
    }, ROTATE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [reduce])

  const word = ROTATING_WORDS[reduce ? 0 : wordIndex]

  return (
    <section
      className="mx-auto w-full max-w-[1200px] px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24"
      aria-labelledby="hero-heading"
    >
      <p className="flex items-center gap-2 font-mono text-[12px] text-muted-foreground">
        <span className="size-[7px] shrink-0 rounded-full bg-success" aria-hidden />
        Self-hosted · your data never leaves your infrastructure
      </p>

      <h1
        id="hero-heading"
        className="mt-[22px] max-w-[1000px] text-balance text-[clamp(40px,6.4vw,76px)] font-semibold leading-[1.0] tracking-[-0.04em]"
      >
        <span className="inline-flex min-w-[5.2ch] justify-start align-baseline">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={word}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="text-primary"
            >
              {word}
            </motion.span>
          </AnimatePresence>
        </span>{" "}
        your own language models — without sending data anywhere
      </h1>

      <div className="mt-9 flex flex-wrap items-end justify-between gap-6">
        <p className="max-w-[560px] text-[18px] leading-[1.6] text-muted-foreground">
          {brand.productName} takes a model from dataset to live endpoint on hardware you
          control. Fine-tune through the UI, evaluate against your own test set, then serve
          it over an OpenAI-compatible API.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            className="h-auto rounded-lg px-5 py-[13px] text-[15px] font-semibold"
            asChild
          >
            <a href={brand.demoUrl} target="_blank" rel="noreferrer">
              View demo <span aria-hidden>→</span>
            </a>
          </Button>
          <Button
            variant="outline"
            className="h-auto rounded-lg px-5 py-[13px] text-[15px] font-medium"
            asChild
          >
            <a href="#contact">Contact sales</a>
          </Button>
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] border-t border-border">
        {STATS.map((stat, i) => (
          <div
            key={stat.value}
            className={
              i < STATS.length - 1
                ? "border-border py-5 pr-6 sm:border-r sm:pl-6 sm:first:pl-0"
                : "py-5 sm:pl-6"
            }
          >
            <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="mt-1.5 text-[17px] font-semibold tracking-tight">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-2">
        <HeroRunMock />
      </div>
    </section>
  )
}
