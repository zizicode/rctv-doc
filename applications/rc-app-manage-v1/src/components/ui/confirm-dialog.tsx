// confirm-dialog.tsx
import { useEffect } from "react"

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message,
  confirmText = "Sí, confirmar",
  cancelText = "Cancelar"
}: ConfirmDialogProps) {
  
  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="confirm-dialog">
      <div className="confirm-dialog__overlay" onClick={onClose} />
      <div className="confirm-dialog__content">
        <div className="confirm-dialog__header">
          <h3>{title}</h3>
        </div>
        
        <div className="confirm-dialog__body">
          <p>{message}</p>
        </div>
        
        <div className="confirm-dialog__footer">
          <button 
            className="confirm-dialog__button confirm-dialog__button--cancel"
            onClick={onClose}
            type="button"
          >
            {cancelText}
          </button>
          <button 
            className="confirm-dialog__button confirm-dialog__button--confirm"
            onClick={handleConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}