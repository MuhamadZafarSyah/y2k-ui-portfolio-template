import { useState, useRef, useEffect, useCallback } from "react"

export function useSparkles() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([])
  const sparklesId = useRef(0)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (Math.random() > 0.08) return
    setSparkles((prev) => [...prev.slice(-15), { id: sparklesId.current++, x: e.clientX, y: e.clientY }])
  }, [])

  useEffect(() => {
    if (sparkles.length === 0) return
    const timer = setTimeout(() => setSparkles((prev) => prev.slice(1)), 800)
    return () => clearTimeout(timer)
  }, [sparkles])

  return { sparkles, handleMouseMove }
}
