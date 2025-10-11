import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Eye } from "lucide-react"
import "./postView.scss"
import { useSmartNavigate } from "../../hooks/useSmartNavigate"
import { formatViews } from "../../utils/formatViews"
import { getPostBySlug } from "../../services/blog.services"
import type { Post } from "../../store"
import { ShareButton } from "../../components/ShareButton/ShareButton"

const PostView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const useLink = useSmartNavigate()
  const media = import.meta.env.VITE_API_URL_MEDIA

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) return
        const res = await getPostBySlug(slug)
        if (res) setPost(res)
      } catch (err) {
        console.error("Error al cargar el post:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug, navigate])

  const handleKeywordClick = (keyword: string) => {
    console.log("Keyword seleccionada:", keyword)
  }

  if (loading) return <p>Cargando publicación...</p>
  if (!post) return <p>Publicación no disponible o fue eliminada.</p>

  return (
    <div className="PostView">
      <ShareButton slug={post.slug} title={post.title} description={post.description}/><br />
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
                <Eye size={14} /> {formatViews(post.views as number)} vistas
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="post-body">
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></div>

        {post.keywords?.length > 0 && (
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
        )}
      </div>
    </div>
  )
}

export default PostView
