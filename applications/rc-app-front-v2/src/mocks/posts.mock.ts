interface Post {
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

export const mockPost: Post[] = [
  {
    id: "b7f8c2d1-12ab-4c93-9f77-81a2d4b91f21",
    title: "El impacto de la Luna Llena en nuestras emociones",
    slug: "impacto-luna-llena-emociones",
    body: `
      <h2>La energía de la Luna Llena</h2>
      <p>Durante la <strong>Luna Llena</strong>, nuestras emociones tienden a amplificarse. 
      Es un momento ideal para <em>reflexionar</em> sobre los logros y liberar aquello que ya no necesitamos.</p>
  
      <h3>Cómo aprovechar esta fase</h3>
      <ul>
        <li>Medita y suelta lo que te pesa.</li>
        <li>Escribe tus intenciones en un cuaderno.</li>
        <li>Rodéate de personas con buena energía.</li>
      </ul>
  
      <p>Recuerda: cada Luna Llena nos invita a cerrar ciclos y <strong>renacer emocionalmente</strong>.</p>
    `,
    cover_url: "/media/luna-llena.jpg",
    autor_id: "f13a2b5c-9d10-45e4-8a22-cf62a0b6319b",
    views: 1523,
    published: true,
    keywords: ["luna llena", "astrología", "energía emocional", "rituales"],
    description: "Descubre cómo la Luna Llena influye en tus emociones y cómo aprovechar su energía para crecer.",
    created_at: "2025-10-01T15:34:00.000Z",
    updated_at: "2025-10-03T09:21:00.000Z",
  }
] 
  