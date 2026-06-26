"use client"

import type { ReactNode } from "react"
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

  return (
    <div
      onClick={() => onBringToFront(win.id)}
      className={`fixed rounded-md border-2 border-[#1b1b3a] bg-[#d7dde8] shadow-[4px_4px_0px_#1b1b3a] flex flex-col overflow-hidden ${
        isAnimating ? "animate-window-open" : ""
      }`}
      style={{
        zIndex: win.zIndex,
        visibility: "visible" as const,
        ...(win.isMaximized
          ? {
              top: isMobile ? "0.25rem" : "2rem",
              left: isMobile ? "0.25rem" : "2rem",
              right: isMobile ? "0.25rem" : "2rem",
              bottom: isMobile ? "3rem" : "2rem",
              width: undefined as unknown as string,
              height: undefined as unknown as string,
            }
          : {
              top: `${win.top}px`,
              left: `${win.left}px`,
              width: win.width > 0 ? `${win.width}px` : undefined,
              maxWidth: isMobile ? "calc(100vw - 16px)" : undefined,
              height: win.height > 0 ? `${win.height}px` : undefined,
              maxHeight: "80vh",
            }),
      }}
    >
      {/* Title Bar */}
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

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#d7dde8]">
        {children}
      </div>

      {/* Resize Handle */}
      {!win.isMaximized && <ResizeHandle onResizeStart={handleResizeStart} />}
    </div>
  )
}
