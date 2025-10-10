import React, { useState, useMemo } from "react"
import { useDataStore } from "../../store"
import { Calendar, Search } from "lucide-react"
import "./newsSearch.scss"
import { useSmartNavigate } from "../../hooks/useSmartNavigate";

const ITEMS_PER_PAGE = 10

const NewsSearch: React.FC = () => {
  const { data } = useDataStore()
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const media = import.meta.env.VITE_API_URL_MEDIA
  const useLink = useSmartNavigate();

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase().trim()
    const sorted = [...data].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    if (!q) return sorted
    return sorted.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.keywords.some((kw) => kw.toLowerCase().includes(q))
    )
  }, [data, query])

  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="NewsSearch">
      <div className="news-header">
        <h2>Últimas Noticias</h2>
        <div className="search-box">
          <Search size={18} className="icon" />
          <input
            type="text"
            placeholder="Buscar por título, descripción o palabra clave..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
          />
        </div>
      </div>

      <div className="news-grid">
        {paginatedPosts.map((post, i) => (
          <div className="news-card" key={i} onClick={() => useLink(`/post/${post.slug}`)}>
            <div className="image-box">
              <img src={media + post.cover_url} alt={post.title} />
            </div>
            <div className="news-content">
              <h3 className="title">{post.title}</h3>
              <p className="desc">{post.description}</p>
              <div className="meta">
                <Calendar size={14} />
                <span>
                  {new Date(post.created_at).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default NewsSearch
