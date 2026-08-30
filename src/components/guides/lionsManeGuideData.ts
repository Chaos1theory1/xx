export type GuideStat = {
  label: string;
  value: string;
  hint: string;
};

export type GuideNeed = {
  title: string;
  text: string;
  icon: string;
};

export type GuideStep = {
  step: string;
  title: string;
  body: string;
  imageTitle: string;
  imageCaption: string;
  noteType?: "good" | "pro" | "important" | "watch";
  noteTitle?: string;
  noteText?: string;
};

export type GuideIssue = {
  symptom: string;
  cause: string;
  solution: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export const guideStats: GuideStat[] = [
  {
    label: "Difficulty",
    value: "Beginner-friendly with basic care",
    hint: "A very rewarding gourmet species when humidity and fresh air are balanced well."
  },
  {
    label: "Best substrate",
    value: "Supplemented hardwood",
    hint: "Hardwood sawdust or hardwood pellets with a nutritious supplement are usually the most reliable."
  },
  {
    label: "Approx. timeline",
    value: "3–6 weeks to first harvest",
    hint: "This varies with the starting method, temperature, culture strength and substrate condition."
  },
  {
    label: "Harvest signal",
    value: "Long, soft spines just formed",
    hint: "Harvest before the spines become too long, dry-looking or begin yellowing."
  }
];

export const growingNeeds: GuideNeed[] = [
  {
    title: "Lion’s Mane culture or spawn",
    text: "Start with a clean culture, grain spawn or a ready-to-inoculate system from a trusted source.",
    icon: "FlaskConical"
  },
  {
    title: "Suitable substrate",
    text: "Supplemented hardwood substrate is the easiest indoor route for beginners.",
    icon: "Package"
  },
  {
    title: "Clean workspace",
    text: "A still, clean working area helps reduce contamination during inoculation.",
    icon: "ShieldCheck"
  },
  {
    title: "Humidity support",
    text: "Use a fine mist sprayer or a small fruiting setup that can stay humid without becoming soggy.",
    icon: "Droplets"
  },
  {
    title: "Air + temperature awareness",
    text: "A simple thermometer and hygrometer make it easier to keep conditions stable.",
    icon: "Thermometer"
  },
  {
    title: "Indirect light",
    text: "Lion’s Mane does not need strong light, but it does benefit from a normal day/night light rhythm.",
    icon: "SunMedium"
  }
];

export const growingSteps: GuideStep[] = [
  {
    step: "01",
    title: "Choose the easiest starting route",
    body: "For most first-time growers, the simplest route is a ready-to-inoculate Lion’s Mane bag or a fully prepared fruiting block. If you want more control, you can first build grain spawn and then transfer it into a hardwood fruiting substrate. Keep the guide focused on one route instead of mixing several methods at once.",
    imageTitle: "Suggested photo",
    imageCaption: "A clean beginner setup showing Lion’s Mane culture, sterile bag and a tidy workspace.",
    noteType: "good",
    noteTitle: "Good to know",
    noteText: "Ready-to-use systems reduce mistakes because moisture, nutrition and packaging are already balanced for you."
  },
  {
    step: "02",
    title: "Inoculate cleanly",
    body: "Wash your hands, clean the surface, prepare your materials and work as calmly as possible. If you are injecting a ready bag, inoculate through the self-healing port into the grain layer. If you are using fully colonised grain spawn, mix it into the prepared hardwood substrate as evenly as possible and reseal the bag or container.",
    imageTitle: "Suggested photo",
    imageCaption: "Close-up of inoculation through a self-healing port or clean mixing of grain spawn into substrate.",
    noteType: "important",
    noteTitle: "Important",
    noteText: "Do not inject liquid culture into random bulk substrate unless the system is designed for it. Liquid culture should usually colonise grain first."
  },
  {
    step: "03",
    title: "Let the substrate colonise fully",
    body: "During colonisation, the mycelium spreads through the grain and then through the whole substrate block. Keep the bag sealed, the filter patch uncovered and the block out of direct sun. A healthy block gradually turns white and becomes more solid. Avoid constantly moving or opening it just to check progress.",
    imageTitle: "Suggested photo",
    imageCaption: "A sealed Lion’s Mane substrate block with bright white mycelium spreading evenly.",
    noteType: "watch",
    noteTitle: "Watch out",
    noteText: "Green, black, pink or slimy patches are warning signs. A sour or rotten smell is another sign that something is wrong."
  },
  {
    step: "04",
    title: "Introduce fruiting conditions",
    body: "Once the block looks fully colonised and firm, create one small fruiting opening in the plastic. Move the block into a humid, fresh-air-rich environment with gentle indirect light. Lion’s Mane likes steady humidity and good fresh air. The goal is moist air around the block, not water sitting on the mushroom itself.",
    imageTitle: "Suggested photo",
    imageCaption: "A colonised block with one small X-shaped opening placed in a humid fruiting area.",
    noteType: "pro",
    noteTitle: "Pro tip",
    noteText: "One controlled opening usually gives a better, stronger fruit than many large cuts that dry the block too quickly."
  },
  {
    step: "05",
    title: "Watch for pins and protect early growth",
    body: "Small white knots usually form first, then develop into a compact pom-pom shape. As the mushroom grows, tiny spines begin to form. Keep airflow fresh but gentle, and avoid blasting the young fruit directly with a fan or heavy mist. Dry air can stop development early, while stale air can lead to odd growth or poor shape.",
    imageTitle: "Suggested photo",
    imageCaption: "Side-by-side growth stages: first pins, compact pom-pom, then developing spines.",
    noteType: "good",
    noteTitle: "Good to know",
    noteText: "Healthy Lion’s Mane usually stays bright white. Slight cream tones near harvest can be normal, but strong yellowing is usually a late sign."
  },
  {
    step: "06",
    title: "Harvest gently and prepare for another flush",
    body: "Harvest when the mushroom is full-sized, dense, white and covered with clearly visible soft spines. Cut close to the base with a clean knife. After the first flush, let the block rest briefly, keep it hydrated and continue fruiting conditions for a possible second flush. Later flushes are often smaller, but still worthwhile.",
    imageTitle: "Suggested photo",
    imageCaption: "A mature Lion’s Mane cluster being cut neatly from the fruiting opening.",
    noteType: "important",
    noteTitle: "Important",
    noteText: "Do not wait until the fruit becomes dry, overly shaggy or yellow-brown. Quality is best a little before that stage."
  }
];

export const healthyVsWarning = {
  healthy: [
    "Bright white mycelium spreading evenly through the block",
    "A firm substrate block that holds together well",
    "Compact white pins that slowly expand",
    "A round, dense fruit body with fresh soft spines",
    "Mild fresh mushroom smell"
  ],
  warning: [
    "Green, black, pink or orange contamination",
    "Wet, slimy or sour-smelling substrate",
    "Growth that suddenly stops for no clear reason",
    "Pins that dry out, stall or turn brown very early",
    "Heavy yellowing, cracking or a fuzzy unhealthy look"
  ]
};

export const commonIssues: GuideIssue[] = [
  {
    symptom: "No visible growth after inoculation",
    cause: "Weak culture, temperatures too low, or inoculation did not reach the right layer",
    solution: "Wait a little longer first, confirm conditions are stable, and review your inoculation method for the next batch."
  },
  {
    symptom: "Green patch on the block",
    cause: "Contamination, often mould",
    solution: "Keep the block sealed and isolate it from healthy grows. Do not try to scrape contamination away indoors."
  },
  {
    symptom: "Pins appear, then dry out",
    cause: "Humidity too low or airflow too drying",
    solution: "Increase ambient humidity, reduce harsh airflow and keep the fruiting area moist without soaking the mushroom."
  },
  {
    symptom: "Fruit stays small or shape looks weak",
    cause: "Poor fresh-air exchange or inconsistent fruiting conditions",
    solution: "Improve fresh air, keep temperature steady and avoid sealing the fruit in stagnant air."
  },
  {
    symptom: "Yellowing on the fruit body",
    cause: "Age, stress, dryness or handling",
    solution: "Harvest a little earlier next time and keep humidity more stable during development."
  },
  {
    symptom: "Block feels too wet and smells sour",
    cause: "Moisture imbalance or contamination",
    solution: "Do not open the block indoors. Separate it and discard if the smell remains clearly sour or rotten."
  }
];

export const faqItems: GuideFaq[] = [
  {
    question: "Is Lion’s Mane a good mushroom for a first grow?",
    answer: "Yes. It is one of the more beginner-friendly gourmet mushrooms when you start with clean culture or a prepared system and focus on humidity plus fresh air."
  },
  {
    question: "What is the easiest way to grow it?",
    answer: "The easiest route is a ready-to-inoculate bag or a prepared fruiting block designed for Lion’s Mane. That removes a lot of guesswork from substrate preparation."
  },
  {
    question: "What substrate works best?",
    answer: "Supplemented hardwood is usually the best indoor substrate. Lion’s Mane naturally prefers wood-based food sources."
  },
  {
    question: "How long does it take to harvest?",
    answer: "A first harvest often arrives in roughly 3–6 weeks, depending on the method, temperature, culture quality and how quickly the block colonises."
  },
  {
    question: "What temperature is best?",
    answer: "As a practical starting point, many growers use about 20–24°C for colonisation and slightly cooler, around 16–21°C, for fruiting."
  },
  {
    question: "Does Lion’s Mane need light?",
    answer: "It does not need strong light. Gentle indirect light or a normal daytime light rhythm is usually enough to support proper fruiting."
  },
  {
    question: "How do I know when to harvest?",
    answer: "Harvest when the fruit is full, white and covered with soft visible spines, before it becomes too shaggy, dry or yellow."
  },
  {
    question: "Can I get more than one flush?",
    answer: "Usually yes. A healthy block can often produce another flush after a short rest if moisture and fruiting conditions remain good."
  },
  {
    question: "Why did my fruit stop growing?",
    answer: "The most common reasons are low humidity, drying airflow, stale air, poor culture health or contamination."
  },
  {
    question: "Can I spray the mushroom directly?",
    answer: "It is better to humidify the surrounding air or the walls of the fruiting space rather than repeatedly soaking the developing fruit directly."
  }
];

export const pageMetadata = {
  slug: "/guides/lions-mane-growing-guide",
  metaTitle: "Lion’s Mane Growing Guide | Beginner-Friendly Cultivation Help | Biotech Agro",
  metaDescription: "Learn how to grow Lion’s Mane mushrooms step by step with this clear beginner-friendly guide from Biotech Agro, covering substrate, colonisation, fruiting, harvest and troubleshooting."
};
