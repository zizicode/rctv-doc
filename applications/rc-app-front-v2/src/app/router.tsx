import { Routes, Route } from "react-router-dom"
import Home from "@pages/Home"
import PostDetail from "@pages/Post"
import RootLayout from "./layout"

export default function AppRouter() {
  return (
    <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          {/* Ruta 404 */}
          <Route path="*" element={<p>Página no encontrada</p>} />
        </Routes>
    </RootLayout>
  )
}
