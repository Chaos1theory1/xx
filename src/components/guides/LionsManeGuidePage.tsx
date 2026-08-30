import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Calculator,
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
} from "./lionsManeGuideData";

type LionsManeGuidePageProps = {
  onNavigate?: (page: string) => void;
};

type GuideImageCardProps = {
  src: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  caption?: string;
  tall?: boolean;
};

const iconMap: Record<string, LucideIcon> = {
  FlaskConical,
  Package,
  ShieldCheck,
  Droplets,
  Thermometer,
  SunMedium,
};

const guideImages = {
  hero: {
    src: "/images/guides/lions-mane/hero-overview.avif",
    alt: "Healthy Lion's Mane mushroom growing from a clean substrate bag in a premium indoor cultivation setup.",
  },
  overview: {
    src: "/images/guides/lions-mane/overview-benefits.avif",
    alt: "Fresh Lion's Mane mushrooms displayed in a clean indoor cultivation setting.",
  },
  needTools: {
    src: "/images/guides/lions-mane/what-youll-need.avif",
    alt: "Lion's Mane mushroom growing tools and starter materials laid out on a clean table.",
  },
  step01: {
    src: "/images/guides/lions-mane/step-01-choose-route.avif",
    alt: "Beginner Lion's Mane growing setup with culture, substrate bag and workspace.",
  },
  step02: {
    src: "/images/guides/lions-mane/step-02-inoculate.avif",
    alt: "Gloved hands inoculating a Lion's Mane mushroom grow bag using a syringe.",
  },
  step03: {
    src: "/images/guides/lions-mane/step-03-colonise.avif",
    alt: "Lion's Mane substrate bag fully colonising on a clean storage shelf.",
  },
  step04: {
    src: "/images/guides/lions-mane/step-04-fruiting-conditions.avif",
    alt: "Colonised Lion's Mane grow bag placed into a humid fruiting environment.",
  },
  step05: {
    src: "/images/guides/lions-mane/step-05-pins-and-growth.avif",
    alt: "Early Lion's Mane mushroom pins developing from the fruiting opening.",
  },
  step06: {
    src: "/images/guides/lions-mane/step-06-harvest.avif",
    alt: "Lion's Mane mushroom being harvested cleanly from a grow bag.",
  },
  healthy: {
    src: "/images/guides/lions-mane/healthy-growth.avif",
    alt: "Healthy Lion's Mane mushroom fruiting cleanly from a fully colonised substrate bag.",
  },
  warning: {
    src: "/images/guides/lions-mane/warning-signs.avif",
    alt: "Contaminated Lion's Mane grow bag showing discoloration and mold warning signs.",
  },
};

const sectionLinks = [
  { id: "overview", label: "Overview" },
  { id: "what-youll-need", label: "What you'll need" },
  { id: "growing-steps", label: "Growing steps" },
  { id: "healthy-growth", label: "Healthy growth" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "faq", label: "FAQ" },
] as const;

const stepImages = [
  guideImages.step01,
  guideImages.step02,
  guideImages.step03,
  guideImages.step04,
  guideImages.step05,
  guideImages.step06,
] as const;

const relatedResources = [
  {
    title: "How to Grow Lion's Mane Mushrooms Using a Ready-to-Inoculate Grow Bag",
    body: "A more focused walkthrough for visitors who want the simplest first method with minimal setup.",
    href: "/guides/how-to-grow-lions-mane-using-ready-to-inoculate-grow-bag",
    icon: BookOpen,
  },
  {
    title: "Substrate & Preparation: Foundation of Mushroom Growing",
    body: "Help visitors understand the role of substrate, moisture, cleanliness and preparation before inoculation.",
    href: "/guides/substrate-and-preparation-foundation-of-mushroom-growing",
    icon: Package,
  },
  {
    title: "Mushroom Substrate Calculator",
    body: "A practical tool page where users can estimate ingredients and ratios for their next batch.",
    href: "/tools/mushroom-substrate-calculator",
    icon: Calculator,
  },
] as const;

