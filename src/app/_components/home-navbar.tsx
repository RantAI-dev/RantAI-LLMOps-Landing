"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { brand } from "@/lib/branding"

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Workflow", href: "#workflow" },
  { label: "Serving", href: "#serving" },
  { label: "FAQ", href: "#faq" },
] as const

export function HomeNavbar() {
  const [open, setOpen] = useState(false)

  // Lock the page behind the mobile sheet so the body does not scroll under it.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/86 backdrop-blur-[10px]">
      <nav
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8"
        aria-label="Main"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${brand.productName} home`}
        >
          <Image
            src="/logo/rantai-mark.svg"
            alt=""
            width={130}
            height={100}
            priority
            className="h-5 w-auto"
          />
          <span className="text-[15px] font-semibold tracking-tight">
            RantAI <span className="text-primary">LLMOps</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#contact"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Contact sales
          </a>
          <Button
            size="sm"
            className="h-auto rounded-[7px] px-3.5 py-2 text-sm font-semibold"
            asChild
          >
            <a href={brand.demoUrl} target="_blank" rel="noreferrer">
              View demo
            </a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-9 items-center justify-center rounded-md text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "border-t border-border bg-background px-5 pb-5 pt-3 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <Button variant="outline" asChild>
            <a href="#contact" onClick={() => setOpen(false)}>
              Contact sales
            </a>
          </Button>
          <Button asChild>
            <a href={brand.demoUrl} target="_blank" rel="noreferrer">
              View demo
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
