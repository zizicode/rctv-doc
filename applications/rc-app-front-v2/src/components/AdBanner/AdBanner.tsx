import React, { useState, useEffect } from "react"
import "./adBanner.scss"

interface AdItem {
  url: string
  alt?: string
  link?: string
}

interface Props {
  items: AdItem[]
  delay?: number
}

const AdBannerSlider: React.FC<Props> = ({ items, delay = 4000 }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length)
    }, delay)
    return () => clearInterval(interval)
  }, [items.length, delay])

  const current = items[index]

  const Image = (
    <img
      src={current.url}
      alt={current.alt || "Publicidad"}
      className="fade-image"
    />
  )

  return (
    <div className="AdBannerSlider">
      {current.link ? (
        <a href={current.link} target="_blank" rel="noopener noreferrer">
          {Image}
        </a>
      ) : (
        Image
      )}
    </div>
  )
}

export default AdBannerSlider
