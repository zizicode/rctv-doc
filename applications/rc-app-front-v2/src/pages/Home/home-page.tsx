import React from "react"
import { useDataStore } from "../../store"
import "./home.scss"
import { HiOutlineCalendarDateRange } from "react-icons/hi2"
import { FiArrowDownCircle } from "react-icons/fi"
import { RxPerson } from "react-icons/rx"
import AdBanner from "../../components/AdBanner/AdBanner"
import NewsSearch from "../../components/NewsSearch/NewsSearch"
import ContactForm from "../../components/ContactForm/ContactForm"
import { useSmartNavigate } from "../../hooks/useSmartNavigate"
import { formatViews } from "../../utils/formatViews"

const HomePage: React.FC = () => {
  const useLink = useSmartNavigate()
  const { data, loading } = useDataStore()
  const media = import.meta.env.VITE_API_URL_MEDIA

  // Manejo seguro si no hay data
  if (loading) {
    return (
      <div className="HomePage loading">
        <p>Cargando artículos...</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="HomePage empty">
        <h2>No hay artículos disponibles aún.</h2>
        <p>Vuelve pronto para descubrir las últimas publicaciones.</p>
      </div>
    )
  }

  const latestPost = [...data].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )[0]

  return (
    <div className="HomePage">
      <div className="title">
        <h1>Periódico Digital</h1>
        <p>
          Mantente informado con nuestros últimos artículos publicados{" "}
          <span>
            <FiArrowDownCircle />
          </span>
        </p>
      </div>

      {latestPost && (
        <div className="latestPost">
          <div className="item-detail">
            <h1>{latestPost.title}</h1>
            <p>
              <span>
                <HiOutlineCalendarDateRange />
                {new Date(latestPost.created_at).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </span>{" "}
              <span>
                <RxPerson />
                {formatViews(latestPost.views as number)}
              </span>
            </p>

            <p>{latestPost.description}</p>
            <button onClick={() => useLink(`/post/${latestPost.slug}`)}>Leer más</button>
          </div>

          <div className="item-banner">
            <img src={media + latestPost.cover_url} alt={latestPost.title} />
          </div>
        </div>
      )}

      <AdBanner />
      <NewsSearch />
      <AdBanner />
      <ContactForm />
    </div>
  )
}

export default HomePage
