# Masud Rana — Senior QA Automation Engineer Portfolio

A production-ready Next.js 14 portfolio website built with the **"Precision Architect"** design system: deep obsidian backgrounds, Space Grotesk + Inter typography, Framer Motion animations, and full dark/light mode support.

---

## ✨ Features

- **Next.js 14** App Router with TypeScript
- **Tailwind CSS** with custom design tokens from the Precision Architect system
- **Framer Motion** animations (staggered reveals, scroll-triggered, page load)
- **Dark / Light mode** toggle with localStorage persistence
- **Responsive** mobile-first design
- **SEO** meta tags + Open Graph
- **Loading screen** animation
- **Status Terminal** floating widget
- **Contact form** (mock submit, no backend required)
- **Animated number counters** in Stats section
- **Timeline UI** for Experience section
- **Bento grid** for Projects section

---

## 📁 Folder Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout, SEO metadata, fonts
│   └── page.tsx            # Main page composition
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Stats.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── StatusTerminal.tsx
│       ├── LoadingScreen.tsx
│       ├── SectionWrapper.tsx
│       └── ThemeProvider.tsx
├── data/
│   └── portfolio.ts        # All content data (single source of truth)
├── styles/
│   └── globals.css
├── public/
│   └── favicon.svg
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🎨 Customization

### Update Personal Info
Edit `data/portfolio.ts` — it's the single source of truth for all content:
- Name, email, GitHub, LinkedIn
- Skills categories
- Experience timeline
- Projects

### Add Resume
Place your resume PDF at `public/resume.pdf` — the "Download Resume" button links to it automatically.

### Colors / Design Tokens
The full color palette is in `tailwind.config.ts`. The design follows the **Precision Architect** system — deep obsidian darks with `#98cbff` cyan primary.

---

## 🛠 Tech Stack

| Tool | Version |
|------|---------|
| Next.js | 14.2.5 |
| React | 18 |
| TypeScript | 5 |
| Tailwind CSS | 3.4 |
| Framer Motion | 11 |
| Lucide React | 0.400 |

---

## 📬 Contact

Built for **Masud Rana** · [masudr2030@gmail.com](mailto:masudr2030@gmail.com) · [github.com/ranam2030](https://github.com/ranam2030)
