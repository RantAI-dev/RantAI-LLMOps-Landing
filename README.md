# RantAI LLMOps — Landing Page

Marketing site for **RantAI LLMOps**, the self-hosted platform that takes a model from
dataset to live endpoint on hardware you control.

Built to match the design system already used by
[RantAI Agents](https://github.com/RantAI-dev) and RantAI Claw, so the three product sites
read as one family.

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Components | Radix UI primitives + shadcn conventions |
| Icons | lucide-react |
| Motion | motion (Framer Motion) |
| Type | Funnel Display via `next/font` |

## Getting started

```bash
bun install
bun run dev      # http://localhost:3005
```

Other scripts:

```bash
bun run build    # production build
bun run start    # serve the production build
```

## Structure

```
src/
  app/
    _components/       one component per landing section
      home-navbar.tsx
      home-hero.tsx
      home-features.tsx
      home-workflow.tsx
      home-serving.tsx
      home-faq.tsx
      home-cta.tsx
      home-footer.tsx
      reveal.tsx       shared scroll-reveal motion helpers
    globals.css        design tokens (theme-home) + Tailwind
    layout.tsx         metadata, fonts
    page.tsx           section composition
  components/ui/       button, badge
  lib/
    branding.ts        product name, outbound links, sales address
    utils.ts           cn()
```

## Design tokens

Tokens live in `globals.css` under `.theme-home`, carried over verbatim from the Agents
landing — primary `#0069a8`, radius `0.45rem`, brand navy `#050a30`.

The class is applied on the landing root wrapper rather than `:root`. This is deliberate:
the page is a public marketing surface and stays light regardless of the visitor's system
theme, matching the other two product sites.

## Editing content

Copy lives inside each section component as a top-level `const` array, so adding a feature
card or an FAQ entry means editing one list — no prop drilling.

Product name, demo URL, and contact addresses are centralised in `src/lib/branding.ts`.
Change them there once rather than across seven components.

## Links

- Demo — `https://demo.llmops.rantai.dev`
- Docs — not published yet, rendered with a "Soon" badge in the footer
- Sales — `contact@rantai.dev`
