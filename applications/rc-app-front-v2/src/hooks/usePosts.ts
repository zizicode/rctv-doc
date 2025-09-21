import { useEffect, useState } from "react"
import { supabase } from "@lib/supabase"
import { usePostStore } from "@store/posts.store"
import { Post } from "@types"

export function usePosts() {
  const { posts, setPosts } = usePostStore()
  const [loading, setLoading] = useState(posts.length === 0) // si ya hay posts cacheados, no cargar
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (posts.length > 0) return // ya tenemos posts en cache

    async function fetchPosts() {
      setLoading(true)
      const { data, error } = await supabase.from("posts").select("*")
      if (error) {
        setError(error.message)
      } else if (data) {
        setPosts(data as Post[])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [posts, setPosts])

  return { posts, loading, error }
}
