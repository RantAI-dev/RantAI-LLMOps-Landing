import { Button } from "@/components/ui/button"
import { brand, salesHref } from "@/lib/branding"

export function HomeCta() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1200px] scroll-mt-20 px-5 py-[120px] sm:px-8 sm:py-[140px]"
      aria-labelledby="cta-heading"
    >
      <div className="rounded-2xl bg-[var(--brand-2)] px-[clamp(28px,5vw,64px)] py-16">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-10">
          <div className="min-w-0 shrink grow basis-[440px]">
            <h2
              id="cta-heading"
              className="text-balance text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
            >
              See it running on your own models
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] leading-[1.6] text-on-navy">
              Explore the platform with sample data to see how a run is configured, evaluated,
              and served. When you are ready to try it on your own models, talk to us.
            </p>

            <p className="mt-8 overflow-x-auto rounded-lg border border-white/[0.14] px-4 py-3 font-mono text-[13px] whitespace-nowrap text-on-navy">
              <span className="text-[var(--brand-1)]">$</span> curl
              https://llm.your-company.internal/v1/models
            </p>
          </div>

          <div className="shrink-0">
            <div className="flex flex-wrap gap-3">
              <Button
                className="h-auto rounded-lg bg-white px-5 py-[13px] text-[15px] font-semibold text-[var(--brand-2)] hover:bg-primary-tint"
                asChild
              >
                <a href={brand.demoUrl} target="_blank" rel="noreferrer">
                  View demo <span aria-hidden>→</span>
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-auto rounded-lg border-white/30 bg-transparent px-5 py-[13px] text-[15px] font-medium text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href={salesHref} aria-label="Contact sales (opens your email app)">
                  Contact sales
                </a>
              </Button>
            </div>
            <p className="mt-4 font-mono text-[12px] text-on-navy-meta">{brand.salesEmail}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
