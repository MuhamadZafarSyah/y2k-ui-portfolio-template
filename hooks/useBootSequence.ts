import { useState, useEffect } from "react"

const STATUS_UPDATES = [
  { pct: 15, msg: "Checking system memory (64MB)... OK" },
  { pct: 35, msg: "Loading display drivers (SVGA)..." },
  { pct: 50, msg: "Initializing y2k-ui-lib tokens..." },
  { pct: 70, msg: "Setting up hallmark AI constraints..." },
  { pct: 90, msg: "Starting retro desktop manager..." },
  { pct: 100, msg: "Ready." },
]

export function useBootSequence() {
  const [booting, setBooting] = useState(true)
  const [bootProgress, setBootProgress] = useState(0)
  const [bootStatus, setBootStatus] = useState("Initializing kernel...")

  useEffect(() => {
    if (!booting) return
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 2
        const cap = Math.min(next, 100)
        const update = STATUS_UPDATES.find((s) => cap <= s.pct)
        if (update) setBootStatus(update.msg)
        if (cap >= 100) {
          clearInterval(interval)
          setTimeout(() => setBooting(false), 300)
          return 100
        }
        return cap
      })
    }, 100)
    return () => clearInterval(interval)
  }, [booting])

  return { booting, setBooting, bootProgress, bootStatus }
}
