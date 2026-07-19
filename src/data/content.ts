export const profile = {
  name: 'Abhishek Yadav',
  role: 'Software Developer',
  tagline: 'Software Developer building systems that scale',
  summary:
    'Software developer with hands-on experience across full-stack development, microservices and data pipelines using Java, Python, FastAPI, Spring Boot and React. Focused on scalable cloud-native systems, clean API design, automation and data quality in production.',
  email: 'abhicps19@gmail.com',
  github: 'https://github.com/Abhiboss07',
  githubHandle: 'Abhiboss07',
  linkedin: 'https://www.linkedin.com/in/abhishek-yadav-4738032b7/',
  location: 'Jaunpur, India',
  timezone: 'Asia/Kolkata',
  resume: '/Abhishek_Yadav_Resume.pdf',
  photo: '/images/my_photo.png',
  photoWebp: '/images/my_photo.webp',
};

export const marqueeTech = [
  'Java',
  'Python',
  'FastAPI',
  'Spring Boot',
  'Microservices',
  'Docker',
  'Redis',
  'MongoDB',
  'MySQL',
  'Celery',
  'REST APIs',
  'WebSocket',
  'JWT',
  'CI/CD',
  'GitHub Actions',
  'Cloud-Native',
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  stats: { value: number; suffix: string; prefix: string; label: string }[];
};

export const experience: Experience[] = [
  {
    role: 'Software Development Engineer (SDE)',
    company: 'Anantasutra',
    period: 'May 2026 — Present',
    bullets: [
      'Built scalable Python web-scraping & lead-generation pipelines (BeautifulSoup, Requests, REST APIs, microservices) with automated verification & deduplication.',
      'Engineered GitHub Actions CI/CD with automated testing, improving system reliability, maintainability and scalability.',
    ],
    stats: [
      { value: 40, suffix: '%', prefix: '+', label: 'Data acquisition' },
      { value: 35, suffix: '%', prefix: '+', label: 'Data quality' },
      { value: 30, suffix: '%', prefix: '-', label: 'Fewer invalid records' },
    ],
  },
  {
    role: 'Data Engineer Intern',
    company: 'Anantasutra',
    period: 'Nov 2025 — Jan 2026',
    bullets: [
      'Automated lead-generation pipelines with Python (BeautifulSoup, Requests) and RESTful API integrations, plus verification & deduplication.',
      'Built microservices-based automation with GitHub Actions CI/CD and unit testing, reducing invalid records.',
    ],
    stats: [
      { value: 40, suffix: '%', prefix: '+', label: 'Data acquisition' },
      { value: 35, suffix: '%', prefix: '+', label: 'Data quality' },
      { value: 30, suffix: '%', prefix: '-', label: 'Fewer invalid records' },
    ],
  },
];

export type Project = {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  motif: 'kv' | 'voice' | 'nexus' | 'auth' | 'chart';
  accentNote: string;
};

