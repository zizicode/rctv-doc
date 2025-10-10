// route-layout.tsx
import React from 'react'
import Layout from '@/components/app/layout'
import { Route, Routes } from 'react-router-dom'
import PostPage from './post/post-page'
import PostForm from './post/new-post'
import DashboardPage from './page-dashboar'

const RouterLayout: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="posts" element={<PostPage />} />
        <Route path="posts/form" element={<PostForm />} />
        <Route path="posts/form/:id" element={<PostForm />} />
      </Route>
    </Routes>
  )
}

export default RouterLayout
