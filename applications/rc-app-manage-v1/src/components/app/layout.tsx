import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./header"
import Sidebar from "./sidebar"
import './app.scss'

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="dashboard-layout">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Body */}
      <div className="dashboard-body">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout