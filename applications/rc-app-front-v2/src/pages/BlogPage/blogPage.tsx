import React from "react"
import { Link } from "react-router-dom"
import { useDataStore } from "../../store"
import "./BlogPage.scss"
import { HiOutlineCalendarDateRange } from "react-icons/hi2"
import { RxPerson } from "react-icons/rx"

const BlogPage: React.FC = () => {
  const { data, loading } = useDataStore()
  const media = import.meta.env.VITE_API_URL_MEDIA

  if (loading)
    return (
      <div className="BlogPage__loading">
        <p>Cargando publicaciones...</p>
      </div>
    )

  if (!data || data.length === 0)
    return (
      <div className="BlogPage__empty">
        <h2>No hay artículos disponibles aún.</h2>
        <p>Pronto añadiremos nuevas publicaciones.</p>
      </div>
    )

  return (
    <section className="BlogPage">
      <header className="BlogPage__header">
        <h1>Solo <span>Noticias</span></h1>
        <p>
          Explora las últimas publicaciones, tendencias y artículos del portal.
        </p>
      </header>

      <div className="BlogPage__grid">
        {data.map((post) => (
          <article key={post.id} className="BlogCard">
            <Link to={`/post/${post.slug}`}>
              <div className="BlogCard__image">
                <img src={media + post.cover_url} alt={post.title} />
              </div>
              <div className="BlogCard__content">
                <h2>{post.title}</h2>
                <p className="BlogCard__meta">
                  <span>
                    <HiOutlineCalendarDateRange />
                    {new Date(post.created_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                  <span>
                    <RxPerson />
                    {post.views}
                  </span>
                </p>
                <p className="BlogCard__description">
                  {post.description.length > 140
                    ? post.description.slice(0, 140) + "..."
                    : post.description}
                </p>
                <span className="BlogCard__link">Leer más →</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BlogPage
