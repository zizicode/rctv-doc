import React, { useState } from "react"
import styles from "./Live.module.scss"

interface LiveViewProps {
  src?: string // URL del iframe (ej: YouTube, Twitch, etc.)
  title?: string // Accesibilidad
}

const Live: React.FC<LiveViewProps> = ({ src, title = "Live stream" }) => {
  const [error, setError] = useState(false)

  const handleError = () => setError(true)

  return (
    <div className={styles.liveView}>
      {src && !error ? (
        <iframe
          src={src}
          title={title}
          onError={handleError}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className={styles.placeholder}>
          <p>{src ? "Stream no found" : "No hay transmisión en vivo"}</p>
        </div>
      )}
    </div>
  )
}

export default Live
