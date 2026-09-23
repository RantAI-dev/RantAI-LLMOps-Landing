"use client"

import { ArrowRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { brand, salesHref } from "@/lib/branding"
import { Reveal } from "./reveal"

export function HomeCta() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="cta-heading"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-[var(--brand-2)] px-6 py-14 text-center sm:px-14 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_0%,rgba(92,182,249,0.32)_0%,transparent_65%)]"
            aria-hidden
          />

          <div className="relative">
            <h2
              id="cta-heading"
              className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              See it running on your own models
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-white/70">
              We will walk through fine-tuning a model on your data and serving it from your
              infrastructure — then you decide whether it fits.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <a href={brand.demoUrl} target="_blank" rel="noreferrer">
                  Request a demo
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href={salesHref} aria-label="Contact sales (opens your email app)">
                  <Mail className="size-4" />
                  Contact sales
                </a>
              </Button>
            </div>

            <p className="mt-6 font-mono text-xs text-white/40">
              {brand.salesEmail}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
