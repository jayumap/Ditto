/**
 * Static data and copy for the Ditto landing page.
 * All hardcoded strings live here — never in JSX directly.
 */

/** Navigation links */
export const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Explore', href: '#demo' },
];

/** Hero section copy */
export const HERO = {
  badge: 'Discover Your Code Twin',
  headline: 'Meet Your Coding',
  headlineAccent: 'Doppelgänger',
  subtext:
    'Ditto analyzes your GitHub repos, coding patterns, language preferences, commit behavior, and contribution style — then matches you with a developer who codes just like you.',
  inputPlaceholder: 'Enter your GitHub username',
  ctaButton: 'Find My Twin',
};

/** How It Works steps */
export const STEPS = [
  {
    id: 1,
    icon: 'Github',
    title: 'Connect GitHub',
    description:
      'Link your GitHub account and let Ditto securely scan your public repositories and contribution graph.',
  },
  {
    id: 2,
    icon: 'Cpu',
    title: 'Ditto Analyzes Patterns',
    description:
      'Our AI engine fingerprints your coding DNA — languages, commit cadence, repo structure, and style.',
  },
  {
    id: 3,
    icon: 'Users',
    title: 'Meet Your Doppelgänger',
    description:
      'Get matched with a developer who shares your unique coding fingerprint. Connect and collaborate!',
  },
];

/** Feature cards */
export const FEATURES = [
  {
    icon: 'Dna',
    title: 'Language DNA',
    description:
      'Deep analysis of your language breakdown across all repos. We go beyond percentages to understand your true language identity.',
    gradient: 'from-purple-500 to-indigo-600',
  },
  {
    icon: 'Activity',
    title: 'Commit Rhythm',
    description:
      'Your commit patterns tell a story. Morning coder? Weekend warrior? Ditto maps your development heartbeat.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: 'GitCompareArrows',
    title: 'Repo Similarity Score',
    description:
      'Advanced scoring algorithm compares repo structures, naming conventions, and architectural patterns.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: 'Star',
    title: 'Star Pattern Match',
    description:
      'Analyzes which repos you star and fork to understand your interests and the tools you love.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: 'BarChart3',
    title: 'Contribution Heatmap',
    description:
      'Side-by-side comparison of contribution heatmaps reveals shared productivity cycles and work habits.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: 'Fingerprint',
    title: 'Coding Style Fingerprint',
    description:
      'From indentation to naming conventions, Ditto identifies the micro-patterns that make your code uniquely yours.',
    gradient: 'from-violet-500 to-purple-600',
  },
];

/** Stats bar counters */
export const STATS = [
  { label: 'Devs Matched', value: 12000, suffix: '+', icon: 'Users' },
  { label: 'Repos Analyzed', value: 500, suffix: 'K+', icon: 'GitFork' },
  { label: 'Match Accuracy', value: 98, suffix: '%', icon: 'Target' },
];

/** Sample match demo data */
export const SAMPLE_MATCH = {
  similarityScore: 94,
  user1: {
    name: 'Alex Rivera',
    username: 'arivera_dev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4',
    topLanguages: ['TypeScript', 'Rust', 'Python'],
    repos: 47,
    followers: 1240,
    contributions: 2847,
  },
  user2: {
    name: 'Sam Nakamura',
    username: 'sam_codes',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam&backgroundColor=ffd5dc',
    topLanguages: ['TypeScript', 'Rust', 'Go'],
    repos: 52,
    followers: 980,
    contributions: 3102,
  },
  matchReasons: [
    'Both primarily TypeScript + Rust developers',
    'Similar commit frequency (5-7 commits/day)',
    'Shared interest in CLI tools & developer tooling',
    'Nearly identical contribution heatmaps',
  ],
  sharedLanguages: [
    { name: 'TypeScript', percent: 42 },
    { name: 'Rust', percent: 28 },
    { name: 'Python / Go', percent: 18 },
    { name: 'Other', percent: 12 },
  ],
};

/** CTA section copy */
export const CTA = {
  headline: 'Ready to find your GitHub twin?',
  subtext:
    'Join thousands of developers who have already discovered their coding doppelgänger.',
  inputPlaceholder: 'Enter your GitHub username',
  ctaButton: 'Find My Twin',
};

/** Loader fun facts */
export const LOADER_FACTS = [
  "Did you know? The first commit to Git itself was made by Linus Torvalds in April 2005.",
  "GitHub's mascot, the Octocat, was originally purchased from a stock image site for $50.",
  "Over 100 million developers use GitHub to build software together.",
  "JavaScript remains the most contributed-to language on GitHub year after year.",
  "The Apollo 11 guidance computer source code is hosted on GitHub for anyone to explore.",
  "The most starred repository on GitHub is the freeCodeCamp curriculum.",
  "GitHub was acquired by Microsoft in 2018 for $7.5 billion in stock.",
  "The average developer commits code mostly between 2 PM and 5 PM local time."
];

/** Footer data */
export const FOOTER = {
  tagline: 'Find the developer who codes just like you.',
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Features', href: '#features' },
        { label: 'Explore', href: '#demo' },
        { label: 'Pricing', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Ditto. All rights reserved.`,
};
