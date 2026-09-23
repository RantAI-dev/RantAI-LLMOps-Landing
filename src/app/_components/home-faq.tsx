"use client"

import { Accordion } from "radix-ui"
import { ChevronDown } from "lucide-react"

import { Reveal } from "./reveal"

const FAQS = [
  {
    q: "Where does our data actually go?",
    a: "Nowhere. The platform runs inside your own environment — training data, model weights, and inference traffic all stay on your hardware. There is no call home, and no vendor-side copy of your corpus.",
  },
  {
    q: "Do we need a cluster to run this?",
    a: "No. A single workstation-class GPU is enough for LoRA fine-tuning on small and mid-sized models, and several adapters can share one card at serving time. It scales up if you have more, but it does not require it.",
  },
  {
    q: "What kind of models can we fine-tune?",
    a: "Open-weight instruction models from Hugging Face or your own registry. Teams commonly start from a 3B–8B base, which is large enough for domain behaviour and small enough to serve economically.",
  },
  {
    q: "Is fine-tuning the same as teaching it our documents?",
    a: "No, and conflating the two is the most common mistake. Fine-tuning changes how a model behaves — its format, tone, and refusals. Facts belong in retrieval. The platform supports both, but they solve different problems.",
  },
  {
    q: "How does this fit with our existing stack?",
    a: "The output is an OpenAI-compatible endpoint, so anything that speaks that protocol works unchanged — including RantAI Agents. Adapters are addressed by name, so shipping a new version does not touch client code.",
  },
  {
    q: "Can we run this fully offline?",
    a: "Yes, once models and dependencies are mirrored internally. This is the usual setup for air-gapped and on-premise deployments.",
  },
] as const

export function HomeFaq() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-20 border-y border-border bg-[var(--sidebar)]"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Questions teams ask first
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <Accordion.Root type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <Accordion.Item
                key={faq.q}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium tracking-tight outline-none transition-colors hover:bg-accent/50 focus-visible:ring-[3px] focus-visible:ring-ring/50">
                    {faq.q}
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </div>
    </section>
  )
}
