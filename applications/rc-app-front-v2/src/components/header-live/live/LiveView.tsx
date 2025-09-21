import React from "react"
import styles from "./LiveView.module.scss"

interface LiveViewProps {
  src?: string // URL del iframe (ej: YouTube, Twitch, etc.)
  title?: string // Accesibilidad
}

const LiveView: React.FC<LiveViewProps> = ({ src, title = "Live stream" }) => {
  return (
    <div className={styles.liveView}>
      {src ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className={styles.placeholder}>
          <p>No hay transmisión en vivo</p>
        </div>
      )}
    </div>
  )
}

export default LiveView
