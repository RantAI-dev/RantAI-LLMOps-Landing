import {
  VisualDataStaysPut,
  VisualEngines,
  VisualEvaluate,
  VisualManyBehaviours,
  VisualPipeline,
  VisualReproducible,
} from "./feature-visuals"

const FEATURES = [
  {
    title: "Your data stays put",
    body: "Training data, model weights, and inference traffic never leave your servers. For universities, government, and regulated industries, that is not a feature — it is the requirement that rules out every hosted API.",
    basis: "flex-[1.6_1_520px]",
    Visual: VisualDataStaysPut,
  },
  {
    title: "Many behaviours, one GPU",
    body: "LoRA adapters attach to a single frozen base model, so several fine-tuned behaviours can share one card instead of each needing its own deployment.",
    basis: "flex-[1_1_340px]",
    Visual: VisualManyBehaviours,
  },
  {
    title: "Evaluate before you ship",
    body: "Run a trained adapter against a held-out set and compare it with the base model, side by side. Promote a version because the numbers moved, not because the loss curve looked pleasant.",
    basis: "flex-[1_1_340px]",
    Visual: VisualEvaluate,
  },
  {
    title: "Bring your own engine",
    body: "Export to vLLM, Ollama, or llama.cpp and serve over an OpenAI-compatible API. Existing clients point at a new base URL and keep working.",
    basis: "flex-[1_1_340px]",
    Visual: VisualEngines,
  },
  {
    title: "Every run is reproducible",
    body: "Hyperparameters, dataset version, and base model are recorded per job. Compare runs, trace a regression back to what changed, and rerun it.",
    basis: "flex-[1_1_340px]",
    Visual: VisualReproducible,
  },
] as const

export function HomeFeatures() {
  return (
    <section
      id="platform"
      className="mx-auto w-full max-w-[1200px] scroll-mt-20 px-5 py-[120px] sm:px-8 sm:py-[140px]"
      aria-labelledby="platform-heading"
    >
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-[620px]">
          <p className="font-mono text-[12px] text-primary">Platform</p>
          <h2
            id="platform-heading"
            className="mt-3 text-balance text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] tracking-[-0.03em]"
          >
            Everything between a raw model and a working endpoint
          </h2>
        </div>
        <p className="max-w-[400px] text-[16px] leading-[1.6] text-muted-foreground">
          Most teams stitch this together from notebooks, shell scripts, and a serving
          container nobody wants to touch. This replaces that seam.
        </p>
      </div>

      <div className="mt-14 flex flex-wrap gap-4">
        {FEATURES.map(({ title, body, basis, Visual }) => (
          <article
            key={title}
            className={`min-w-0 rounded-xl border border-border p-3 ${basis}`}
          >
            <Visual />
            <div className="px-3 pb-3 pt-5">
              <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-muted-foreground">{body}</p>
            </div>
          </article>
        ))}

        {/* Full-width closer: text beside the pipeline rather than above it. */}
        <article className="min-w-0 flex-[1_1_100%] rounded-xl border border-border p-3">
          <div className="flex flex-wrap gap-4">
            <div className="min-w-0 shrink grow basis-[300px] px-3 py-5">
              <h3 className="text-[18px] font-semibold tracking-[-0.01em]">
                Dataset to endpoint, one place
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.6] text-muted-foreground">
                Import a model and a dataset, fine-tune, evaluate, export, and serve — without
                switching tools or writing glue scripts between five of them.
              </p>
            </div>
            <div className="min-w-0 shrink grow-[2] basis-[520px]">
              <VisualPipeline />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
