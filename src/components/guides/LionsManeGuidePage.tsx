import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Droplets,
  Dumbbell,
  FlaskConical,
  Package,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  SunMedium,
  Thermometer,
  TimerReset,
  Wheat,
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
import { guideTranslate, type GuideLanguage } from "./lionsManeGuideTranslations";

type LionsManeGuidePageProps = {
  onNavigate?: (page: string) => void;
  currentLanguage?: GuideLanguage;
};

type GuideImageCardProps = {
  src: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  caption?: string;
  size?: "default" | "tall" | "full" | "hero";
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
  guideImages.step02,
  guideImages.step03,
  guideImages.step04,
  guideImages.step05,
  guideImages.step06,
] as const;

const stepVisualCopy = [
  {
    eyebrow: "Step 02",
    title: "Inject through the port or mix spawn evenly",
    caption: "Use clean hands, clean tools and keep the bag or container open only as long as needed.",
  },
  {
    eyebrow: "Step 03",
    title: "A healthy block becomes whiter and firmer",
    caption: "During colonisation, keep the bag sealed and let the mycelium spread through the whole substrate.",
  },
  {
    eyebrow: "Step 04",
    title: "Move the block into a humid fruiting space",
    caption: "One controlled opening and steady fresh air are usually enough to trigger a clean first flush.",
  },
  {
    eyebrow: "Step 05",
    title: "Pins develop into a dense white cluster",
    caption: "Early growth should stay bright white and compact as the soft spines begin to form.",
  },
  {
    eyebrow: "Step 06",
    title: "Harvest when the cluster is full and still bright",
    caption: "Cut near the base with a clean knife, then keep the block hydrated for a possible second flush.",
  },
] as const;

const startingRoutes = [
  {
    label: "Route A",
    title: "Ready-to-fruit block",
    body: "The easiest route. The block is already colonised, so you only need to open it correctly and provide fruiting conditions.",
  },
  {
    label: "Route B",
    title: "Ready-to-inoculate hardwood bag",
    body: "A good beginner route. Inject the culture into the grain section, let it colonise, then fruit the finished block.",
  },
  {
    label: "Route C",
    title: "Prepared grain spawn",
    body: "A practical next step for growers who want more control. Colonised grain is mixed into a clean hardwood fruiting substrate.",
  },
  {
    label: "Route D",
    title: "Culture to grain, then grain to substrate",
    body: "The most hands-on route. Liquid culture or agar is first expanded on sterilised grain before that grain is used to inoculate the fruiting block.",
  },
] as const;

const relatedResources = [
  {
    title: "How to Grow Lion's Mane Mushrooms Using a Ready-to-Inoculate Grow Bag",
    body: "Follow the easiest beginner method, from inoculation through colonisation to the first harvest.",
    href: "/guides/lions-mane-ready-to-inoculate-grow-bag",
    page: "guide-lions-mane-ready-bag",
    icon: BookOpen,
  },
  {
    title: "Substrate & Preparation: Foundation of Mushroom Growing",
    body: "Learn what a good substrate contains, how to hydrate it well and how to prepare it cleanly.",
    href: "/guides/substrate-preparation",
    page: "guide-substrate-preparation",
    icon: Package,
  },
  {
    title: "Mushroom Substrate Calculator",
    body: "Estimate ingredient quantities, hydration and batch size before you prepare your next grow.",
    href: "/tools/mushroom-substrate-calculator",
    page: "tool-substrate-calculator",
    icon: Calculator,
  },
] as const;

