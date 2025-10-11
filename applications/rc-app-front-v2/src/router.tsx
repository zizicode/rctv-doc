import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/app/Layout";
import Home from "./pages/Home";
import PostView from "./pages/Post";
import NotFound from "./pages/NotFound";
import RouteLoading from "./components/Loading/RouteLoading";
import BlogPage from "./pages/BlogPage/blogPage";
import ContactPage from "./pages/ContactPage/ContactPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
    <RouteLoading/>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<BlogPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/post/:slug" element={<PostView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
