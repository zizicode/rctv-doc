export interface User {
    id?: string;
    username: string
    email: string,
    rol: "author" | "admin",
    live_url: string
}