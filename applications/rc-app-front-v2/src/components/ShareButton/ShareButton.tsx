import React from "react"
import { Share2, Copy, MessageCircle } from "lucide-react"
import { BsTwitterX, BsFacebook } from "react-icons/bs"
import "./shareButton.scss"

interface ShareButtonProps {
    slug: string
    title: string
    description?: string
}

const API_BASE = import.meta.env.VITE_API_URL // tu backend con /share/:slug

export const ShareButton: React.FC<ShareButtonProps> = ({
    slug,
    title,
    description = "Mira este artículo interesante",
}) => {
    const shareUrl = `${API_BASE}/posts/share/${slug}`

    const handleNativeShare = async () => {
        const canShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

        if (canShare) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url: shareUrl,
                });
            } catch (err) {
                console.log("Compartir cancelado o fallido", err);
            }
        } else {
            alert("Tu navegador no soporta la función de compartir.");
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            alert("✅ Enlace copiado al portapapeles")
        } catch {
            alert("❌ No se pudo copiar el enlace")
        }
    }

    return (
        <div className="share-buttons">
            <h4>Compartir:</h4>
            <div className="buttons">
                {/* Nativo (solo visible si soporta) */}
                {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
                    <button className="native" onClick={handleNativeShare}>
                        <Share2 size={18} /> Compartir
                    </button>
                )}

                {/* Fallback manual */}
                <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `${title} ${shareUrl}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp"
                >
                    <MessageCircle size={18} /> WhatsApp
                </a>

                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook"
                >
                    <BsFacebook size={18} /> Facebook
                </a>

                <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        shareUrl
                    )}&text=${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="twitter"
                >
                    <BsTwitterX size={18} /> X / Twitter
                </a>

                <button onClick={handleCopy} className="copy">
                    <Copy size={18} />
                </button>
            </div>
        </div>
    )
}
