import type { Metadata } from "next"
import type { ReactNode } from "react"

import { brand } from "@/lib/branding"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://llmops.rantai.dev"),
  title: {
    default: `${brand.productName} — Self-hosted LLM fine-tuning and serving`,
    template: `%s — ${brand.productName}`,
  },
  description:
    `${brand.productName} takes a model from dataset to live endpoint on hardware you control: ` +
    "fine-tune through the UI, evaluate against your own test set, then serve it over an " +
    "OpenAI-compatible API. Your data never leaves your infrastructure.",
  keywords: [
    "LLMOps",
    "fine-tuning",
    "LoRA",
    "self-hosted AI",
    "on-premise LLM",
    "vLLM",
    "model serving",
    "RantAI",
  ],
  openGraph: {
    title: `${brand.productName} — Self-hosted LLM fine-tuning and serving`,
    description: brand.tagline,
    url: "https://llmops.rantai.dev",
    siteName: brand.productName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.productName} — Self-hosted LLM fine-tuning and serving`,
    description: brand.tagline,
  },
  icons: {
    icon: [
      { url: "/logo/rantai-mark.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
