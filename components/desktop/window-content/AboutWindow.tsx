"use client"

export function AboutWindow() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative size-16 shrink-0 rounded border-2 border-[#1b1b3a] bg-white overflow-hidden shadow-[2px_2px_0px_#1b1b3a]">
          <div className="absolute inset-0 bg-[#ffe45e]/20 flex items-center justify-center text-3xl">
            👾
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-sm text-[#1b1b3a]">Zafar Syah</span>
            <span className="size-2 rounded-full bg-[#8ff0d0] border border-[#1b1b3a] animate-pulse" />
            <span className="text-[9px] font-bold text-[#1b1b3a]/60 uppercase">Online</span>
          </div>
          <p className="text-xs text-[#1b1b3a]/75 font-mono">Status: Coding Y2K widgets...</p>
        </div>
      </div>

      <div className="rounded border-2 border-[#1b1b3a] bg-white p-3 space-y-2 shadow-[2px_2px_0px_#1b1b3a]">
        <p className="text-xs text-[#1b1b3a] leading-relaxed">
          I am a software engineer based in Indonesia. I love working at the intersection of creative frontends and developer tooling.
        </p>
        <p className="text-xs text-[#1b1b3a] leading-relaxed">
          By blending modern tech (Next.js 16, React 19, TypeScript) with retro visual cues (flat windows, dotted grids, thick lines, pastel fills), I create software that stands out from typical SaaS layouts.
        </p>
      </div>

      <div className="relative border-2 border-[#1b1b3a] bg-[#8ff0d0] text-xs font-bold text-[#1b1b3a] py-1 px-2 rounded shadow-[1px_1px_0px_#1b1b3a] overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee uppercase tracking-wide font-mono text-[10px]">
          *** CURRENT MUSIC: Daft Punk - One More Time {"🎧"} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; *** STATUS: Open for freelance inquiries {"✉️"} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </div>
  )
}
