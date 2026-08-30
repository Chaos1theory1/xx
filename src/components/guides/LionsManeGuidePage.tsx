import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Droplets,
  FlaskConical,
  Lightbulb,
  Package,
  ShieldCheck,
  Sprout,
  SunMedium,
  Thermometer,
  TimerReset,
  Wind,
  type LucideIcon,
} from "lucide-react";
import {
  commonIssues,
  faqItems,
  guideStats,
  growingNeeds,
  growingSteps,
  healthyVsWarning,
  pageMetadata,
} from "./lionsManeGuideData";

type LionsManeGuidePageProps = {
  onNavigate?: (page: string) => void;
};

const iconMap: Record<string, LucideIcon> = {
  FlaskConical,
  Package,
  ShieldCheck,
  Droplets,
  Thermometer,
  SunMedium,
};

function GuideImagePlaceholder({
  eyebrow,
  title,
  caption,
  tall = false,
}: {
  eyebrow: string;
  title: string;
  caption: string;
  tall?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-stone-50 p-5 ${
        tall ? "min-h-[340px]" : "min-h-[230px]"
      }`}
    >
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-100 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-stone-100 blur-2xl" />
      <div className="relative h-full flex flex-col justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            {eyebrow}
          </span>
          <h3 className="font-display text-xl font-bold tracking-tight text-stone-900">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-stone-600">{caption}</p>
        </div>

        <div className="rounded-2xl border border-dashed border-emerald-300 bg-white/80 px-4 py-5 text-sm text-stone-500">
          Replace with a final Biotech Agro photo or original illustration for this stage.
        </div>
      </div>
    </div>
  );
}

function NoteBox({
  type,
  title,
  text,
}: {
  type: "good" | "pro" | "important" | "watch";
  title: string;
  text: string;
}) {
  const styles = {
    good: {
      icon: BadgeCheck,
      wrap: "border-emerald-200 bg-emerald-50/70",
      iconWrap: "bg-emerald-100 text-emerald-800",
    },
    pro: {
      icon: Lightbulb,
      wrap: "border-amber-200 bg-amber-50/70",
      iconWrap: "bg-amber-100 text-amber-800",
    },
    important: {
      icon: CircleHelp,
      wrap: "border-sky-200 bg-sky-50/70",
      iconWrap: "bg-sky-100 text-sky-800",
    },
    watch: {
      icon: AlertTriangle,
      wrap: "border-rose-200 bg-rose-50/70",
      iconWrap: "bg-rose-100 text-rose-800",
    },
  } as const;

  const cfg = styles[type];
  const Icon = cfg.icon;

  return (
    <div className={`rounded-2xl border p-4 ${cfg.wrap}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.iconWrap}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-display text-base font-semibold text-stone-900">{title}</h4>
          <p className="text-sm leading-relaxed text-stone-700">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default function LionsManeGuidePage({ onNavigate }: LionsManeGuidePageProps) {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const quickLinks = useMemo(
    () => [
      "Overview",
      "What you'll need",
      "Growing steps",
      "Healthy growth",
      "Troubleshooting",
      "FAQ",
    ],
    []
  );

  return (
    <main className="bg-[#fcfcf9] text-stone-900">
      <section className="relative overflow-hidden border-b border-stone-200/70 bg-[#fcfcf9] px-4 pb-14 pt-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-12 h-48 w-48 rounded-full bg-emerald-100/70 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-44 w-44 rounded-full bg-stone-100 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
              <Sprout className="h-3.5 w-3.5" /> Growing Guides
            </span>

            <div className="space-y-4">
              <h1 className="font-display text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                Lion’s Mane Growing Guide
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
                A clean, beginner-friendly walkthrough that takes visitors from their first Lion’s Mane culture or spawn to a confident first harvest.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {guideStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">{item.label}</p>
                  <h2 className="mt-2 font-display text-lg font-semibold tracking-tight text-stone-900">{item.value}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.hint}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                onClick={() => onNavigate?.("products")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
              >
                Explore Lion’s Mane Products <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate?.("contact")}
                className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
              >
                Ask for Growing Support
              </button>
            </div>
          </div>

          <GuideImagePlaceholder
            eyebrow="Hero image"
            title="Full-width product + cultivation visual"
            caption="Recommended final image: a premium close-up of a healthy Lion’s Mane cluster beside a clean Biotech Agro grow setup or inoculated substrate block."
            tall={true}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
          <div className="flex min-w-max items-center gap-2">
            {quickLinks.map((item, index) => (
              <div key={item} className="inline-flex items-center gap-2">
                <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700">
                  {item}
                </span>
                {index !== quickLinks.length - 1 && <ChevronRight className="h-4 w-4 text-stone-300" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            What you'll need
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">A simple setup is enough to get started</h2>
          <p className="text-base leading-relaxed text-stone-600">
            This section should feel reassuring: visitors do not need a complex laboratory setup to understand the process. The goal is to show only the essentials.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {growingNeeds.map((need) => {
            const Icon = iconMap[need.icon] || Package;
            return (
              <article key={need.title} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-stone-900">{need.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{need.text}</p>
              </article>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <GuideImagePlaceholder
            eyebrow="Suggested section visual"
            title="Tools laid out as a clean flat-lay"
            caption="Recommended photo: syringe or culture, filtered bag, spray bottle, gloves, thermometer/hygrometer and a tidy work surface."
          />
          <NoteBox
            type="pro"
            title="Pro tip"
            text="A visual checklist works better than a long paragraph here. Use 6 compact cards with an icon, one short sentence and a clean product-style photo nearby."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
              Step-by-step journey
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">From first inoculation to first harvest</h2>
            <p className="text-base leading-relaxed text-stone-600">
              The page should feel like a guided path. Use numbered sections, compact notes and one image recommendation for every major stage.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600 shadow-sm">
            <div className="flex items-center gap-2 text-stone-900">
              <TimerReset className="h-4 w-4 text-emerald-700" />
              <span className="font-medium">Quick timeline</span>
            </div>
            <p className="mt-1">Colonisation usually comes first, then fruiting, then harvest, then additional flushes.</p>
          </div>
        </div>

        <div className="space-y-6">
          {growingSteps.map((step, index) => (
            <article key={step.step} className="grid gap-6 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm lg:grid-cols-[0.8fr_1.2fr] lg:p-7">
              <GuideImagePlaceholder
                eyebrow={`Step ${step.step}`}
                title={step.imageTitle}
                caption={step.imageCaption}
              />

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-stone-900 text-lg font-bold text-white">
                    {step.step}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-stone-950">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-stone-600">{step.body}</p>
                  </div>
                </div>

                {step.noteType && step.noteTitle && step.noteText ? (
                  <NoteBox type={step.noteType} title={step.noteTitle} text={step.noteText} />
                ) : null}

                {index === 1 ? (
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Natural CTA area</p>
                    <h4 className="mt-2 font-display text-lg font-semibold text-stone-900">Need a simpler start?</h4>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">
                      Insert a small product card or button linking to Biotech Agro Lion’s Mane culture, spawn or ready-to-inoculate kits.
                    </p>
                  </div>
                ) : null}

                {index === 3 ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-stone-200 bg-emerald-50/60 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                        <Thermometer className="h-4 w-4 text-emerald-700" /> Fruiting temperature
                      </div>
                      <p className="mt-2 text-sm text-stone-600">A practical beginner range is about 16–21°C.</p>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-emerald-50/60 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                        <Droplets className="h-4 w-4 text-emerald-700" /> Humidity
                      </div>
                      <p className="mt-2 text-sm text-stone-600">Keep air humid, often around 85–95%, without making the fruit soggy.</p>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-emerald-50/60 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                        <Wind className="h-4 w-4 text-emerald-700" /> Fresh air
                      </div>
                      <p className="mt-2 text-sm text-stone-600">Use gentle, regular air exchange rather than stagnant sealed air.</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            What should it look like?
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">Healthy progress versus warning signs</h2>
          <p className="text-base leading-relaxed text-stone-600">
            A visual comparison section is especially helpful for beginners. This should combine a split-layout photo comparison with short bullet lists.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-[2rem] border border-emerald-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">Healthy signs</p>
                <h3 className="font-display text-xl font-bold tracking-tight text-stone-950">This is what you want to see</h3>
              </div>
            </div>

            <GuideImagePlaceholder
              eyebrow="Suggested visual"
              title="Healthy colonisation and clean fruiting"
              caption="Recommended split image: healthy white block on one side and a good mature Lion’s Mane fruit on the other."
            />

            <ul className="space-y-3 text-sm text-stone-700">
              {healthyVsWarning.healthy.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-[2rem] border border-rose-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-800">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-rose-700">Warning signs</p>
                <h3 className="font-display text-xl font-bold tracking-tight text-stone-950">Things that need attention</h3>
              </div>
            </div>

            <GuideImagePlaceholder
              eyebrow="Suggested visual"
              title="Unhealthy or contaminated examples"
              caption="Recommended comparison image showing clear contamination colors or stalled unhealthy pins."
            />

            <ul className="space-y-3 text-sm text-stone-700">
              {healthyVsWarning.warning.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            Troubleshooting
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">Common issues made simple</h2>
          <p className="text-base leading-relaxed text-stone-600">
            Keep this part scannable. A compact card format is easier for beginners than a large technical table.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {commonIssues.map((issue) => (
            <article key={issue.symptom} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Symptom</p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-stone-900">{issue.symptom}</h3>

              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Likely cause</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{issue.cause}</p>

              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Simple solution</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{issue.solution}</p>
            </article>
          ))}
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-gradient-to-r from-stone-900 to-stone-800 p-6 text-white shadow-sm">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">Natural CTA area</p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">Need help choosing the right Lion’s Mane starting product?</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-300">
                Add a small CTA strip here linking to Lion’s Mane culture, spawn, all-in-one bags or direct support from Biotech Agro.
              </p>
            </div>
            <button
              onClick={() => onNavigate?.("products")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
            >
              View Product Options <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">Frequently asked beginner questions</h2>
          <p className="text-base leading-relaxed text-stone-600">
            An accordion works well here because it keeps the page light while still answering the questions that matter most.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <article key={faq.question} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-lg font-semibold tracking-tight text-stone-900">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-stone-500 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen ? <div className="border-t border-stone-100 px-5 py-4 text-sm leading-relaxed text-stone-600">{faq.answer}</div> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-stone-50 p-8 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">Final CTA</p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">Ready to grow your first Lion’s Mane batch?</h2>
              <p className="max-w-2xl text-base leading-relaxed text-stone-600">
                This final block should feel supportive, not pushy. Invite the visitor to choose a starter product, compare options or contact Biotech Agro for practical guidance.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  onClick={() => onNavigate?.("products")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
                >
                  Shop Lion’s Mane Options <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onNavigate?.("contact")}
                  className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
                >
                  Contact Biotech Agro
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">SEO metadata</p>
              <div className="mt-3 space-y-3 text-sm text-stone-700">
                <div>
                  <span className="font-semibold text-stone-900">Slug:</span> {pageMetadata.slug}
                </div>
                <div>
                  <span className="font-semibold text-stone-900">Meta title:</span> {pageMetadata.metaTitle}
                </div>
                <div>
                  <span className="font-semibold text-stone-900">Meta description:</span> {pageMetadata.metaDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
