"use client"

import { Power } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface BootScreenProps {
  bootProgress: number
  bootStatus: string
  onSkip: () => void
}

export function BootScreen({ bootProgress, bootStatus, onSkip }: BootScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black font-mono text-xs text-white p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-1 text-zinc-400">
          <p>RETRO BIOS Version 1.0.8</p>
          <p>Copyright (C) 2026, RetroFuture Industries Ltd.</p>
          <p>CPU: Y2K-Core Processor @ 999MHz</p>
          <p>Memory Test: 65,536 KB OK</p>
        </div>

        <div className="border-t border-zinc-800 pt-4 space-y-2">
          <p className="flex items-center gap-1">
            <span className="text-zinc-500">C:\&gt;</span>
            <span className="animate-pulse">load_portfolio.exe --y2k-mode</span>
          </p>
          <p className="text-emerald-400 font-bold">{bootStatus}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between font-bold text-[10px] text-zinc-400">
            <span>SYSTEM LOADING</span>
            <span>{bootProgress}%</span>
          </div>
          <Progress
            value={bootProgress}
            className="h-5 border border-zinc-700 bg-zinc-950 text-emerald-400 [&>[data-slot=progress-indicator]]:bg-emerald-500 rounded-none"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onSkip}
            className="text-xs border-zinc-700 hover:bg-zinc-900 text-zinc-400 font-mono hover:text-white rounded-none h-8"
          >
            <Power className="size-3.5 mr-1" />
            Skip Intro
          </Button>
        </div>
      </div>
    </div>
  )
}