function GuideImageCard({ src, alt, eyebrow, title, caption, tall = false }: GuideImageCardProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
      <div className={`relative overflow-hidden bg-stone-100 ${tall ? "min-h-[360px]" : "min-h-[260px]"}`}>
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-900/10 to-transparent" />
        {(eyebrow || title || caption) && (
          <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
            {eyebrow ? (
              <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                {eyebrow}
              </span>
            ) : null}
            {title ? <h3 className="mt-3 font-display text-xl font-bold tracking-tight">{title}</h3> : null}
            {caption ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/90">{caption}</p> : null}
          </div>
        )}
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

function QuickLinkPill({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
    >
      {label}
    </a>
  );
}

export default function LionsManeGuidePage({ onNavigate }: LionsManeGuidePageProps) {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <main className="bg-[#fcfcf9] text-stone-900">
      <section className="relative overflow-hidden border-b border-stone-200/70 bg-[#fcfcf9] px-4 pb-14 pt-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-12 h-48 w-48 rounded-full bg-emerald-100/70 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-44 w-44 rounded-full bg-stone-100 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
              <Sprout className="h-3.5 w-3.5" /> Growing Guides
            </span>

            <div className="space-y-4">
              <h1 className="font-display text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                Lion’s Mane Growing Guide
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
                A simple, confidence-building guide that takes first-time growers from their first Lion’s Mane setup to a healthy first harvest.
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

          <GuideImageCard
            src={guideImages.hero.src}
            alt={guideImages.hero.alt}
            eyebrow="Beginner-friendly guide"
            title="Grow a healthy first batch with a clean, simple setup"
            caption="Use this page as a practical roadmap: choose a good starting route, inoculate cleanly, colonise fully, fruit with humidity and fresh air, then harvest at the right moment."
            tall={true}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
          <nav className="flex min-w-max items-center gap-2" aria-label="Lion's Mane guide sections">
            {sectionLinks.map((item, index) => (
              <div key={item.id} className="inline-flex items-center gap-2">
                <QuickLinkPill id={item.id} label={item.label} />
                {index !== sectionLinks.length - 1 && <ChevronRight className="h-4 w-4 text-stone-300" />}
              </div>
            ))}
          </nav>
        </div>
      </section>

      <section id="overview" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            Overview
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">What are Lion’s Mane mushrooms?</h2>
          <p className="text-base leading-relaxed text-stone-600">
            Lion’s Mane is a distinctive gourmet mushroom known for its soft white spines, clean appearance and tender texture. It grows naturally on hardwood and is popular with home growers because one healthy block can give a very satisfying first harvest without a complicated setup.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="font-display text-2xl font-bold tracking-tight text-stone-950">Why beginners like it</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  "It looks very different from common cap-and-stem mushrooms, so growth stages are easy to spot.",
                  "It grows well on hardwood-based substrate, which makes the growing path clear and focused.",
                  "A single controlled fruiting opening often gives a neat, easy-to-manage first flush.",
                  "With stable humidity and fresh air, the results can be very rewarding even for a first batch.",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm leading-relaxed text-stone-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Nutrition benefits</p>
                <h3 className="font-display text-2xl font-bold tracking-tight text-stone-950">Nutritious, versatile and easy to enjoy</h3>
                <p className="text-sm leading-relaxed text-stone-600">
                  Lion’s Mane is valued both for cultivation and for the kitchen. Like many edible mushrooms, it is naturally light, versatile and a useful addition to a balanced diet.
                </p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Naturally light",
                    text: "A practical option for light meals, with a naturally low-fat profile and a satisfying texture.",
                  },
                  {
                    title: "Source of fibre",
                    text: "Edible mushrooms can contribute fibre, which adds structure and bite to meals.",
                  },
                  {
                    title: "Useful nutrients",
                    text: "It can provide naturally occurring nutrients such as minerals and B-vitamin compounds, depending on growing and preparation conditions.",
                  },
                  {
                    title: "Kitchen-friendly",
                    text: "Its mild flavour and meaty texture make it easy to pan-sear, roast or add to simple recipes.",
                  },
                ].map((benefit) => (
                  <div key={benefit.title} className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                    <h4 className="font-display text-lg font-semibold tracking-tight text-stone-900">{benefit.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <GuideImageCard
            src={guideImages.overview.src}
            alt={guideImages.overview.alt}
            eyebrow="Know the mushroom"
            title="Healthy Lion’s Mane should look bright, dense and fresh"
            caption="Visitors should immediately understand the target result: a clean white mushroom with soft forming spines, grown from a fully colonised hardwood-based block."
            tall={true}
          />
        </div>
      </section>

      <section id="what-youll-need" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            What you'll need
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">A simple setup is enough to get started</h2>
          <p className="text-base leading-relaxed text-stone-600">
            Visitors do not need a complex laboratory to understand the process. This section should feel reassuring and show only the essentials.
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

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <GuideImageCard
            src={guideImages.needTools.src}
            alt={guideImages.needTools.alt}
            eyebrow="Starter materials"
            title="Show the essentials, not a complicated lab"
            caption="A good photo here reassures beginners: clean spawn or culture, a prepared bag, gloves, spray bottle and simple climate tools are enough to understand the journey."
          />
          <NoteBox
            type="pro"
            title="Pro tip"
            text="A visual checklist works better than a long paragraph. Keep the cards compact, practical and easy to scan before the visitor moves to the step-by-step journey."
          />
        </div>
      </section>

      <section id="growing-steps" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
              Step-by-step journey
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">From first inoculation to first harvest</h2>
            <p className="text-base leading-relaxed text-stone-600">
              The experience should feel like a guided path. Keep each step clear, visual and practical so the visitor always knows what comes next.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600 shadow-sm">
            <div className="flex items-center gap-2 text-stone-900">
              <TimerReset className="h-4 w-4 text-emerald-700" />
              <span className="font-medium">Quick timeline</span>
            </div>
            <p className="mt-1">Start clean, colonise fully, switch to fruiting conditions, harvest at the right moment, then wait for another flush.</p>
          </div>
        </div>

        <div className="space-y-6">
          {growingSteps.map((step, index) => (
            <article key={step.step} className="grid gap-6 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm lg:grid-cols-[0.82fr_1.18fr] lg:p-7">
              <GuideImageCard
                src={stepImages[index].src}
                alt={stepImages[index].alt}
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
                    <h3 className="font-display text-2xl font-bold tracking-tight text-stone-950">{step.title}</h3>
                    <p className="text-base leading-relaxed text-stone-600">{step.body}</p>
                  </div>
                </div>

                {step.noteType && step.noteTitle && step.noteText ? (
                  <NoteBox type={step.noteType} title={step.noteTitle} text={step.noteText} />
                ) : null}

                {index === 1 ? (
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">Optional product link area</p>
                    <h4 className="mt-2 font-display text-lg font-semibold text-stone-900">Want the easiest way to start?</h4>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">
                      This is a natural spot to link Lion’s Mane culture, grain spawn or a ready-to-inoculate grow bag from Biotech Agro.
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

      <section id="healthy-growth" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            What should it look like?
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">Healthy progress versus warning signs</h2>
          <p className="text-base leading-relaxed text-stone-600">
            A side-by-side comparison helps beginners quickly understand the difference between healthy development and signs that need attention.
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

            <GuideImageCard
              src={guideImages.healthy.src}
              alt={guideImages.healthy.alt}
              eyebrow="Healthy example"
              title="Clean white growth and fresh fruiting"
              caption="Healthy Lion’s Mane usually looks evenly colonised, bright white and compact before the spines lengthen near harvest."
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

            <GuideImageCard
              src={guideImages.warning.src}
              alt={guideImages.warning.alt}
              eyebrow="Warning example"
              title="Contamination, discoloration or stalled growth"
              caption="Green, dark, slimy or sour-looking growth is a strong warning sign and should be handled carefully away from healthy blocks."
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

      <section id="troubleshooting" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            Troubleshooting
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">Common issues made simple</h2>
          <p className="text-base leading-relaxed text-stone-600">
            Keep this part easy to scan. Symptom → likely cause → simple solution is usually all a beginner needs.
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
      </section>

      <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            FAQ
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">Frequently asked beginner questions</h2>
          <p className="text-base leading-relaxed text-stone-600">
            An accordion keeps the page light while still answering the questions that matter most.
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
          <div className="max-w-3xl space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">Continue learning</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">Explore the next helpful pages</h2>
            <p className="text-base leading-relaxed text-stone-600">
              Use this final section as a clean set of internal links that helps the visitor move from the guide into deeper practical content.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {relatedResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <a
                  key={resource.title}
                  href={resource.href}
                  className="group rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-stone-950">{resource.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{resource.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-900 transition group-hover:text-emerald-800">
                    Open page <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
