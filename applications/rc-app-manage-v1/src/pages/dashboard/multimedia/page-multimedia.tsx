"use client"

import { useState, useRef, useEffect } from "react"
import { FiUpload, FiX, FiTrash2, FiImage, FiVideo, FiGrid, FiCheckSquare, FiSquare } from "react-icons/fi"
import { useDataStore, type Media } from "@/store/data.store"
import { addNewMultiImage, deleteImage } from "@/lib/api/endpoint"
import "./multimedia.scss"
import { useAuthStore } from "@/store"
import Toast from "@/lib/toast"

interface PreviewFile extends File {
  preview: string
  type: "image" | "video"
}

export default function MultimediaPage() {
  const media = useDataStore((state) => state.data?.media || [])
  const updateStore = useDataStore((state) => state.update)
  const storeData = useDataStore((state) => state.data)
  const {user} = useAuthStore()

  const [activeTab, setActiveTab] = useState<"all" | "images" | "videos">("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]) // ✅ acumulador real de archivos
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isSelectionMode, setIsSelectionMode] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const images = media.filter((item) => item.type === "image")
  const videos = media.filter((item) => item.type === "video")

  const filteredMedia = media.filter((item) => {
    if (activeTab === "all") return true
    if (activeTab === "images") return item.type === "image"
    if (activeTab === "videos") return item.type === "video"
    return true
  })

  // =============================
  // 🔹 Procesamiento de archivos
  // =============================
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    processFiles(files)
  }

  const processFiles = (files: File[]) => {
    const validFiles = files.filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"))

    const filesWithPreview: PreviewFile[] = validFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
    }))

    setPreviewFiles((prev) => [...prev, ...filesWithPreview])
    setUploadedFiles((prev) => [...prev, ...validFiles]) // ✅ guardamos los reales
  }

  // =============================
  // 🔹 Subida de archivos
  // =============================
  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return

    setIsUploading(true)
    try {
      const uploadedMedia: Media[] = []

      for (const file of uploadedFiles) {
        const formData = new FormData()
        const fileType = file.type.startsWith("image/") ? "image" : "video"
        formData.append("file", file)
        formData.append("title", file.name)
        formData.append("description", "")
        formData.append("uploaded_by", user?.id || "")
        formData.append("type", fileType) // ✅ agregado
      
        const response = await addNewMultiImage(formData)

        if (response?.media) {
          const item = response.media
          uploadedMedia.push({
            id: item.id,
            file_url: item.file_url,
            type: item.type,
            title: item.title || "Sin título",
            description: item.description || "",
            uploaded_by: item.uploaded_by,
            created_at: item.created_at,
          })
        }
      }

      if (uploadedMedia.length && storeData) {
        await updateStore({
          ...storeData,
          media: [...media, ...uploadedMedia],
        })
      }

      
      Toast.success(uploadedMedia.length >= 2 ? "Imagenes Guardadas" : "Imagen Guardada")

      previewFiles.forEach((file) => URL.revokeObjectURL(file.preview))
      setPreviewFiles([])
      setUploadedFiles([])
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error uploading files:", error)
    } finally {
      setIsUploading(false)
    }
  }

  // =============================
  // 🔹 Eliminar archivos locales
  // =============================
  const removePreviewFile = (index: number) => {
    setPreviewFiles((prev) => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // =============================
  // 🔹 Drag & Drop
  // =============================
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  // =============================
  // 🔹 Eliminar archivos del servidor
  // =============================
  const handleDelete = async (fileId: string) => {
    try {
      const response = await deleteImage({ id: fileId })
      if (response.success && storeData) {
        Toast.success(response.message)
        await updateStore({
          ...storeData,
          media: media.filter((item) => item.id !== fileId),
        })
        setPreviewFiles((prev) => prev.filter((file) => file.name !== fileId))
      }
      updateStore()
    } catch (error) {
      console.error("Error deleting file:", error)
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedFiles.size === 0) return
    await Promise.all(Array.from(selectedFiles).map((id) => handleDelete(id)))
    setSelectedFiles(new Set())
    setIsSelectionMode(false)
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(fileId)) newSet.delete(fileId)
      else newSet.add(fileId)
      return newSet
    })
  }

  const selectAll = () => setSelectedFiles(new Set(filteredMedia.map((i) => i.id)))
  const deselectAll = () => setSelectedFiles(new Set())

  useEffect(() => {
    return () => {
      previewFiles.forEach((f) => URL.revokeObjectURL(f.preview))
    }
  }, [])

  // =============================
  // 🔹 UI
  // =============================
  return (
    <div className="multimedia-page">
      {/* Header */}
      <div className="multimedia-page__header">
        <div className="multimedia-page__header-content">
          <h1 className="multimedia-page__title">Gestión Multimedia</h1>
          <p className="multimedia-page__subtitle">Administra tus imágenes y videos</p>
        </div>

        <div className="multimedia-page__actions">
          {isSelectionMode && (
            <>
              <button
                className="multimedia-page__btn multimedia-page__btn--secondary"
                onClick={selectedFiles.size === filteredMedia.length ? deselectAll : selectAll}
              >
                {selectedFiles.size === filteredMedia.length ? "Deseleccionar todo" : "Seleccionar todo"}
              </button>

              {selectedFiles.size > 0 && (
                <button className="multimedia-page__btn multimedia-page__btn--danger" onClick={handleDeleteSelected}>
                  <FiTrash2 />
                  Eliminar ({selectedFiles.size})
                </button>
              )}
            </>
          )}

          <button
            className="multimedia-page__btn multimedia-page__btn--secondary"
            onClick={() => setIsSelectionMode(!isSelectionMode)}
          >
            <FiCheckSquare />
            {isSelectionMode ? "Cancelar selección" : "Seleccionar"}
          </button>

          <button className="multimedia-page__btn multimedia-page__btn--primary" onClick={() => setIsModalOpen(true)}>
            <FiUpload />
            Subir archivos
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="multimedia-page__tabs">
        <button
          className={`multimedia-page__tab ${activeTab === "all" ? "multimedia-page__tab--active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          <FiGrid /> Todos ({media.length})
        </button>
        <button
          className={`multimedia-page__tab ${activeTab === "images" ? "multimedia-page__tab--active" : ""}`}
          onClick={() => setActiveTab("images")}
        >
          <FiImage /> Imágenes ({images.length})
        </button>
        <button
          className={`multimedia-page__tab ${activeTab === "videos" ? "multimedia-page__tab--active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          <FiVideo /> Videos ({videos.length})
        </button>
      </div>

      {/* Gallery */}
      <div className="multimedia-page__gallery">
        {filteredMedia.length === 0 ? (
          <div className="multimedia-page__empty">
            <FiImage className="multimedia-page__empty-icon" />
            <p className="multimedia-page__empty-text">No hay archivos multimedia</p>
            <button className="multimedia-page__btn multimedia-page__btn--primary" onClick={() => setIsModalOpen(true)}>
              <FiUpload /> Subir archivos
            </button>
          </div>
        ) : (
          filteredMedia.map((item) => (
            <div
              key={item.id}
              className={`multimedia-page__item ${selectedFiles.has(item.id) ? "multimedia-page__item--selected" : ""}`}
            >
              {isSelectionMode && (
                <button className="multimedia-page__checkbox" onClick={() => toggleFileSelection(item.id)}>
                  {selectedFiles.has(item.id) ? <FiCheckSquare /> : <FiSquare />}
                </button>
              )}

              <div className="multimedia-page__item-preview">
                {item.type === "image" ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL_MEDIA}${item.file_url}` || "/placeholder.svg"}
                    alt={item.title}
                    className="multimedia-page__item-image"
                  />
                ) : (
                  <video
                    src={`${import.meta.env.VITE_API_URL_MEDIA}${item.file_url}`}
                    className="multimedia-page__item-video"
                    controls
                  />
                )}
              </div>

              <div className="multimedia-page__item-info">
                <p className="multimedia-page__item-name">{item.title}</p>
                <p className="multimedia-page__item-meta">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>

              {!isSelectionMode && (
                <button className="multimedia-page__item-delete" onClick={() => handleDelete(item.id)} title="Eliminar">
                  <FiTrash2 />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="multimedia-page__modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="multimedia-page__modal" onClick={(e) => e.stopPropagation()}>
            <div className="multimedia-page__modal-header">
              <h2 className="multimedia-page__modal-title">Subir archivos</h2>
              <button className="multimedia-page__modal-close" onClick={() => setIsModalOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="multimedia-page__modal-content">
              <div
                className={`multimedia-page__drop-zone ${isDragging ? "multimedia-page__drop-zone--dragging" : ""}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <FiUpload className="multimedia-page__drop-zone-icon" />
                <p className="multimedia-page__drop-zone-text">
                  Arrastra archivos aquí o haz clic para seleccionar
                </p>
                <p className="multimedia-page__drop-zone-hint">Soporta imágenes y videos</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="multimedia-page__file-input"
              />

              {previewFiles.length > 0 && (
                <div className="multimedia-page__preview">
                  <h3 className="multimedia-page__preview-title">
                    Archivos seleccionados ({previewFiles.length})
                  </h3>
                  <div className="multimedia-page__preview-grid">
                    {previewFiles.map((file, index) => (
                      <div key={index} className="multimedia-page__preview-item">
                        <button
                          className="multimedia-page__preview-remove"
                          onClick={() => removePreviewFile(index)}
                        >
                          <FiX />
                        </button>
                        {file.type === "image" ? (
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="multimedia-page__preview-image"
                          />
                        ) : (
                          <video src={file.preview} className="multimedia-page__preview-video" controls />
                        )}
                        <div className="multimedia-page__preview-info">
                          <p className="multimedia-page__preview-name">{file.name}</p>
                          <p className="multimedia-page__preview-size">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="multimedia-page__modal-footer">
              <button
                className="multimedia-page__btn multimedia-page__btn--secondary"
                onClick={() => {
                  previewFiles.forEach((f) => URL.revokeObjectURL(f.preview))
                  setPreviewFiles([])
                  setUploadedFiles([])
                  setIsModalOpen(false)
                }}
              >
                Cancelar
              </button>
              <button
                className="multimedia-page__btn multimedia-page__btn--primary"
                onClick={handleUpload}
                disabled={uploadedFiles.length === 0 || isUploading}
              >
                {isUploading ? "Subiendo..." : `Subir ${uploadedFiles.length} archivo(s)`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
