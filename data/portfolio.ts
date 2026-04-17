export const personalInfo = {
  name: 'Masud Rana',
  role: 'Senior QA Automation Engineer',
  tagline: 'Ensuring quality through automation, strategy, and continuous delivery.',
  subTagline: 'Expert in Playwright, Selenium, and CI/CD pipelines.',
  email: 'masudr2030@gmail.com',
  github: 'https://github.com/ranam2030',
  linkedin: 'https://www.linkedin.com/in/masudr2030/',
  location: 'Dhaka, Bangladesh',
  available: true,
};

export const aboutContent = {
  label: 'The Persona',
  heading: 'The Precision Architect',
  paragraphs: [
    'With over 5+ years of dedicated experience in the QA ecosystem, I specialize in architecting robust automation frameworks that go beyond simple script execution — they become living quality gates embedded into every stage of the delivery pipeline.',
    'My expertise spans the full spectrum of modern testing: from Playwright and Selenium for web, to Appium for mobile, and comprehensive API testing using Postman and REST-assured. I write automation code that is maintainable, scalable, and readable by the next engineer.',
    'I work closely with product, development, and DevOps teams to embed quality from requirements through release, using Agile and SDLC best practices to drive continuous improvement.',
  ],
  highlights: [
    {
      icon: 'terminal',
      title: 'DevOps Integration',
      description: 'Seamless CI/CD integration using GitHub Actions, Jenkins, and Docker containers for scalable, parallelized test environments.',
    },
    {
      icon: 'strategy',
      title: 'QA Strategy',
      description: 'Strategic planning for Agile SDLC, focusing on risk mitigation, shift-left testing, and high-impact regression reduction.',
    },
    {
      icon: 'bug_report',
      title: 'Zero Defect Mindset',
      description: 'Deep-rooted commitment to preventing defects at the source — not catching them at the gate.',
    },
    {
      icon: 'speed',
      title: 'Performance Engineering',
      description: 'Load and stress testing with k6 and JMeter to validate system behavior at scale before it hits production.',
    },
  ],
};

export interface SkillCategory {
  icon: string;
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    icon: 'automation',
    title: 'Automation',
    skills: ['Playwright', 'Selenium', 'WebdriverIO', 'Appium', 'Cypress'],
  },
  {
    icon: 'code',
    title: 'Programming',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Bash'],
  },
  {
    icon: 'api',
    title: 'API Testing',
    skills: ['Postman', 'REST Assured', 'GraphQL Testing', 'Swagger'],
  },
  {
    icon: 'speed',
    title: 'Performance',
    skills: ['k6', 'JMeter', 'Gatling', 'Lighthouse'],
  },
  {
    icon: 'settings_input_component',
    title: 'DevOps',
    skills: ['Docker', 'GitHub Actions', 'Jenkins', 'GitLab CI'],
  },
  {
    icon: 'build',
    title: 'Tools',
    skills: ['Jira', 'TestRail', 'BrowserStack', 'Allure Reports', 'Git'],
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  active: boolean;
  achievements: string[];
}

export const experiences: ExperienceItem[] = [
  {
    role: 'Sr. QA Automation Engineer',
    company: 'Grameenphone (via MIAKI)',
    period: '2025 — Present',
    active: true,
    achievements: [
      'Architected and maintained a scalable automation framework covering 1,200+ test cases across web and API layers from scratch.',
      'Reduced regression testing cycle time by 70% through parallelized execution strategies and optimized script design.',
      'Led QA for complex payment and billing integration systems, ensuring 100% transactional accuracy across multiple sprints.',
      'Integrated automation pipeline into GitHub Actions CI/CD, enabling nightly regression runs with Allure HTML reports.',
      'Mentored junior QA engineers on framework best practices, code review, and test design principles.',
    ],
  },
  {
    role: 'QA Automation Engineer',
    company: 'Texada Software',
    period: '2023 — 2025',
    active: false,
    achievements: [
      'Developed end-to-end API testing suites using Postman and REST Assured to validate microservices reliability under load.',
      'Implemented performance testing benchmarks using JMeter and k6, identifying and resolving bottlenecks before production releases.',
      'Collaborated with cross-functional Agile teams in sprint planning, test estimation, and acceptance criteria definition.',
      'Automated smoke and sanity suites for SaaS equipment management platform, cutting manual verification time by 50%.',
    ],
  },
  {
    role: 'QA Engineer',
    company: 'Brotecs Technologies',
    period: '2020 — 2023',
    active: false,
    achievements: [
      'Executed functional, regression, and compliance testing for VoIP and Healthcare systems with strict regulatory requirements.',
      'Created detailed test plans, test cases, and bug reports using Jira and TestRail, maintaining full traceability.',
      'Contributed to the adoption of Selenium WebDriver for initial automation efforts, reducing manual regression effort.',
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  featured: boolean;
  metrics?: string;
  accentColor: string;
  icon: string;
  stat: { value: string; label: string };
}

export const projects: Project[] = [
  {
    title: 'Hybrid Automation Framework',
    description: 'Production-grade hybrid framework with WebdriverIO + Appium, supporting web and native mobile from a single shared codebase.',
    longDescription: 'Modular Page Object Model design with data-driven capabilities, cross-browser support, and integrated CI/CD reporting. Parallel execution across BrowserStack and local grids.',
    tags: ['WebdriverIO', 'Appium', 'Node.js', 'JavaScript', 'BrowserStack'],
    github: 'https://github.com/ranam2030',
    featured: true,
    metrics: '1200+ tests · 70% faster regression',
    accentColor: '#98cbff',
    icon: 'device_hub',
    stat: { value: '1200+', label: 'Test cases' },
  },
  {
    title: 'Playwright E2E Framework',
    description: 'Optimized Playwright suite with CI/CD hooks, Allure HTML reporting, and environment-specific config management for 3 environments.',
    longDescription: 'TypeScript fixture-based architecture with API mocking, visual regression, and GitHub Actions triggers on PRs and nightly schedules.',
    tags: ['Playwright', 'TypeScript', 'GitHub Actions', 'Allure'],
    github: 'https://github.com/ranam2030',
    featured: false,
    metrics: '3 environments · 15min full suite',
    accentColor: '#bdc2ff',
    icon: 'play_circle',
    stat: { value: '15m', label: 'Full suite runtime' },
  },
  {
    title: 'API Performance Test Suite',
    description: 'Comprehensive performance testing pipeline using k6 and JMeter, integrated into CI to catch regressions under load before production.',
    longDescription: 'Thresholds enforced in CI gates — builds fail on p95 latency regression. Dashboard exports to Grafana for live monitoring during load runs.',
    tags: ['k6', 'JMeter', 'Grafana', 'Docker', 'Python'],
    github: 'https://github.com/ranam2030',
    featured: false,
    metrics: '10k VUs · p95 < 200ms gate',
    accentColor: '#5dcaa5',
    icon: 'speed',
    stat: { value: '10k', label: 'Virtual users' },
  },
  {
    title: 'CI/CD Quality Gate Pipeline',
    description: 'End-to-end Jenkins + GitHub Actions pipeline that enforces quality gates — lint, unit, integration, and smoke — before every merge.',
    longDescription: 'Dockerized test environments per stage, Slack notifications on failure, Allure trend reports, and a coverage delta check blocking PR merges below threshold.',
    tags: ['Jenkins', 'GitHub Actions', 'Docker', 'Slack API', 'Bash'],
    github: 'https://github.com/ranam2030',
    featured: false,
    metrics: '< 8min pipeline · 94% coverage gate',
    accentColor: '#f9a825',
    icon: 'verified',
    stat: { value: '8m', label: 'Pipeline runtime' },
  },
];

export const stats = [
  { value: '70%', label: 'Regression Reduced' },
  { value: '1.2k+', label: 'Automated Test Cases' },
  { value: '6+', label: 'Years of Expertise' },
  { value: '0', label: 'Critical Release Bugs' },
];

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  date: string;
  relationship: string;
  quote: string;
  initials: string;
  color: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Muhammad Rajib Hawlader',
    role: 'Senior Software Engineer',
    company: 'Brotecs Technologies Ltd.',
    date: 'May 2023',
    relationship: 'Worked on the same team',
    initials: 'MR',
    color: '#98cbff',
    quote: `Masud's technical skills as a QA engineer are outstanding. He has a deep understanding of various testing methodologies, frameworks, and tools. His ability to design comprehensive test plans, execute test cases meticulously, and identify and report bugs efficiently is commendable.\n\nOne of Masud's greatest strengths is his ability to collaborate effectively with cross-functional teams. He possesses excellent communication skills, allowing him to articulate complex technical concepts clearly and concisely.\n\nMasud is a natural leader and a mentor to junior team members. He takes the initiative to share his knowledge and experiences, ensuring that the entire team stays up-to-date with the latest industry trends. I highly recommend Masud for any position that requires a talented and experienced QA professional.`,
  },
  {
    name: 'Sayma Farzana Nushin',
    role: 'Senior SQA Engineer',
    company: 'Brotecs Technologies',
    date: 'September 2023',
    relationship: 'Was Md. Masud\'s mentor',
    initials: 'SF',
    color: '#5dcaa5',
    quote: `A skillful team peer with a generous personality. I have worked with Masud for almost 3 years. I was senior to him and supervised him in his early career time in Brotecs. He never failed to impress me and the team with his hard work and dedication in quality work. His ability to adopt new technology and problem solving skill makes him a valuable resource in company. I highly recommend him and wish him great future.`,
  },
  {
    name: 'S M Samnoon Abrar',
    role: 'Software Engineer',
    company: 'Brotecs Technologies',
    date: 'April 2023',
    relationship: 'Worked on the same team',
    initials: 'SA',
    color: '#bdc2ff',
    quote: `I am thrilled to recommend Masud as a top-notch Software Quality Assurance (SQA) Engineer with expertise in Test Automation. Masud's expertise in designing and implementing robust test automation frameworks is truly remarkable. His attention to detail, technical proficiency, and innovative approach have consistently yielded exceptional results.\n\nOne of Masud's standout qualities is his exceptional teamwork and collaboration skills. He is always willing to go the extra mile to support his team members and foster a positive work environment. Masud's positive attitude, professionalism, and ability to handle complex projects with ease make him a true asset to any team.`,
  },
  {
    name: 'Md. Ahata Sham Ul Haque Tushar',
    role: 'Frontend Developer & Software Engineer',
    company: '',
    date: 'November 2021',
    relationship: 'Colleague',
    initials: 'AT',
    color: '#f9a825',
    quote: 'He is a great QA.',
  },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  icon: string;
  color: string;
  issuerLogo: 'linkedin' | 'udemy' | 'keeron' | 'generic';
}

export const certifications: Certification[] = [
  {
    name: 'Advanced JMeter',
    issuer: 'LinkedIn Learning',
    date: 'Feb 2025',
    credentialUrl: 'https://www.linkedin.com/learning/certificates/95c45a3b30c603d366f0139bf12f798802fdd2ea552ea610456ac03415589d82',
    icon: 'speed',
    color: '#0a66c2',
    issuerLogo: 'linkedin',
  },
  {
    name: 'Udemy Certification',
    issuer: 'Udemy',
    date: '',
    credentialUrl: 'https://www.udemy.com/certificate/UC-cb0a2541-0d90-4edc-88c9-44a090add076/',
    icon: 'school',
    color: '#a435f0',
    issuerLogo: 'udemy',
  },
  {
    name: 'Keeron Certification',
    issuer: 'Keeron',
    date: '',
    credentialUrl: 'https://keeron.com/certificate/1739962579258',
    icon: 'verified',
    color: '#5dcaa5',
    issuerLogo: 'keeron',
  },
];
