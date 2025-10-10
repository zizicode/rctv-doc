// components/AdBanner.tsx
import React from "react"
import "./adBanner.scss"

interface AdBannerProps {
  imageUrl?: string
  alt?: string
}

const AdBanner: React.FC<AdBannerProps> = ({ imageUrl, alt = "Publicidad" }) => {
  return (
    <div className={`AdBanner ${!imageUrl ? "empty" : ""}`}>
      {imageUrl ? (
        <img src={imageUrl} alt={alt} />
      ) : (
        <span className="placeholder">Add Ads</span>
      )}
    </div>
  )
}

export default AdBanner
