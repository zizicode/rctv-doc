import { useState, useEffect } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { FaTimes } from "react-icons/fa"
import { FaRegCheckCircle } from "react-icons/fa"
import { FaRegSquarePlus } from "react-icons/fa6"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { slugify } from "@/utils/slugify"

import { RichTextEditor } from "@/lib/tiptap"
import UpdateMedia from "@/components/ui/update-media"
import { useAuthStore } from "@/store"
import { useDataStore } from "@/store/data.store"
import { addNewPost, DeletePost, updatePost } from "@/lib/api/endpoint"
import { useParams, useNavigate } from "react-router-dom"
import ConfirmDialog from '@/components/ui/confirm-dialog'
import { IoArrowBackOutline } from "react-icons/io5";
import Toast from "@/lib/toast"

export interface DataPostForm {
    id?: string
    title: string
    slug: string
    body: string
    description: string
    cover_url: string
    keywords: string[]
    published: boolean
    author_id: string
}

export default function PostForm() {
    const host = import.meta.env.VITE_API_URL_MEDIA
    const { data, update } = useDataStore()
    const { user } = useAuthStore()
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [slugT, setSlugT] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [keywords, setKeywords] = useState<string[]>([])
    const [inputKeyword, setInputKeyword] = useState<string>("")
    const [imageUtil, setImageUtil] = useState<string | null>(null)
    const [mode, setMode] = useState<"create" | "edit">("create")
    const [isReady, setIsReady] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // 🔹 Estados para el diálogo de confirmación
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: () => { }
    })

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Escribe el contenido aquí...",
                emptyEditorClass: "is-editor-empty",
            }),
        ],
        content: "",
        editorProps: { attributes: { class: "focus:outline-none" } },
    })

    // Cargar datos del post si existe ID
    useEffect(() => {
        if (!id || !data?.posts || !editor) return

        const item = data.posts.find((p) => p.id === id)
        if (!item) {
            // Si no existe el post, redirigir a la lista
            navigate('/dashboard/posts', { replace: true })
            return
        }

        setMode("edit")
        setTitle(item.title)
        setSlugT(item.slug)
        setDescription(item.description || "")
        setKeywords(item.keywords || [])
        setImageUtil(item.cover_url || "")
        editor.commands.setContent(item.body || "<p></p>")
        setIsReady(true)
    }, [id, data, editor, navigate])

    // Preparar editor en modo "crear"
    useEffect(() => {
        if (!id && editor) {
            editor.commands.setContent("<p></p>")
            setIsReady(true)
        }
    }, [id, editor])

    const handleImage = (image: string) => setImageUtil(image)

    const handleAddKeyword = () => {
        if (!inputKeyword.trim()) return
        const newKeywords = inputKeyword
            .split(",")
            .map((kw) => kw.trim())
            .filter((kw) => kw.length > 0 && !keywords.includes(kw))
        setKeywords((prev) => [...prev, ...newKeywords])
        setInputKeyword("")
    }

    const handleRemoveKeyword = (index: number) => {
        setKeywords((prev) => prev.filter((_, i) => i !== index))
    }

    const handleCancel = () => {
        // ✅ Navegar de vuelta a posts (ruta relativa o absoluta)
        navigate('/dashboard/posts')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editor || isSubmitting) return

        const htmlContent = editor.getHTML()
        if (htmlContent === "<p></p>" || htmlContent === "") {
            alert("Por favor escribe algo antes de publicar")
            return
        }

        if (!title.trim()) {
            alert("Por favor escribe un título")
            return
        }

        setIsSubmitting(true)

        const dataPost: DataPostForm = {
            title,
            slug: slugT,
            body: htmlContent,
            description,
            cover_url: imageUtil || "",
            keywords,
            published: false, // Siempre como borrador inicial
            author_id: user?.id || "",
        }

        try {
            if (mode === "edit" && id) {
                const result = await updatePost({ id, ...dataPost })
                Toast.success(result.message)
                await update()
                navigate('/dashboard/posts', { replace: true })
            } else {
                const result = await addNewPost(dataPost)
                Toast.success(result.message)
                await update()
                navigate('/dashboard/posts', { replace: true })
            }
        } catch (error) {
            console.error("Error al guardar:", error)
            alert("Hubo un error al guardar el artículo")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = () => {
        if (!id) return

        setConfirmDialog({
            isOpen: true,
            title: "¿Eliminar artículo?",
            message: `¿Estás seguro de que deseas eliminar "${title}"? Esta acción no se puede deshacer.`,
            onConfirm: async () => {
                try {
                    const result = await DeletePost({ id })

                    if (result) {
                        Toast.success(result.message)
                        await update()
                        navigate('/dashboard/posts', { replace: true })
                    }
                } catch (error) {
                    console.error("Error al eliminar:", error)
                    Toast.error("Hubo un error al eliminar el artículo")
                }
            }
        })
    }

    return (
        <>
            <div className="post-form-container">
                <div className="title-page-post">
                    <div className="title">
                        <h1>
                            <button onClick={handleCancel}><IoArrowBackOutline /></button>
                            {mode === "create" ? "Crear Nuevo Artículo" : `Editar Artículo`}
                        </h1>
                    </div>
                    <div className="more-post">
                        {mode === "edit" && (
                            <button type="button" onClick={handleDelete} className="btn-delete">
                                <AiOutlineDelete />
                                <span>Eliminar Artículo</span>
                            </button>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="form-post">
                    <label htmlFor="urlBanner-image">
                        <p>Portada del blog</p>
                        <UpdateMedia
                            image={imageUtil ? host + imageUtil : null}
                            handleChange={handleImage}
                        />
                    </label>

                    <label htmlFor="postTitle" className="input-form">
                        <p>Título *</p>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setSlugT(slugify(e.target.value))
                            }}
                            placeholder="Ej: Día mundial..."
                            id="postTitle"
                            required
                        />
                        {slugT && <span className="title-slug">slug: {slugT}</span>}
                    </label>

                    <label htmlFor="postDescription" className="input-form">
                        <p>Descripción</p>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Breve descripción del artículo..."
                            id="postDescription"
                            rows={3}
                        />
                    </label>

                    {isReady && <RichTextEditor editor={editor} />}

                    <div className="keywords_container">
                        <p>Palabras clave</p>
                        <label htmlFor="keywords">
                            <input
                                type="text"
                                value={inputKeyword}
                                onChange={(e) => setInputKeyword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleAddKeyword()
                                    }
                                }}
                                id="keywords"
                                placeholder="Economía, Noticia, Tec..."
                                className="keywords_input"
                            />
                            <button
                                type="button"
                                onClick={handleAddKeyword}
                                className="add_keywords"
                            >
                                <FaRegSquarePlus />
                                <span>Agregar</span>
                            </button>
                        </label>

                        {keywords.length > 0 && (
                            <div className="keywords_content">
                                {keywords.map((k, index) => (
                                    <span key={index}>
                                        {k}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveKeyword(index)}
                                            aria-label={`Eliminar ${k}`}
                                        >
                                            <FaTimes />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-submit"
                        >
                            <FaRegCheckCircle />
                            <span>
                                {isSubmitting
                                    ? "Guardando..."
                                    : mode === "create"
                                        ? "Crear artículo"
                                        : "Actualizar artículo"
                                }
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmDialog.onConfirm}
                title={confirmDialog.title}
                message={confirmDialog.message}
            />
        </>
    )
}