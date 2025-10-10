import React, { useState, useEffect } from 'react';
import { LuCloudUpload } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { IoImagesOutline } from "react-icons/io5";
import { addNewImage } from '@/lib/api/endpoint';
import { useAuthStore } from '@/store';
import { useDataStore } from '@/store/data.store';
import Toast from '@/lib/toast';

interface UpdateMediaProps {
  image?: string | null
  type?: "image" | "video" | "all"
  handleChange: (image: string) => void
}

const UpdateMedia: React.FC<UpdateMediaProps> = ({ handleChange, type = "all", image }) => {
  const userToken = useAuthStore()
  const { data } = useDataStore()
  let SAVED_IMAGES =
    type === "image" || type === "video"
      ? data?.media?.filter((item) => item.type === type)
      : data?.media
  const host = import.meta.env.VITE_API_URL_MEDIA

  const [selectedImage, setSelectedImage] = useState<string>(image || "")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"gallery" | "upload">("gallery")
  const [previewImage, setPreviewImage] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [fileToUpload, setFileToUpload] = useState<File | null>(null)

  // Si la prop image cambia desde afuera, actualizar selectedImage
  useEffect(() => {
    if (image) setSelectedImage(image)
  }, [image])

  const handleAreaClick = () => {
    setIsModalOpen(true)
    setPreviewImage("")
    setActiveTab("gallery")
  }

  const handleGallerySelect = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setIsModalOpen(false)
    handleChange(imageUrl)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileToUpload(file)

    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
    setActiveTab("upload")
  }

  const handleSaveAndUse = async () => {
    if (!fileToUpload) return
    setIsUploading(true)
    try {
      const res = await addNewImage({
        file: fileToUpload,
        title: fileToUpload.name,
        description: "Multimedia subida desde el editor",
        uploaded_by: userToken.user?.id,
      })

      if(res.message){
        Toast.success(res.message)
      }

      const imageUrl = res.media?.file_url || res.file_url
      setSelectedImage(imageUrl)
      handleChange(imageUrl)
      setIsModalOpen(false)
      setPreviewImage("")
    } catch (error) {
      console.error("Error al subir la imagen:", error)
    } finally {
      setIsUploading(false)
    }
  }

  // ... resto del código igual

  return (
    <div className="update-media">
      <div
        onClick={handleAreaClick}
        className={`update-media__drop-area ${selectedImage ? 'update-media__drop-area--has-image' : ''}`}
        style={{ backgroundImage: selectedImage ? `url(${selectedImage})` : 'none' }}
      >
        {!selectedImage && (
          <div className="update-media__placeholder">
            <LuCloudUpload className="update-media__placeholder-icon" />
            <p className="update-media__placeholder-title">Arrastra una imagen aquí</p>
            <p className="update-media__placeholder-subtitle">o haz clic para seleccionar</p>
          </div>
        )}
        {selectedImage && (
          <div className="update-media__overlay">
            <p className="update-media__overlay-text">Cambiar imagen</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="update-media__modal-backdrop">
          <div className="update-media__modal">
            {/* Header */}
            <div className="update-media__modal-header">
              <h2 className="update-media__modal-title">Seleccionar imagen</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="update-media__close-button"
              >
                <IoMdClose />
              </button>
            </div>

            {/* Tabs */}
            <div className="update-media__tabs">
              <button
                type='button'
                onClick={() => setActiveTab('gallery')}
                className={`update-media__tab ${activeTab === 'gallery' ? 'update-media__tab--active' : ''}`}
              >
                <IoImagesOutline className="update-media__tab-icon" />
                Galería
              </button>
              <button
                type='button'
                onClick={() => setActiveTab('upload')}
                className={`update-media__tab ${activeTab === 'upload' ? 'update-media__tab--active' : ''}`}
              >
                <LuCloudUpload className="update-media__tab-icon" />
                Cargar imagen
              </button>
            </div>

            {/* Content */}
            <div className="update-media__modal-content">
              {activeTab === 'gallery' && (
                <div className="update-media__gallery">
                  {SAVED_IMAGES?.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => handleGallerySelect(img.file_url)}
                      className="update-media__gallery-item"
                    >
                      <img
                        src={host+img.file_url}
                        alt={`Image ${index + 1}`}
                        className="update-media__gallery-image"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'upload' && (
                <div className="update-media__upload-section">
                  {!previewImage ? (
                    <label className="update-media__upload-label">
                      <div className="update-media__upload-area">
                        <LuCloudUpload className="update-media__upload-icon" />
                        <p className="update-media__upload-title">
                          Selecciona una imagen
                        </p>
                        <p className="update-media__upload-subtitle">
                          JPG, PNG o GIF
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="update-media__upload-input"
                      />
                    </label>
                  ) : (
                    <div className="update-media__preview">
                      <div className="update-media__preview-image-wrapper">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="update-media__preview-image"
                        />
                      </div>
                      <div className="update-media__preview-actions">
                        <button
                          onClick={() => setPreviewImage('')}
                          className="update-media__button update-media__button--secondary"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSaveAndUse}
                          disabled={isUploading}
                          className="update-media__button update-media__button--primary"
                        >
                          {isUploading ? (
                            <>
                              <div className="update-media__spinner" />
                              Guardando...
                            </>
                          ) : (
                            <>
                              <FaCheck className="update-media__button-icon" />
                              Guardar y usar
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateMedia;