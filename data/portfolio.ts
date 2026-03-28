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
}

export const projects: Project[] = [
  {
    title: 'Hybrid Automation Framework',
    description: 'A production-grade hybrid framework built with WebdriverIO and Appium, supporting both web and native mobile platforms with a single shared codebase architecture.',
    longDescription: 'Engineered a modular Page Object Model framework with data-driven capabilities, cross-browser support, and integrated CI/CD reporting. Supports parallel execution across BrowserStack and local grids.',
    tags: ['WebdriverIO', 'Appium', 'Node.js', 'JavaScript', 'BrowserStack'],
    github: 'https://github.com/ranam2030',
    featured: true,
    metrics: '1200+ tests · 70% faster regression',
  },
  {
    title: 'Playwright E2E Framework',
    description: 'Optimized Playwright test suite with integrated CI/CD hooks, custom HTML reporting via Allure, and environment-specific configuration management.',
    longDescription: 'Built on TypeScript with fixture-based architecture, API mocking capabilities, and visual comparison testing. Includes GitHub Actions workflow for scheduled and PR-triggered runs.',
    tags: ['Playwright', 'TypeScript', 'GitHub Actions', 'Allure'],
    github: 'https://github.com/ranam2030',
    featured: false,
    metrics: '3 environments · 15min full suite',
  },
];

export const stats = [
  { value: '70%', label: 'Regression Reduced' },
  { value: '1.2k+', label: 'Automated Test Cases' },
  { value: '5+', label: 'Years of Expertise' },
  { value: '0', label: 'Critical Release Bugs' },
];
