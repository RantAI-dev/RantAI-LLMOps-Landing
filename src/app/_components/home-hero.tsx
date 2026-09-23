"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react"
import { ArrowRight, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { brand } from "@/lib/branding"

const ROTATING_WORDS = ["Fine-tune", "Evaluate", "Serve"] as const
const ROTATE_INTERVAL_MS = 2800

const STATS = [
  { value: "Your GPU", label: "Runs where you host it" },
  { value: "Any open model", label: "Hugging Face or your registry" },
  { value: "OpenAI-compatible", label: "Serves over a standard API" },
] as const

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

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

  const word = ROTATING_WORDS[wordIndex]

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Soft brand dome behind the headline — the Agents/Claw signature opener */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-10%,#A9D9FF_0%,#D7ECFF_28%,#FFFFFF_62%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute left-1/2 top-[-28rem] size-[52rem] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
      </div>

      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40"
      >
        <motion.div variants={heroItem} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-primary backdrop-blur">
            <ShieldCheck className="size-3.5" />
            Self-hosted · your data never leaves your infrastructure
          </span>
        </motion.div>

        <motion.h1
          variants={heroItem}
          id="hero-heading"
          className="mx-auto mt-7 max-w-4xl text-balance text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl"
        >
          <span className="relative inline-flex min-w-[4.5ch] justify-center sm:min-w-[6ch]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(5px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-primary"
              >
                {word}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          your own language models — without sending data anywhere
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mx-auto mt-6 max-w-2xl text-balance text-center text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {brand.productName} takes a model from dataset to live endpoint on hardware you
          control. Fine-tune through the UI, evaluate against your own test set, then serve
          it over an OpenAI-compatible API.
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button size="lg" asChild>
            <a href={brand.demoUrl} target="_blank" rel="noreferrer">
              View demo
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">Contact sales</a>
          </Button>
        </motion.div>

        <motion.dl
          variants={heroItem}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4 border-t border-border/70 pt-8"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-tight sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  )
}
