export interface Media {
    id: string,
    file_url: string,
    type: "image" | "video", 
    title: string,
    description: string,
    uploaded_by: string,
    created_at: string
}