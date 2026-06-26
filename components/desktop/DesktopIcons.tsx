"use client"

import type { WindowId } from "@/data/windows"

const ICONS: { id: WindowId; emoji: string; label: string }[] = [
  { id: "hero", emoji: "🖥️", label: "welcome.exe" },
  { id: "about", emoji: "📄", label: "about.txt" },
  { id: "projects", emoji: "📂", label: "projects.exe" },
  { id: "skills", emoji: "⚙️", label: "skills.sys" },
  { id: "experience", emoji: "📈", label: "career.dat" },
  { id: "contact", emoji: "🔗", label: "contact.lnk" },
]

interface DesktopIconsProps {
  visible: boolean
  onOpenWindow: (id: WindowId) => void
}

export function DesktopIcons({ visible, onOpenWindow }: DesktopIconsProps) {
  return (
    <div
      className={`grid grid-flow-row auto-rows-max gap-6 w-fit md:w-32 transition-all duration-700 ease-out z-0 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      {ICONS.map((icon) => (
        <button
          key={icon.id}
          onClick={() => onOpenWindow(icon.id)}
          className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-transparent hover:border-[#1b1b3a] hover:bg-[#8ed1fc]/20 text-center w-24 group transition-all"
        >
          <span className="text-3xl filter drop-shadow-[1px_1px_0px_rgba(27,27,58,0.2)] group-hover:scale-110 transition-transform">
            {icon.emoji}
          </span>
          <span className="mt-1 font-mono text-[10px] font-bold truncate max-w-full">{icon.label}</span>
        </button>
      ))}
    </div>
  )
}
