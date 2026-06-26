"use client"

import { Progress } from "@/components/ui/progress"

const SKILLS = [
  { label: "React & Next.js", value: 95, trailingLabel: "V19 ready", indicatorClassName: "bg-[#8ed1fc]" },
  { label: "TypeScript", value: 90, trailingLabel: "Strict: true", indicatorClassName: "bg-[#ff8fcf]" },
  { label: "Tailwind CSS", value: 95, trailingLabel: "v4.0 engine", indicatorClassName: "bg-[#8ff0d0]" },
  { label: "Node.js & APIs", value: 85, trailingLabel: "Express/GraphQL", indicatorClassName: "bg-[#ffe45e]" },
  { label: "Animations (GSAP)", value: 80, trailingLabel: "ScrollTrigger", indicatorClassName: "bg-[#b69cff]" },
]

export function SkillsWindow() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-[#1b1b3a]/75 font-mono">
        System specs of dev capabilities:
      </p>

      <div className="space-y-3 bg-white p-4 border-2 border-[#1b1b3a] rounded shadow-[2px_2px_0px_#1b1b3a]">
        {SKILLS.map((skill) => (
          <Progress
            key={skill.label}
            label={skill.label}
            value={skill.value}
            showValue
            trailingLabel={skill.trailingLabel}
            indicatorClassName={skill.indicatorClassName}
            className="border-[#1b1b3a]"
          />
        ))}
      </div>
    </div>
  )
}
