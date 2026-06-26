"use client"

import { Monitor, Volume2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { WindowId } from "@/data/windows"
import type { WindowState } from "@/data/windows"

interface TaskbarProps {
  windows: WindowState[]
  currentTime: string
  onStart: () => void
  onToggleWindow: (id: WindowId) => void
  onBringToFront: (id: WindowId) => void
}

export function Taskbar({ windows, currentTime, onStart, onToggleWindow, onBringToFront }: TaskbarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 border-t-2 border-[#1b1b3a] bg-[#d7dde8] flex items-center justify-between px-3 z-[999] shadow-[0_-2px_10px_rgba(27,27,58,0.1)]">
      <div className="flex items-center gap-1.5">
        <Button
          size="sm"
          variant="lemon"
          className="h-7 text-xs font-black border-2 border-[#1b1b3a] uppercase px-2.5 shadow-[1.5px_1.5px_0px_#1b1b3a] active:translate-y-px active:shadow-[0.5px_0.5px_0px_#1b1b3a] flex items-center gap-1 shrink-0"
          onClick={onStart}
        >
          <Monitor className="size-3.5 fill-[#1b1b3a]/10" />
          <span>Start</span>
        </Button>

        <span className="w-0.5 h-6 bg-[#1b1b3a]/20 mx-1" aria-hidden />

        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[50vw] sm:max-w-[70vw] pr-2 no-scrollbar">
          {windows.map((win) => {
            const isActive = win.isOpen
            return (
              <button
                key={win.id}
                onClick={() => {
                  onToggleWindow(win.id)
                  if (!win.isOpen) onBringToFront(win.id)
                }}
                className={`h-7 px-2 sm:px-2.5 rounded border-2 border-[#1b1b3a] text-[10px] font-bold flex items-center gap-1.5 transition-all truncate max-w-28 shrink-0 ${
                  isActive
                    ? "bg-[#ff8fcf] shadow-[inset_1.5px_1.5px_0px_#1b1b3a] translate-y-px"
                    : "bg-white shadow-[1.5px_1.5px_0px_#1b1b3a] hover:bg-zinc-100"
                }`}
              >
                <span>{win.icon}</span>
                <span className="max-sm:hidden truncate">{win.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-2 border-2 border-[#1b1b3a] bg-white rounded px-2.5 py-0.5 shadow-[inset_1px_1px_0px_rgba(27,27,58,0.1)] text-[10px] font-black text-[#1b1b3a]/90 font-mono">
        <Volume2 className="size-3 text-[#1b1b3a]/50" />
        <Clock className="size-3 text-[#1b1b3a]/50" />
        <span>{currentTime}</span>
      </div>
    </div>
  )
}
