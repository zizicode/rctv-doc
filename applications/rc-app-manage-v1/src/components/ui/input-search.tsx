// input-search.tsx
import { useState, useEffect } from "react"
import { Search, ArrowUpDown } from "lucide-react"

interface InputSearchProps<T extends Record<string, any>> {
  data: T[]
  fields: string[]
  onFilter: (filtered: T[]) => void
  placeholder?: string
  sortByUpdated?: boolean // Habilitar ordenamiento por updated_at
}

export default function InputSearch<T extends Record<string, any>>({
  data,
  fields,
  onFilter,
  placeholder = "Buscar...",
  sortByUpdated = true
}: InputSearchProps<T>) {
  const [query, setQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent")

  // 🔹 Normalizar texto (eliminar acentos y convertir a minúsculas)
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")

  // 🔹 Ordenar por updated_at si está habilitado
  const sortData = (items: T[]) => {
    if (!sortByUpdated) return items

    return [...items].sort((a, b) => {
      const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0
      const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0

      // Poner los que tienen updated_at arriba
      if (dateA === 0 && dateB !== 0) return 1
      if (dateA !== 0 && dateB === 0) return -1
      
      // Ordenar por fecha
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB
    })
  }

  // 🔹 Filtrar y ordenar datos
  const processData = () => {
    let result = data

    // Filtrar si hay búsqueda
    if (query.trim()) {
      const normalizedQuery = normalize(query)
      result = data.filter(item => {
        return fields.some(field => {
          const fieldValue = String(item[field] ?? "")
          return normalize(fieldValue).includes(normalizedQuery)
        })
      })
    }

    // Ordenar si está habilitado
    result = sortData(result)
    
    onFilter(result)
  }

  // ✅ Reprocesar cuando cambie data, query o sortOrder
  useEffect(() => {
    processData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, query, sortOrder])

  // 🔹 Manejar búsqueda
  const handleSearch = (value: string) => {
    setQuery(value)
  }

  // 🔹 Alternar orden de fecha
  const toggleSort = () => {
    setSortOrder(prev => prev === "recent" ? "oldest" : "recent")
  }

  return (
    <div className="input-search">
      <div className="input-search__wrapper">
        <Search className="input-search__icon" size={18} />
        <input
          type="text"
          className="input-search__field"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {query && (
          <button
            className="input-search__clear"
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>

      {sortByUpdated && (
        <button
          className={`input-search__sort ${sortOrder === "recent" ? "active" : ""}`}
          onClick={toggleSort}
          title={sortOrder === "recent" ? "Más reciente primero" : "Más antiguo primero"}
          aria-label="Ordenar por fecha de actualización"
        >
          <ArrowUpDown size={18} />
        </button>
      )}
    </div>
  )
}