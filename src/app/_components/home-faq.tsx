"use client"

import { Accordion } from "radix-ui"

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
      className="scroll-mt-20 border-y border-border bg-[var(--sidebar)]"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 py-[120px] sm:px-8 sm:py-[140px]">
        <div className="flex flex-wrap gap-x-[72px] gap-y-10">
          <div className="min-w-0 shrink grow basis-[300px]">
            <div className="lg:sticky lg:top-[110px]">
              <p className="font-mono text-[12px] text-primary">FAQ</p>
              <h2
                id="faq-heading"
                className="mt-3 text-balance text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em]"
              >
                Questions teams ask first
              </h2>
            </div>
          </div>

          <div className="min-w-0 shrink grow-[1.8] basis-[520px]">
            <Accordion.Root
              type="single"
              collapsible
              defaultValue="item-0"
              className="border-t border-border"
            >
              {FAQS.map((faq, i) => (
                <Accordion.Item key={faq.q} value={`item-${i}`} className="border-b border-border">
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-[22px] text-left outline-none focus-visible:text-primary">
                      <span className="text-[17px] font-medium tracking-[-0.01em]">{faq.q}</span>
                      <span
                        className="mt-1 shrink-0 font-mono text-[15px] text-muted-foreground"
                        aria-hidden
                      >
                        <span className="group-data-[state=open]:hidden">+</span>
                        <span className="hidden group-data-[state=open]:inline">−</span>
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="pb-6 pr-12 text-[15px] leading-[1.65] text-muted-foreground">
                      {faq.a}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </div>
    </section>
  )
}