export const projects: Project[] = [
  {
    index: '01',
    title: 'Distributed Key-Value Store',
    subtitle: 'In-memory data store · Java 17',
    description:
      'Production-grade in-memory KV store from scratch: TCP server on a FixedThreadPool (50 concurrent clients), O(1) LRU eviction via LinkedHashMap, and dual-strategy TTL expiry (lazy + ScheduledExecutorService sweep).',
    tech: ['Java 17', 'TCP', 'LRU / LinkedHashMap', 'AOF + fsync', 'JUnit 5', 'CLI'],
    github: 'https://github.com/Abhiboss07',
    motif: 'kv',
    accentNote:
      'AOF write-ahead log with fsync + atomic compaction for crash recovery · 144 JUnit 5 tests · standalone JAR + CLI client.',
  },
  {
    index: '02',
    title: 'Voice AI Platform',
    subtitle: 'Full-stack voice AI SaaS',
    description:
      'Cloud-native voice AI platform: FastAPI microservices with JWT auth and WebSocket live metrics, LiveKit SIP + Vobiz telephony, and OpenAI / Gemini voice models with Deepgram STT and multi-language Sarvam TTS.',
    tech: ['FastAPI', 'MongoDB', 'Redis', 'Celery', 'Docker', 'WebSocket', 'LiveKit', 'React + TS'],
    github: 'https://github.com/Abhiboss07',
    motif: 'voice',
    accentNote:
      'GitHub Actions CI/CD · React + TypeScript + Vite + Tailwind + Zustand frontend with an RBAC admin dashboard.',
  },
  {
    index: '03',
    title: 'Nexus Control Center',
    subtitle: 'Linux system command center · Rust',
    description:
      'A modern Linux command center built with Rust + Tauri v2 and a React/TypeScript UI: modular plugin architecture with real-time CPU, memory, disk, battery and network monitoring.',
    tech: ['Rust', 'Tauri v2', 'React', 'TypeScript', 'Plugin architecture'],
    github: 'https://github.com/Abhiboss07',
    motif: 'nexus',
    accentNote:
      'AI-powered diagnostics · automation workflows · persistent configuration management.',
  },
  {
    index: '04',
    title: 'LoginSystem',
    subtitle: 'Production-style REST API',
    description:
      'A production-style authentication REST API with JWT auth, layered architecture and clean domain modeling — thorough exception handling and pagination throughout.',
    tech: ['Java', 'Spring Boot', 'JWT', 'REST', 'Layered architecture'],
    github: 'https://github.com/Abhiboss07/LoginSystem',
    motif: 'auth',
    accentNote: 'Clean domain modeling · exception handling · pagination.',
  },
  {
    index: '05',
    title: 'AgriPrice Pro',
    subtitle: 'Agricultural market analysis',
    description:
      'Agricultural market analysis platform with an ingestion + validation pipeline into a relational database, real-time price prediction and historical data visualization.',
    tech: ['Python', 'Data pipeline', 'Relational DB', 'Prediction', 'Visualization'],
    github: 'https://github.com/Abhiboss07/Market-Price-Prediction',
    motif: 'chart',
    accentNote: 'Ingestion + validation pipeline · real-time prediction · historical visualization.',
  },
];

export type SkillGroup = { category: string; items: string[] };

export const skills: SkillGroup[] = [
  { category: 'Languages', items: ['Java', 'Python'] },
  { category: 'Backend', items: ['Spring Boot', 'FastAPI', 'REST APIs', 'Microservices'] },
  { category: 'Cloud / DevOps', items: ['Docker', 'CI/CD', 'Cloud-Native'] },
  { category: 'API / Auth', items: ['API Design', 'WebSocket', 'JWT', 'RBAC'] },
  { category: 'Databases', items: ['MongoDB', 'MySQL', 'Redis', 'Celery'] },
  { category: 'Testing', items: ['Unit Testing', 'Data Quality'] },
  { category: 'AI / ML', items: ['OpenAI', 'Gemini', 'Deepgram', 'Sarvam'] },
  { category: 'Data', items: ['Pipelines', 'Web Scraping', 'Automation'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'HTML/CSS'] },
  { category: 'Tools', items: ['Postman', 'Git', 'VS Code', 'Cursor', 'IntelliJ IDEA'] },
];

export const certifications = [
  {
    title: 'Deloitte Australia — Technology Job Simulation',
    issuer: 'Forage',
    date: 'July 2025',
  },
  { title: 'Java Programming', issuer: 'CodSoft', date: 'Certificate' },
  { title: 'Bharat Innovation Conclave', issuer: 'Participation', date: 'Certificate' },
  { title: 'Java Development', issuer: 'Cognifyz Technologies', date: 'Certificate' },
];

export const education = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'Veer Bahadur Singh Purvanchal University',
  period: '2023 — 2027 (Expected)',
};
