"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroWindowProps {
  onOpenProjects: () => void
  onOpenContact: () => void
}

export function HeroWindow({ onOpenProjects, onOpenContact }: HeroWindowProps) {
  return (
    <div className="space-y-4">
      <div className="relative py-2 text-center bg-[#ffe45e] border-2 border-[#1b1b3a] rounded shadow-[2px_2px_0px_#1b1b3a] overflow-hidden">
        <h1 className="font-black text-4xl sm:text-5xl tracking-widest text-[#1b1b3a] uppercase italic drop-shadow-[2px_2px_0px_#ff8fcf]">
          K A W A I I _
        </h1>
        <div className="absolute top-1 right-2 animate-bounce">
          <Sparkles className="size-4 text-[#ff8fcf] fill-current" />
        </div>
      </div>

      <p className="font-bold text-sm text-[#1b1b3a]/90 text-center leading-relaxed">
        Hello! I am <span className="underline decoration-[#ff8fcf] decoration-2">Muhamad Zafar Syah</span>, a Full-Stack Web Developer building Retro-Future aesthetic websites.
      </p>

      <p className="text-xs text-[#1b1b3a]/75 text-center">
        Specialising in creating interactive React frontends, customized design systems, and AI-assisted tooling with clean constraints.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button variant="lemon" size="sm" onClick={onOpenProjects}>
          Launch Projects.exe
        </Button>
        <Button
          variant="outline" size="sm"
          onClick={onOpenContact}
          className="bg-white border-2 border-[#1b1b3a] text-[#1b1b3a] hover:bg-[#ff8fcf]/20"
        >
          Say Hello!
        </Button>
      </div>
    </div>
  )
}
