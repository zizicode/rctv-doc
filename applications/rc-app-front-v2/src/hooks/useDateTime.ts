import { useEffect, useState } from "react"

export const useDateTime = () => {
  const [date, setDate] = useState("")
  const [shortDate, setShortDate] = useState("")
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()

      // Fecha larga: Martes, 23 de agosto 2025
      const formattedDate = now.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })

      // Fecha corta: Oct 7, 2025
      const formattedShortDate = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })

      // Hora: 01:34:00 PM
      const formattedTime = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })

      setDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1))
      setShortDate(formattedShortDate)
      setTime(formattedTime)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return { date, shortDate, time }
}
