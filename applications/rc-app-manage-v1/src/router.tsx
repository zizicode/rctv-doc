import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Login } from "@/pages/auth"
import DashboardPage from "@/pages/dashboard/page-dashboar"
import PostPage from "@/pages/dashboard/post/post-page"
import PostForm from "@/pages/dashboard/post/new-post"
import MultimediaPage from "@/pages/dashboard/multimedia/page-multimedia"
import SettingPage from "@/pages/dashboard/setting/page-setting"
import Layout from "./components/app/layout"
import { AuthRouter } from "./hook/auth-router"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <AuthRouter>
              <Layout />
            </AuthRouter>
          }
        >
          {/* Ruta index para /dashboard */}
          <Route index element={<DashboardPage />} />
          
          {/* Rutas hijas */}
          <Route path="posts" element={<PostPage />} />
          <Route path="posts/form" element={<PostForm />} />
          <Route path="posts/form/:id" element={<PostForm />} />
          <Route path="multimedia" element={<MultimediaPage />} />
          <Route path="setting" element={<SettingPage />} />
        </Route>

        {/* Cualquier ruta no encontrada */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}