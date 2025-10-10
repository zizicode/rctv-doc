// store/index.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"
import api from "../config/axios"
import { mockPost } from "../mocks/posts.mock"

export interface Post {
  id: string
  title: string
  slug: string
  body: string
  cover_url: string
  autor_id: string
  views: number | string
  published: boolean
  keywords: string[]
  description: string
  created_at: string
  updated_at?: string
}

interface DataState {
  data: Post[]
  loading: boolean
  routeLoading: boolean
  setRouteLoading: (value: boolean) => void
  setPosts: (posts: Post[]) => void
  addPost: (post: Post) => void
  clearPosts: () => void
  fetchPosts: (force?: boolean) => Promise<void>
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      data: [],
      loading: false,
      routeLoading: false,

      setRouteLoading: (value) => set({ routeLoading: value }),

      setPosts: (data) => set({ data }),

      addPost: (post) =>
        set((state) => ({
          data: [...state.data, post],
        })),

      clearPosts: () => set({ data: [] }),

      fetchPosts: async (force = false) => {
        const { data } = get()
        if (data.length > 0 && !force) return

        set({ loading: true })
        try {
          const res = await api.get("/posts")
          if (Array.isArray(res.data) && res.data.length > 0) {
            set({ data: res.data })
          } else {
            set({ data: mockPost })
          }
        } catch {
          set({ data: mockPost })
        } finally {
          set({ loading: false })
        }
      },
    }),
    { name: "posts-storage" }
  )
)
