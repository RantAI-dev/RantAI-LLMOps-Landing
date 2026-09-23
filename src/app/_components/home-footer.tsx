import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { brand, salesHref } from "@/lib/branding"

const PRODUCT_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Workflow", href: "#workflow" },
  { label: "Serving", href: "#serving" },
  { label: "FAQ", href: "#faq" },
] as const

const COMPANY_LINKS = [
  { label: "RantAI", href: brand.companyUrl, external: true },
  { label: "GitHub", href: brand.githubUrl, external: true },
  { label: "LinkedIn", href: brand.linkedinUrl, external: true },
  { label: "Email", href: `mailto:${brand.supportEmail}`, external: true },
] as const

export function HomeFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex w-fit items-center gap-2.5"
              aria-label={`${brand.productName} home`}
            >
              <Image
                src="/logo/rantai-mark.svg"
                alt=""
                width={130}
                height={100}
                className="h-[22px] w-auto"
              />
              <span className="text-[15px] font-semibold tracking-tight">
                RantAI <span className="text-primary">LLMOps</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {brand.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  Docs
                  <Badge variant="soft" className="px-1.5 py-0 font-mono text-[10px]">
                    Soon
                  </Badge>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={salesHref}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact sales
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-7 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {brand.companyName}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Self-hosted LLM fine-tuning and serving
          </p>
        </div>
      </div>
    </footer>
  )
}