function GuideImageCard({ src, alt, eyebrow, title, caption, size = "default" }: GuideImageCardProps) {
  const sizeClass = {
    default: "min-h-[260px]",
    tall: "min-h-[360px]",
    full: "h-full min-h-[340px]",
    hero: "min-h-[420px] lg:min-h-[520px]",
  } as const;

  const fillHeight = size === "full";

  return (
    <div className={`${fillHeight ? "h-full" : ""} overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm`}>
      <div className={`relative overflow-hidden bg-stone-100 ${fillHeight ? "h-full" : ""} ${sizeClass[size]}`}>
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        {(eyebrow || title || caption) && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/15 to-transparent" />}
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
      icon: Sprout,
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

export default function LionsManeGuidePage({ onNavigate, currentLanguage = "en" }: LionsManeGuidePageProps) {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const t = (text: string) => guideTranslate(text, currentLanguage);
  const stepsAfterRoute = growingSteps.slice(1);

  return (
    <main dir={currentLanguage === "ar" ? "rtl" : "ltr"} className="bg-[#fcfcf9] text-stone-900">
      <section className="relative overflow-hidden border-b border-stone-200/70 bg-[#fcfcf9] px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-12 h-48 w-48 rounded-full bg-emerald-100/70 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-44 w-44 rounded-full bg-stone-100 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
              <Sprout className="h-3.5 w-3.5" /> {t("Growing Guides")}
            </span>

            <div className="space-y-4">
              <h1 className="font-display text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
                {t('Lion’s Mane Growing Guide')}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
                {t('A simple, confidence-building guide that takes first-time growers from their first Lion’s Mane setup to a healthy first harvest.')}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {guideStats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">{t(item.label)}</p>
                  <h2 className="mt-2 font-display text-lg font-semibold tracking-tight text-stone-900">{t(item.value)}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{t(item.hint)}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                onClick={() => onNavigate?.("products")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
              >
                {t("Explore Lion’s Mane Products")} <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate?.("contact")}
                className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
              >
                {t('Ask for Growing Support')}
              </button>
            </div>
          </div>

          <GuideImageCard
            src={guideImages.hero.src}
            alt={guideImages.hero.alt}
            eyebrow={t('Beginner-friendly guide')}
            title={t('Grow a healthy first batch with a clean, simple setup')}
            caption={t('Follow the process from choosing a good starting route to harvest and a possible second flush.')}
            size="hero"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm">
          <nav className="flex min-w-max items-center gap-2" aria-label={t("Lion's Mane guide sections")}>
            {sectionLinks.map((item, index) => (
              <div key={item.id} className="inline-flex items-center gap-2">
                <QuickLinkPill id={item.id} label={t(item.label)} />
                {index !== sectionLinks.length - 1 && <ChevronRight className="h-4 w-4 text-stone-300" />}
              </div>
            ))}
          </nav>
        </div>
      </section>

      <section id="overview" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            {t('Overview')}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">{t('What are Lion’s Mane mushrooms?')}</h2>
          <p className="text-base leading-relaxed text-stone-600">
            {t('Lion’s Mane is a gourmet mushroom recognised by its white cascading spines and dense, rounded shape. It grows best on hardwood-based substrates and is especially popular with home growers because the growth stages are easy to follow.')}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="font-display text-2xl font-bold tracking-tight text-stone-950">{t('Why beginners like it')}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                "The growth stages are easy to recognise, from white colonisation to compact fruiting clusters.",
                "It performs well on hardwood-based substrate, which keeps the starting method clear and consistent.",
                "A single fruiting opening usually produces a neat, easy-to-manage first flush.",
                "With stable humidity and fresh air, the first harvest can be very rewarding even for a beginner.",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm leading-relaxed text-stone-600">
                  {t(item)}
                </div>
              ))}
            </div>
          </div>

          <GuideImageCard
            src={guideImages.overview.src}
            alt={guideImages.overview.alt}
            eyebrow={t('Know the mushroom')}
            title={t('Healthy Lion’s Mane should look bright, dense and fresh')}
            caption={t('A mature fruit is usually white, compact and evenly formed, with soft spines developing as it approaches harvest.')}
            size="tall"
          />
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-7 lg:p-8">
          <div className="max-w-4xl space-y-3">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
              {t('Nutrition benefits')}
            </span>
            <h3 className="font-display text-3xl font-bold tracking-tight text-stone-950">{t('Much more than a gourmet mushroom')}</h3>
            <p className="text-base leading-relaxed text-stone-600">
              {t('Lion’s Mane combines protein, dietary fibre, micronutrients and naturally occurring mushroom compounds. Beyond its culinary appeal, its nutritional profile and distinctive fungal compounds continue to attract scientific interest.')}
            </p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.15fr]">
            {[
              {
                icon: Dumbbell,
                title: 'Protein',
                text: 'Provides protein as part of its nutritional profile, with the proportion becoming more concentrated in dried mushroom products.',
              },
              {
                icon: Wheat,
                title: 'Fibre & β-glucans',
                text: 'Provides dietary fibre together with β-glucans, naturally occurring mushroom polysaccharides that contribute to its nutritional interest.',
              },
              {
                icon: Sparkles,
                title: 'Vitamins & minerals',
                text: 'Naturally contains B-group vitamins and minerals such as potassium, zinc and manganese, with levels varying by cultivation and preparation.',
              },
              {
                icon: ShieldCheck,
                title: 'Bioactive compounds',
                text: 'Contains ergothioneine, phenolic compounds and other fungal molecules being studied for their biological properties.',
              },
            ].map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title} className="flex min-h-[285px] flex-col rounded-[1.6rem] border border-stone-200 bg-white p-5 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h4 className="mt-5 font-display text-base font-bold uppercase tracking-[0.06em] text-stone-950">{t(benefit.title)}</h4>
                  <div className="mt-3 h-0.5 w-8 bg-emerald-300" />
                  <p className="mt-4 text-sm leading-relaxed text-stone-600">{t(benefit.text)}</p>
                </article>
              );
            })}

            <aside className="flex min-h-[285px] flex-col rounded-[1.6rem] border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-5 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                <Star className="h-7 w-7" />
              </div>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">{t('Why it matters')}</p>
              <h4 className="mt-2 font-display text-xl font-bold tracking-tight text-stone-950">{t('A broad nutritional profile in one mushroom')}</h4>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                {t('Lion’s Mane brings together protein, fibre, micronutrients and distinctive fungal compounds, helping explain its growing place in functional-food discussions.')}
              </p>
            </aside>
          </div>

          <div className="mt-5 rounded-[1.6rem] border border-sky-200 bg-sky-50/70 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-700 shadow-sm">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-800">{t('Research spotlight')}</p>
                <h4 className="mt-1 font-display text-xl font-bold tracking-tight text-stone-950">{t('Cognition, focus and emotional wellbeing')}</h4>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">
                  {t('Lion’s Mane is being studied for possible effects on cognitive performance, focus, mood and perceived stress. Early human studies are promising, but the evidence is still developing and should not be read as a medical claim.')}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-stone-500">
            {t('Nutritional composition varies with strain, substrate, growing conditions and processing.')}
          </p>
        </div>
      </section>

      <section id="what-youll-need" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            {t("What you'll need")}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">{t('A simple setup is enough to get started')}</h2>
          <p className="text-base leading-relaxed text-stone-600">
            {t('Start with a clean culture or spawn source, the right hardwood-based substrate and a tidy place to work.')}
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
                <h3 className="font-display text-lg font-semibold tracking-tight text-stone-900">{t(need.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{t(need.text)}</p>
              </article>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <GuideImageCard
            src={guideImages.needTools.src}
            alt={guideImages.needTools.alt}
            eyebrow={t('Starter materials')}
            title={t('Everything you need for a clean first batch')}
            caption={t('A simple kit can include your culture or spawn, a prepared bag, gloves, a spray bottle and basic temperature or humidity monitoring.')}
            size="full"
          />

          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">{t('Starter checklist')}</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-stone-950">{t('Before you begin')}</h3>
            <div className="mt-5 space-y-3">
              {[
                "Choose one starting route: ready-to-fruit block, ready-to-inoculate bag, or grain spawn route.",
                "Use a clean hardwood-based substrate made for Lion’s Mane growing.",
                "Prepare a calm, tidy workspace and clean your hands, tools and surfaces.",
                "Have a fruiting space ready with humidity, fresh air and gentle indirect light.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  <p className="text-sm leading-relaxed text-stone-700">{t(item)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="growing-steps" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl space-y-3">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
              {t('Step-by-step journey')}
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">{t('From first inoculation to first harvest')}</h2>
            <p className="text-base leading-relaxed text-stone-600">
              {t('Follow one clear route, keep the conditions steady and move step by step from inoculation to fruiting and harvest.')}
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600 shadow-sm lg:max-w-md">
            <div className="flex items-center gap-2 text-stone-900">
              <TimerReset className="h-4 w-4 text-emerald-700" />
              <span className="font-medium">{t('Quick timeline')}</span>
            </div>
            <p className="mt-1">{t('Inoculate cleanly, let the block colonise fully, then fruit it under humid and fresh-air-rich conditions.')}</p>
          </div>
        </div>

        <article className="overflow-hidden rounded-[2rem] border border-stone-900 bg-[#111315] text-white shadow-sm">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="font-display text-3xl font-bold text-amber-400">01</div>
              <div className="space-y-3">
                <h3 className="font-display text-3xl font-bold tracking-tight text-white">{t('Choose the right growing method')}</h3>
                <p className="max-w-4xl text-base leading-relaxed text-stone-300">
                  {t("There is more than one correct way to grow Lion’s Mane. Choose one route and follow that method instead of mixing steps from different systems.")}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {startingRoutes.map((route) => (
                <div key={route.label} className="rounded-[1.75rem] border border-stone-700 bg-gradient-to-br from-stone-900 to-stone-950 p-6 shadow-inner">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400">{t(route.label)}</p>
                  <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">{t(route.title)}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-stone-300">{t(route.body)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-amber-500/40 bg-amber-500/10 p-5">
              <p className="text-sm leading-relaxed text-amber-50">
                <span className="font-semibold text-white">{t("Important:")}</span> {t("Do not inject liquid culture directly into ordinary bulk hardwood substrate. Liquid culture should first colonise sterilised grain, or be used only with a bag that is specifically designed with a grain section and an injection port.")}
              </p>
            </div>
          </div>
        </article>

        <div className="space-y-6">
          {stepsAfterRoute.map((step, index) => (
            <article key={step.step} className="grid items-stretch gap-6 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-7">
              <GuideImageCard
                src={stepImages[index].src}
                alt={stepImages[index].alt}
                eyebrow={t(stepVisualCopy[index].eyebrow)}
                title={t(stepVisualCopy[index].title)}
                caption={t(stepVisualCopy[index].caption)}
                size="full"
              />

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-stone-900 text-lg font-bold text-white">
                    {step.step}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-stone-950">{t(step.title)}</h3>
                    <p className="text-base leading-relaxed text-stone-600">{t(step.body)}</p>
                  </div>
                </div>

                {step.noteType && step.noteTitle && step.noteText ? (
                  <NoteBox type={step.noteType} title={t(step.noteTitle)} text={t(step.noteText)} />
                ) : null}

                {step.step === "02" ? (
                  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">{t('Product shortcut')}</p>
                    <h4 className="mt-2 font-display text-lg font-semibold text-stone-900">{t('Need starter materials?')}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">
                      <a
                        href="/products"
                        onClick={(event) => {
                          if (onNavigate) {
                            event.preventDefault();
                            onNavigate("products");
                          }
                        }}
                        className="font-medium text-emerald-800 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-900"
                      >
                        {t("View Lion’s Mane cultures, grain spawn and ready-to-inoculate options on the Products page.")}
                      </a>
                    </p>
                  </div>
                ) : null}

                {step.step === "04" ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-stone-200 bg-emerald-50/60 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                        <Thermometer className="h-4 w-4 text-emerald-700" /> {t("Fruiting temperature")}
                      </div>
                      <p className="mt-2 text-sm text-stone-600">{t('A practical beginner range is about 16–21°C.')}</p>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-emerald-50/60 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                        <Droplets className="h-4 w-4 text-emerald-700" /> {t("Humidity")}
                      </div>
                      <p className="mt-2 text-sm text-stone-600">{t('Keep air humid, often around 85–95%, without making the fruit soggy.')}</p>
                    </div>
                    <div className="rounded-2xl border border-stone-200 bg-emerald-50/60 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
                        <Wind className="h-4 w-4 text-emerald-700" /> {t("Fresh air")}
                      </div>
                      <p className="mt-2 text-sm text-stone-600">{t('Use gentle, regular air exchange rather than stagnant sealed air.')}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="healthy-growth" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-8 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            {t('What should it look like?')}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">{t('Healthy progress versus warning signs')}</h2>
          <p className="text-base leading-relaxed text-stone-600">{t('Compare healthy growth with the most common warning signs.')}</p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-[2rem] border border-emerald-200 bg-white p-6 pb-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">{t('Healthy signs')}</p>
                <h3 className="font-display text-xl font-bold tracking-tight text-stone-950">{t('This is what you want to see')}</h3>
              </div>
            </div>

            <GuideImageCard
              src={guideImages.healthy.src}
              alt={guideImages.healthy.alt}
              eyebrow={t('Healthy example')}
              title={t('Clean white growth and fresh fruiting')}
              caption={t('Healthy Lion’s Mane usually looks evenly colonised, bright white and compact before the spines lengthen near harvest.')}
              size="tall"
            />

            <ul className="space-y-3 text-sm text-stone-700">
              {healthyVsWarning.healthy.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 rounded-[2rem] border border-rose-200 bg-white p-6 pb-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-800">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-rose-700">{t('Warning signs')}</p>
                <h3 className="font-display text-xl font-bold tracking-tight text-stone-950">{t('Things that need attention')}</h3>
              </div>
            </div>

            <GuideImageCard
              src={guideImages.warning.src}
              alt={guideImages.warning.alt}
              eyebrow={t('Warning example')}
              title={t('Contamination, discoloration or stalled growth')}
              caption={t('Green, dark, slimy or sour-looking growth is a strong warning sign and should be handled carefully away from healthy blocks.')}
              size="tall"
            />

            <ul className="space-y-3 text-sm text-stone-700">
              {healthyVsWarning.warning.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="troubleshooting" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            {t('Troubleshooting')}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">{t('Common issues made simple')}</h2>
          <p className="text-base leading-relaxed text-stone-600">{t('Spot the symptom, check the likely cause and correct the growing conditions early.')}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {commonIssues.map((issue) => (
            <article key={issue.symptom} className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">{t('Symptom')}</p>
              <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-stone-900">{t(issue.symptom)}</h3>

              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">{t('Likely cause')}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{t(issue.cause)}</p>

              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-stone-500">{t('Simple solution')}</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{t(issue.solution)}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">
            {t('FAQ')}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">{t('Frequently asked beginner questions')}</h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <article key={faq.question} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                >
                  <span className="font-display text-lg font-semibold tracking-tight text-stone-900">{t(faq.question)}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-stone-500 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen ? <div className="border-t border-stone-100 px-5 py-4 text-sm leading-relaxed text-stone-600">{t(faq.answer)}</div> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-stone-50 p-8 shadow-sm">
          <div className="max-w-4xl space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-800">{t('Continue learning')}</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-stone-950">{t('Explore the next helpful pages')}</h2>
            <p className="text-base leading-relaxed text-stone-600">{t('Go deeper into grow-bag growing, substrate preparation or batch planning.')}</p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {relatedResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <a
                  key={resource.title}
                  href={resource.href}
                  onClick={(event) => {
                    if (onNavigate) {
                      event.preventDefault();
                      onNavigate(resource.page);
                    }
                  }}
                  className="group rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-stone-950">{t(resource.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{t(resource.body)}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-900 transition group-hover:text-emerald-800">
                    {t("Open page")} <ArrowRight className="h-4 w-4" />
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
