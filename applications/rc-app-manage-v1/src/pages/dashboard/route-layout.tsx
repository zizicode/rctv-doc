// pages/dashboard/route-layout.tsx
import React from 'react'
import Layout from '@/components/app/layout'
import { Routes, Route } from 'react-router-dom'
import PostPage from './post/post-page'
import PostForm from './post/new-post'
import DashboardPage from './page-dashboar'

const RouterLayout: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {/* Rutas relativas sin / inicial */}
        <Route index element={<DashboardPage />} />
        <Route path="posts" element={<PostPage />} />
        <Route path="posts/form" element={<PostForm />} />
        <Route path="posts/form/:id" element={<PostForm />} />
      </Routes>
    </Layout>
  )
}

export default RouterLayout