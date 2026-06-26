// ============================================================
// 📁 Projects data — edit this file to add/change your projects
// ============================================================

export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  tags: string[]
  image?: string
  github?: string
  demo?: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Y2K Component Library",
    description: "A retro-themed design system and component library built on React, Radix UI, and TailwindCSS.",
    longDescription: "A fully feature-rich, high-performance UI library designed for developers who love retro aesthetics. Includes themes, widgets, forms, dialogs, and sliders, fully typed and optimized for bundle size. Used as the core for this very template.",
    tags: ["React", "Radix UI", "TailwindCSS", "NPM Package"],
    github: "https://github.com/MuhamadZafarSyah/y2k-ui",
    demo: "https://y2k-ui.web.id"
  },
  {
    id: 2,
    title: "Motion Playground",
    description: "Visual builder tool to design CSS animations and easings and export them straight to code.",
    longDescription: "An interactive application allowing users to preview animations (staggers, springs, lifts, sparkles) and tweak ease curves using a visual graph, generating production-ready CSS variables or GSAP animation timelines.",
    tags: ["Next.js", "GSAP", "SVG", "CSS Curves"],
    github: "https://github.com/MuhamadZafarSyah/y2k-ui",
    demo: "https://y2k-ui.web.id/playground/motion"
  },
  {
    id: 3,
    title: "Neon Retro CLI",
    description: "Interactive command-line tool that scaffolding project directories with customized color templates.",
    longDescription: "A custom CLI that scaffolds Next.js projects configured with shadcn and custom Y2K pastel tokens. It automates package installs, folder structuring, and baseline layout setups via simple commands.",
    tags: ["Node.js", "Commander", "Inquirer", "Chalk"],
    github: "https://github.com/MuhamadZafarSyah/y2k-ui",
    demo: "https://www.npmjs.com/package/y2k-ui-lib"
  }
]

export const FILTER_TABS = ["all", "react", "next.js", "node.js"]
