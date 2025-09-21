import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Post } from "@types"

interface PostState {
  posts: Post[]
  setPosts: (posts: Post[]) => void
  addPost: (post: Post) => void
  clearPosts: () => void
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      posts: [],

      setPosts: (posts) => set({ posts }),

      addPost: (post) =>
        set((state) => ({
          posts: [...state.posts, post],
        })),

      clearPosts: () => set({ posts: [] }),
    }),
    {
      name: "posts-storage",
    }
  )
)
