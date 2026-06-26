"use client"

import { Badge } from "@/components/ui/badge"

const EXPERIENCES = [
  {
    title: "Senior Frontend Engineer",
    company: "Y2K Labs Corp.",
    period: "2024 - Present",
    badgeVariant: "mint" as const,
    dotColor: "bg-[#ffe45e]",
    description:
      "Developing internal design tokens, dashboard controls, and widgets. Rewrote legacy React core base to modern Next.js App Router resulting in +40% page speed optimization.",
  },
  {
    title: "Full Stack Web Developer",
    company: "Nostalgia Tech",
    period: "2022 - 2024",
    badgeVariant: "outline" as const,
    dotColor: "bg-[#ff8fcf]",
    description:
      "Built custom e-commerce templates and headless CMS integration pages. Wrote CLI scaffolding tools to bootstrap standard configurations instantly.",
  },
]

export function ExperienceWindow() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-[#1b1b3a]/75 font-mono">
        Career achievements and timeline log:
      </p>

      <div className="relative border-l-2 border-dashed border-[#1b1b3a] pl-4 ml-2 py-1 space-y-4">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="relative">
            <span className={`absolute -left-[21px] top-1 size-2.5 rounded-full border-2 border-[#1b1b3a] ${exp.dotColor}`} />
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-xs">{exp.title}</span>
                <Badge
                  variant={exp.badgeVariant}
                  className={`text-[8px] px-1 py-0 ${exp.badgeVariant === "outline" ? "border-[#1b1b3a] bg-white" : ""}`}
                >
                  {exp.period}
                </Badge>
              </div>
              <p className="text-[10px] font-mono text-[#1b1b3a]/70">{exp.company}</p>
              <p className="text-xs text-[#1b1b3a]/80 leading-normal">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
