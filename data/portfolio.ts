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