export const site = {
  name: 'SANKALP',
  brand: 'BuiltbySANKALP',
  firstName: 'Sankalp',
  role: 'WEB DEVELOPER',
  tagline: 'Crafting Your Digital Universe',
  email: 'sankalppandey.56@gmail.com',
  location: 'Pune, India',
  availability: 'Available for internships & freelance',
  bio: "I'm Sankalp — a first-year student at Newton School of Technology, ADYPU, Pune, just starting my journey. I'm a beginner in HTML & CSS, very new to Python, and I'm learning new languages and tools as time goes. What I'm genuinely good at is AI — writing prompts, building AI workflows, and getting the most out of LLMs. My goal is simple: become a good innovator. Fun fact — even this website was made with the help of an AI.",
  photo: './photo.jpg',
  github: 'https://github.com/SankalpPandey-56',
  linkedin: 'https://www.linkedin.com/in/sankalp-pandey-20361b41a/',
  instagram: 'https://www.instagram.com/uhm.sankalp/',
}

export type Repo = {
  name: string
  desc: string
  lang: string
  topics: string[]
  url: string
  home?: string
  year: string
}

export const repos: Repo[] = [
  {
    name: 'friday',
    desc: 'FRIDAY — a local AI voice assistant for macOS: talk to it, it opens apps, checks your system, finds files, and runs approved commands. Zero-dependency Python server + Swift speech helpers + web cockpit UI.',
    lang: 'Python',
    topics: ['AI', 'Voice', 'macOS', 'Python'],
    url: 'https://github.com/SankalpPandey-56/friday',
    year: '2026',
  },
  {
    name: 'Portfolio',
    desc: 'My original portfolio — the first version that started it all, live on Vercel.',
    lang: 'CSS',
    topics: ['Portfolio', 'Web'],
    url: 'https://github.com/SankalpPandey-56/Portfolio',
    home: 'https://portfolio-main-fluktiyo.vercel.app',
    year: '2026',
  },
  {
    name: 'nudge',
    desc: 'A CSS-driven micro-experiment — exploring layouts, styling and interaction details.',
    lang: 'CSS',
    topics: ['CSS', 'Experiment'],
    url: 'https://github.com/SankalpPandey-56/nudge',
    year: '2026',
  },
  {
    name: 'FLUKTIYO',
    desc: 'FLUKTIYO — a brand project taking shape. More coming soon.',
    lang: 'Web',
    topics: ['Brand', 'Web'],
    url: 'https://github.com/SankalpPandey-56/FLUKTIYO',
    year: '2026',
  },
  {
    name: 'SankalpPandey-56.github.io',
    desc: 'My GitHub Pages site — the always-ongoing sandbox for trying new things.',
    lang: 'CSS',
    topics: ['GitHub Pages', 'Web'],
    url: 'https://github.com/SankalpPandey-56/SankalpPandey-56.github.io',
    year: '2026',
  },
]

export const stats = [
  { value: '5+', label: 'Public Repos' },
  { value: '3+', label: 'Languages' },
  { value: '100%', label: 'Curiosity' },
]

export type EducationItem = {
  stage: string
  detail: string
  school: string
  year: string
  highlight: string
}

// ✏️ EDIT YOUR REAL YEARS HERE — the two lines below marked with ✏️ are placeholders.
//   Class 10th  →  the `year: '✏️ 2022 — 2024'` line
//   Class 12th  →  the `year: '✏️ 2024 — 2026'` line
// Just swap in your real years, e.g. '2019 — 2021'. Nothing else needs changing.
export const education: EducationItem[] = [
  {
    stage: 'Class 10th',
    detail: '90%',
    school: 'Tender Hearts School',
    year: '✏️ 2022 — 2024',
    highlight: 'Secondary School',
  },
  {
    stage: 'Class 12th',
    detail: '77%',
    school: 'Tender Hearts School',
    year: '✏️ 2024 — 2026',
    highlight: 'Senior Secondary',
  },
  {
    stage: 'B.Tech',
    detail: 'Pursuing',
    school: 'Newton School of Technology, ADYPU, Pune',
    year: '2026 — Present',
    highlight: 'Undergraduate · First Year',
  },
]

export const learning = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'React',
  'Tailwind CSS',
  'Prompt Engineering',
  'AI & LLMs',
  'Node.js',
  'Git & GitHub',
]

export type Service = {
  title: string
  desc: string
  chips: string[]
}

export const services: Service[] = [
  {
    title: 'Web Development',
    desc: 'Learning the craft one project at a time — building responsive, modern pages with clean, readable code.',
    chips: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'React (learning)', 'Responsive Design'],
  },
  {
    title: 'AI & Prompt Engineering',
    desc: 'My strongest skill. Writing effective prompts, designing AI workflows, and getting the most out of LLMs.',
    chips: ['Prompt Engineering', 'AI Automation', 'ChatGPT Workflows', 'Custom AI Tools', 'Content Generation', 'Workflow Optimization'],
  },
  {
    title: 'Creative Design',
    desc: 'Designing impactful visuals and presentations that communicate ideas clearly and leave a lasting impression.',
    chips: ['Canva Design', 'PowerPoint Presentations', 'Brand Assets', 'Social Media Graphics', 'Pitch Decks', 'Visual Storytelling'],
  },
  {
    title: 'Automation & Tools',
    desc: 'Experimenting with small scripts and automations — from local assistants to cloud-powered workflows.',
    chips: ['Python (beginner)', 'Firebase', 'REST & GraphQL APIs', 'Git & GitHub', 'Automation Scripts', 'Scalable Thinking'],
  },
]

export const stack = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python (learning)',
  'React',
  'Tailwind CSS',
  'Git & GitHub',
  'Vercel',
  'Prompt Engineering',
  'AI & LLMs',
  'ChatGPT',
  'Canva',
  'Firebase',
  'Node.js (learning)',
  'Always Learning',
]
