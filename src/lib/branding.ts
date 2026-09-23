/**
 * Single source of truth for product naming and outbound links, mirroring the
 * `brand` object the Agents landing reads from. Keeping the copy here means a
 * rename or a URL change never has to be chased across seven components.
 */
export const brand = {
  productName: "RantAI LLMOps",
  productShortName: "LLMOps",
  companyName: "RantAI",
  companyUrl: "https://rantai.dev",

  tagline: "Fine-tune and serve your own models, on your own infrastructure.",

  // Outbound links
  demoUrl: "https://demo.llmops.rantai.dev",
  docsUrl: null as string | null, // not published yet — UI renders a "Soon" badge
  salesEmail: "contact@rantai.dev",
  supportEmail: "admin@rantai.dev",
  linkedinUrl: "https://www.linkedin.com/company/rantai-dev/",
  githubUrl: "https://github.com/RantAI-dev",
} as const

export const salesHref = `mailto:${brand.salesEmail}?subject=${encodeURIComponent(
  `${brand.productName} — Sales enquiry`
)}`
