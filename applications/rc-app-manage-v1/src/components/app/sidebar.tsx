import React from "react"
import { Link } from "react-router-dom"
import { TbLayoutDashboard } from "react-icons/tb";
import { BsPostcard } from "react-icons/bs";
import { GrGallery } from "react-icons/gr";
import { VscSettingsGear } from "react-icons/vsc";

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay en mobile */}
      {open && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <h2>Blog Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link to={"/dashboard"}>
                <TbLayoutDashboard /><span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/posts"}>
                <BsPostcard /><span>Posts</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/multimedia"}>
                <GrGallery /><span>Multimedia</span>
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/setting"}>
                <VscSettingsGear /><span>Configuracion</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="footer-sidebar">
          <p>rc-app-manage-v0.0.0</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
