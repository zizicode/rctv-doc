// auth.store.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "../types"

export interface AuthState {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem("token");
        if(!localStorage.getItem("token")){
          set({ user: null })
          return
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
)
