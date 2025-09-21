import { useParams } from "react-router-dom"
import { usePosts } from "@hooks/usePosts"

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { posts } = usePosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <p>Post no encontrado</p>

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
