import CardDetails from '@/components/ui/card-detail'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './dashboard.scss';
import { TbPageBreak } from "react-icons/tb";
import { MdOutlineImage } from "react-icons/md";
import { IoMdTrendingUp } from "react-icons/io";
import { TbHandClick } from "react-icons/tb";

// store
import { useDataStore } from '@/store/data.store';


const DashboardPaga: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const {data} = useDataStore();
  let total_posts = data?.posts.length || 0;
  let total_view_post = data?.posts.reduce((acc, post) => acc + post.views, 0);
  
  let total_media = data?.media.length || 0;

  const dataDetail = [
    {
      title: "Total vistas",
      value: total_view_post || 0,
      label: "Visualizaciones",
      icon: <TbHandClick />
    },
    {
      title: "Total Posts",
      value: total_posts,
      label: "Artículos",
      icon: <TbPageBreak />
    },
    {
      title: "Archivos Multimedia",
      value: total_media,
      label: "Imágenes y archivos",
      icon: <MdOutlineImage />
    },
    {
      title: "Actividad",
      value: "100%",
      label: "Sistema operativo",
      icon: <IoMdTrendingUp />
    },
  ]
  return (
    <div className='dashboard-page'>
        <h1>Dashboard</h1>
        <p>Resumen general del blog y estadísticas</p>

        <div className="access-speed">
          <h4>Accesos Rápidos</h4>

          <div className="buttons_access-speed">
            <button onClick={() => navigate(`${location.pathname}/posts/form`)}><TbPageBreak/><span>Crear nuevo post</span></button>
            <button onClick={() => navigate(`${location.pathname}/multimedia`)}><MdOutlineImage/><span>Subir imagen o video</span></button>
          </div>
        </div>

        <div className="container-details-dashboard">
          {
            dataDetail.map((item, idx) => (
              <CardDetails key={idx} title={item.title} label={item.label} value={item.value} icon={item.icon && item.icon}/>
            ))
          }
        </div>
    </div>
  )
}

export default DashboardPaga