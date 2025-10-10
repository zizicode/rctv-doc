// store/data.store.ts
import { updateData } from "@/lib/api/endpoint"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Post {
  id: string
  title: string
  slug: string
  body: string
  cover_url: string
  author_id: string
  views: number
  published: boolean
  created_at: string
  updated_at?: string
  keywords?: string[]
  description: string
}

export interface Media {
  id: string
  file_url: string
  type: "image" | "video"
  title: string
  description: string
  uploaded_by: string
  created_at: string
}

interface Data {
  posts: Post[]
  media: Media[]
}

export interface DataState {
  data: Data | null
  isLoading: boolean
  error: string | null
  update: (data?: Data) => Promise<void>
  clean: () => void
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      data: { posts: [], media: [] },
      isLoading: false,
      error: null,

      update: async (data) => {
        set({ isLoading: true, error: null })
        
        try {
          if (!data) {
            const response = await updateData()
            set({ 
              data: response.data,
              isLoading: false,
              error: null
            })
          } else {
            set({ 
              data,
              isLoading: false,
              error: null
            })
          }
        } catch (error) {
          console.error("Error al actualizar datos:", error)
          set({ 
            isLoading: false,
            error: error instanceof Error ? error.message : "Error desconocido"
          })
        }
      },

      clean: () => set({ 
        data: null,
        isLoading: false,
        error: null
      }),
    }),
    {
      name: "data-storage",
      partialize: (state) => ({ 
        data: state.data 
      })
    }
  )
)