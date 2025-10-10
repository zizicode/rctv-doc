import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDataStore } from "../../store"
import { ArrowLeft, Calendar, Eye } from "lucide-react"
import "./postView.scss"
import { useSmartNavigate } from "../../hooks/useSmartNavigate"

const PostView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { data } = useDataStore()
  const navigate = useNavigate()
  const useLink = useSmartNavigate()
  const media = import.meta.env.VITE_API_URL_MEDIA

  const post = data.find((p) => p.slug === slug)

  if (!post){
    navigate('/', {replace: true})
    return
  }

  const handleKeywordClick = (keyword: string) => {
    console.log("Keyword seleccionada:", keyword)
  }

  return (
    <div className="PostView">
      {/* Imagen principal con efecto parallax */}
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${media + post.cover_url})` }}
      >
        <div className="overlay">
          <div className="hero-content">
            <h1 className="title">
              <ArrowLeft
                className="back-icon"
                size={22}
                onClick={() => useLink("/")}
              />
              {post.title}
            </h1>
            <div className="meta">
              <span>
                <Calendar size={14} />{" "}
                {new Date(post.created_at).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}
              </span>
              <span>
                <Eye size={14} /> {post.views} vistas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cuerpo del post */}
      <div className="post-body">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></div>

        {/* Palabras clave */}
        <div className="keywords">
          <h4>Palabras clave:</h4>
          <div className="tags">
            {post.keywords.map((kw, i) => (
              <span key={i} onClick={() => handleKeywordClick(kw)}>
                #{kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostView
