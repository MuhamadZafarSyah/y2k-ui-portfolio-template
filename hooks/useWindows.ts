// ============================================================
// 🪝 useWindows — all window state, drag, resize, animation
// ============================================================

import { useState, useRef, useCallback, useEffect } from "react"
import type { WindowId, WindowState, DragState, ResizeState } from "@/data/windows"
import { getDefaultWindows } from "@/data/windows"

export function useWindows() {
  const [windows, setWindows] = useState<WindowState[]>(() => {
    if (typeof window === "undefined") return getDefaultWindows(1024, 768)
    return getDefaultWindows(window.innerWidth, window.innerHeight)
  })

  const [animatingIn, setAnimatingIn] = useState<Set<WindowId>>(new Set())
  const [isMobile, setIsMobile] = useState(false)

  const highestZ = useRef(10)
  const dragState = useRef<DragState | null>(null)
  const resizeState = useRef<ResizeState | null>(null)
  const animTimers = useRef<Map<WindowId, ReturnType<typeof setTimeout>>>(new Map())

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (dragState.current) {
        const { windowId, startMouseX, startMouseY, startLeft, startTop } = dragState.current
        setWindows((prev) =>
          prev.map((win) =>
            win.id === windowId ? { ...win, left: startLeft + (e.clientX - startMouseX), top: startTop + (e.clientY - startMouseY) } : win
          )
        )
      }
      if (resizeState.current) {
        const { windowId, startMouseX, startMouseY, startWidth, startHeight } = resizeState.current
        setWindows((prev) =>
          prev.map((win) =>
            win.id === windowId
              ? { ...win, width: Math.max(280, startWidth + (e.clientX - startMouseX)), height: Math.max(200, startHeight + (e.clientY - startMouseY)) }
              : win
          )
        )
      }
    }
    const handlePointerUp = () => { dragState.current = null; resizeState.current = null }
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [])

  const bringToFront = useCallback((id: WindowId) => {
    highestZ.current += 1
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: highestZ.current } : w)))
  }, [])

  const toggleWindow = useCallback((id: WindowId, state?: boolean) => {
    setWindows((prev) =>
      prev.map((win) => {
        if (win.id !== id) return win
        const nextState = state !== undefined ? state : !win.isOpen
        if (!nextState) return { ...win, isOpen: false }
        highestZ.current += 1
        setAnimatingIn((prev2) => {
          const next = new Set(prev2)
          next.add(id)
          return next
        })
        const existing = animTimers.current.get(id)
        if (existing) clearTimeout(existing)
        animTimers.current.set(id, setTimeout(() => {
          setAnimatingIn((prev2) => {
            const next = new Set(prev2)
            next.delete(id)
            return next
          })
        }, 280))
        return { ...win, isOpen: true, zIndex: highestZ.current }
      })
    )
  }, [])

  const toggleMaximize = useCallback((id: WindowId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)))
  }, [])

  const resetWindows = useCallback(() => {
    setWindows((prev) => prev.map((w) => (w.id === "hero" || w.id === "about" ? { ...w, isOpen: true } : w)))
  }, [])

  return {
    windows,
    setWindows,
    animatingIn,
    isMobile,
    dragState,
    resizeState,
    bringToFront,
    toggleWindow,
    toggleMaximize,
    resetWindows,
  }
}
