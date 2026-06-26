import { useState, useEffect } from "react"

export function useClock() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const date = new Date()
      let hours = date.getHours()
      const minutes = date.getMinutes()
      const ampm = hours >= 12 ? "PM" : "AM"
      hours = hours % 12 || 12
      setCurrentTime(`${hours}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  return currentTime
}
