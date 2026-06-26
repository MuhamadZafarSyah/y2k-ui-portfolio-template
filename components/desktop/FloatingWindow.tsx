"use client"

import { type ReactNode, useState, useEffect } from "react"
import type { WindowId, DragState, ResizeState } from "@/data/windows"
import type { WindowState } from "@/data/windows"
import { WindowControls } from "@/components/ui/window-controls"
import { ResizeHandle } from "@/components/desktop/ResizeHandle"

interface FloatingWindowProps {
  win: WindowState
  isMobile: boolean
  isAnimating: boolean
  dragState: React.RefObject<DragState | null>
  resizeState: React.RefObject<ResizeState | null>
  onBringToFront: (id: WindowId) => void
  onToggleMaximize: (id: WindowId) => void
  onMinimize: (id: WindowId) => void
  onClose: (id: WindowId) => void
  windows: WindowState[]
  children: ReactNode
}

export function FloatingWindow({
  win,
  isMobile,
  isAnimating,
  dragState,
  resizeState,
  onBringToFront,
  onToggleMaximize,
  onMinimize,
  onClose,
  windows,
  children,
}: FloatingWindowProps) {
  const [vw, setVw] = useState(0)
  const [vh, setVh] = useState(0)

  useEffect(() => {
    const update = () => {
      setVw(window.innerWidth)
      setVh(window.innerHeight)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const handleDragStart = (e: React.PointerEvent) => {
    if (win.isMaximized) return
    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    dragState.current = {
      windowId: win.id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startLeft: win.left,
      startTop: win.top,
    }
  }

  const handleResizeStart = (e: React.PointerEvent) => {
    if (win.isMaximized) return
    e.preventDefault()
    e.stopPropagation()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    resizeState.current = {
      windowId: win.id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startWidth: win.width || 440,
      startHeight: win.height || 320,
    }
  }

  const pad = isMobile ? 4 : 32
  const taskbarH = 40
  const bottomPad = pad + taskbarH

  const maximizedStyle = {
    top: pad,
    left: pad,
    width: Math.max(0, vw - pad * 2),
    height: Math.max(0, vh - pad - bottomPad),
  }

  const normalStyle = {
    top: win.top,
    left: win.left,
    width: win.width > 0 ? win.width : 0,
    height: win.height > 0 ? win.height : 0,
  }

  const posStyle = win.isMaximized ? maximizedStyle : normalStyle

  return (
    <div
      onClick={() => onBringToFront(win.id)}
      className={`fixed rounded-md border-2 border-[#1b1b3a] bg-[#d7dde8] shadow-[4px_4px_0px_#1b1b3a] flex flex-col overflow-hidden ${
        isAnimating ? "animate-window-open" : "transition-[top,left,width,height] duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
      }`}
      style={{
        zIndex: win.zIndex,
        visibility: "visible" as const,
        top: `${posStyle.top}px`,
        left: `${posStyle.left}px`,
        width: posStyle.width != null && posStyle.width > 0 ? `${posStyle.width}px` : undefined,
        height: posStyle.height != null && posStyle.height > 0 ? `${posStyle.height}px` : undefined,
        maxWidth: win.isMaximized ? undefined : isMobile ? "calc(100vw - 16px)" : undefined,
        maxHeight: win.isMaximized ? undefined : "80vh",
      }}
    >
      <div
        className="flex items-center justify-between border-b-2 border-[#1b1b3a] bg-[#8ed1fc] px-3 py-1.5 cursor-move active:bg-[#ff8fcf] select-none touch-none"
        onDoubleClick={() => onToggleMaximize(win.id)}
        onPointerDown={handleDragStart}
      >
        <div className="flex items-center gap-1.5">
          <span className="mr-1">{win.icon}</span>
          <span className="font-mono text-[11px] font-black tracking-tight text-[#1b1b3a]">
            {win.title}
          </span>
        </div>
        <WindowControls
          onMinimize={() => onMinimize(win.id)}
          onMaximize={() => onToggleMaximize(win.id)}
          onClose={() => onClose(win.id)}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-[#d7dde8]">
        {children}
      </div>

      {!win.isMaximized && <ResizeHandle onResizeStart={handleResizeStart} />}
    </div>
  )
}
