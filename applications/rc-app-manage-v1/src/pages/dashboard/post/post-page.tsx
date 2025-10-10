import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineEye } from "react-icons/hi";
import { IoPlay, IoStop } from "react-icons/io5";
import './posts.scss'
import { useDataStore, type Post } from '@/store/data.store';
import { DateTime } from '@/lib/date';
import { DeletePost, updatePublishedPost } from '@/lib/api/endpoint';
import Toast from '@/lib/toast';
import InputSearch from '@/components/ui/input-search';
import ConfirmDialog from '@/components/ui/confirm-dialog';

const PostPage: React.FC = () => {
  const host = import.meta.env.VITE_API_URL_MEDIA
  const { data, update } = useDataStore()
  const [datap, setDatap] = useState<Post[] | undefined>(data?.posts);

  // 🔹 Estados para el diálogo de confirmación
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => { }
  })

  useEffect(() => {
    setDatap(data?.posts)
  }, [data])


  // 🔹 Estado para posts filtrados
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(datap || [])

  const navigate = useNavigate()
  const location = useLocation()

  const handleEdit = (id: string) => {
    navigate(`${location.pathname}/form/${id}`)
  }

  const handleNewPost = () => {
    navigate(`${location.pathname}/form`)
  }

  const handlePublishedChange = (post: Post) => {
    const action = post.published ? "Borrador" : "Publico"

    setConfirmDialog({
      isOpen: true,
      title: `¿${action.charAt(0).toUpperCase() + action.slice(1)} artículo?`,
      message: `¿Estás seguro de que deseas colocar como ${action} este artiulo "${post.title}"?`,
      onConfirm: async () => {
        const payload = { id: post.id, published: !post.published }
        const res = await updatePublishedPost(payload)
        if (res.message) {
          Toast.success(res.message)
          update()
        }
      }
    })
  }

  const handleDelete = (post: Post) => {
    setConfirmDialog({
      isOpen: true,
      title: "¿Eliminar artículo?",
      message: `¿Estás seguro de que deseas eliminar "${post.title}"? Esta acción no se puede deshacer.`,
      onConfirm: async () => {
        const res = await DeletePost({id: post.id})
        Toast.success(res.message)
        update()
      }
    })
  }

  // ✅ Función simple para recibir los posts filtrados
  const handleFilter = (filtered: Post[]) => {
    setFilteredPosts(filtered)
  }

  return (
    <div className="post-page">
      <div className="title-page-post">
        <div className="title">
          <h1>Articulos</h1>
          <p>Gestiona tus publicaciones</p>
        </div>
        <div className="more-post">
          <button onClick={handleNewPost}><FaPlus /><span>Crear articulo</span></button>
        </div>
      </div>

      <div className="manage-post">
        <div className="title-manage-post">
          <h3>Total ({datap?.length})</h3>
          <div className="options-manage-post">
            {/* ✅ Componente de búsqueda simple */}
            <InputSearch
              data={datap || []}
              fields={["title", "description"]}
              onFilter={handleFilter}
              placeholder="Buscar artículos..."
            />
          </div>
        </div>

        <div className="container-post">
          {filteredPosts.length ? (
            filteredPosts.map((i) => (
              <div key={i.id} className="item-manage-post">
                <div
                  className="banner"
                  style={{
                    backgroundImage: `url(${host + i.cover_url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
                <div className="details-item-post">
                  <div className={`status-item-post ${i.published ? "published" : "draft"}`}>
                    {i.published ? "Publicado" : "Borrador"}
                  </div>
                  <p className="title-item-post">{i.title}</p>
                  <p className="description-item-post">{i.description ?? "Sin descripcion"}</p>
                </div>
                <div className="container-options-post">
                  <ul>
                    <li><HiOutlineEye /> <span>{i.views ?? 0}</span></li>
                    <li onClick={() => handleEdit(i.id)}><BiEdit /></li>
                    <li onClick={() => handlePublishedChange(i)}>
                      {i.published ? <IoStop /> : <IoPlay />}
                    </li>
                    <li onClick={() => handleDelete(i)}><MdDeleteOutline /></li>
                    <li className="date_created">
                      {i.updated_at ? `Actualizado ${DateTime(i.updated_at)}` : `Creado ${DateTime(i.created_at)}`}
                    </li>
                  </ul>
                </div>
              </div>
            ))
          ) : (
            <p>No hay Articulos disponibles</p>
          )}
        </div>
      </div>
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />
    </div>
  )
}

export default PostPage