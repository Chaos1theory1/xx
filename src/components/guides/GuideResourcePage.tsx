import React from "react";
import { ArrowLeft, BookOpen, Calculator, Package, Sprout } from "lucide-react";

type ResourceKind = "ready-bag" | "substrate" | "calculator";

type GuideResourcePageProps = {
  kind: ResourceKind;
  onNavigate: (page: string) => void;
};

const resources = {
  "ready-bag": {
    badge: "Lion’s Mane Guide",
    title: "How to Grow Lion's Mane Mushrooms Using a Ready-to-Inoculate Grow Bag",
    intro: "A dedicated step-by-step page for the simplest Lion’s Mane starting method: inoculate the prepared bag, let it colonise, introduce fruiting conditions and harvest at the right stage.",
    icon: BookOpen,
  },
  substrate: {
    badge: "Growing Fundamentals",
    title: "Substrate & Preparation: Foundation of Mushroom Growing",
    intro: "A dedicated guide to substrate choice, hydration, supplementation, cleanliness and preparation before inoculation.",
    icon: Package,
  },
  calculator: {
    badge: "Growing Tool",
    title: "Mushroom Substrate Calculator",
    intro: "A practical calculator page for estimating substrate ingredients, hydration and batch size before preparing a grow.",
    icon: Calculator,
  },
} as const;

export default function GuideResourcePage({ kind, onNavigate }: GuideResourcePageProps) {
  const resource = resources[kind];
  const Icon = resource.icon;

  return (
    <main className="min-h-[70vh] bg-[#fcfcf9] px-4 py-16 text-stone-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => onNavigate("guide-lions-mane")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-emerald-800"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Lion’s Mane Growing Guide
        </button>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-emerald-50 via-white to-stone-50 p-8 sm:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <Icon className="h-7 w-7" />
            </div>
            <div className="mt-6 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
                <Sprout className="h-3.5 w-3.5" /> {resource.badge}
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">{resource.title}</h1>
              <p className="mt-5 text-lg leading-relaxed text-stone-600">{resource.intro}</p>
            </div>
          </div>

          <div className="border-t border-stone-200 p-8 sm:p-10">
            <p className="text-sm leading-relaxed text-stone-600">
              Detailed Biotech Agro guidance for this topic will live on this page, keeping the growing guide connected to a clear next step without sending visitors away from the website.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
