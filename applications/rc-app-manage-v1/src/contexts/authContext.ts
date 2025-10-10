import { createContext } from "react"
import type { AuthState } from "@/store"

export const AuthContext = createContext<AuthState | undefined>(undefined)
