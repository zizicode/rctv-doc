export function DateTime(createdAt: string): string {
    if (!createdAt) return ""
  
    // Normaliza formatos tipo "YYYY-MM-DD HH:mm:ss" a ISO válido
    let fixed = createdAt.trim()
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(fixed)) {
      fixed = fixed.replace(" ", "T") + "Z" // asumimos UTC
    }
  
    const date = new Date(fixed)
    if (isNaN(date.getTime())) return createdAt // fallback: devolver original
  
    const now = new Date()
  
    const isSameDay =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
  
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)
    const isYesterday =
      date.getFullYear() === yesterday.getFullYear() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getDate() === yesterday.getDate()
  
    const hh = String(date.getHours()).padStart(2, "0")
    const mm = String(date.getMinutes()).padStart(2, "0")
  
    if (isSameDay) return `hoy a las ${hh}:${mm}`
    if (isYesterday) return `ayer a las ${hh}:${mm}`
  
    const dd = String(date.getDate()).padStart(2, "0")
    const MM = String(date.getMonth() + 1).padStart(2, "0")
    const yyyy = date.getFullYear()
  
    return `${dd}-${MM}-${yyyy} a las ${hh}:${mm}`
  }
  