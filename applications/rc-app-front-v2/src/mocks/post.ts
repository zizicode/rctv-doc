// src/mocks/posts.ts
import { PostLast } from "@types"

export const mockPosts: PostLast[] = [
    {
        id: "1",
        category: "Política",
        timeAgo: "Hace 2 horas",
        title: "Análisis de las Nuevas Políticas Públicas: Impacto en la Sociedad Venezolana",
        description:
            "Un análisis profundo sobre las recientes medidas gubernamentales y su efecto directo en los ciudadanos. Expertos opinan sobre las implicaciones a largo plazo de estas decisiones políticas.",
        image: "https://presidencia.gob.do/sites/default/files/styles/medium/public/news/2025-03/IMG-20250308-WA0070.jpg?itok=e3kzMmYw",
    },
    {
        id: "2",
        category: "Economía",
        timeAgo: "Hace 3 horas",
        title: "El mercado cambiario y su influencia en la vida diaria",
        description:
            "La devaluación y las medidas económicas recientes están transformando la manera en que los ciudadanos manejan sus finanzas personales.",
        image: "https://isefi.es/wp-content/uploads/2013/07/economia-tipos-de-interes.jpg", // no tiene imagen
    },
    {
        id: "3",
        category: "Sociedad",
        timeAgo: "Hace 5 horas",
        title: "El impacto social de la migración en comunidades locales",
        description:
            "Las migraciones internas y externas están reconfigurando la demografía del país. Este análisis aborda cómo afecta a la cohesión social y las oportunidades.",
        image: "https://www.ieie.eu/wp-content/uploads/2024/10/la-sociedad-liquida-ieie.jpg",
    },
]


export const mockOtherPosts: PostLast[] = [
    // --- Política Nacional ---
    {
      id: "1",
      category: "Política Nacional",
      author: "Redacción",
      timeAgo: "Hace 2 horas",
      title: "Análisis de las Nuevas Políticas Públicas",
      description:
        "Un análisis profundo sobre las recientes medidas gubernamentales y su efecto directo en los ciudadanos. Expertos opinan sobre las implicaciones a largo plazo de estas decisiones políticas, que podrían transformar sectores clave como la economía y la educación.",
      image: "",
    },
    {
      id: "2",
      category: "Política Nacional",
      author: "Redacción",
      timeAgo: "Hace 4 horas",
      title: "Debate Parlamentario sobre Presupuesto 2024",
      description:
        "Diputados analizan la propuesta presupuestaria para el próximo año fiscal. El proyecto plantea un incremento en el gasto social, acompañado de ajustes en la recaudación tributaria que han generado debates intensos dentro del Congreso.",
      image: "",
    },
    {
      id: "3",
      category: "Política Nacional",
      author: "Ana Torres",
      timeAgo: "Hace 7 horas",
      title: "Reformas Constitucionales en Discusión",
      description:
        "La Asamblea Nacional inició las sesiones para debatir posibles reformas constitucionales. Entre los puntos más destacados se encuentra la ampliación de los derechos ciudadanos y cambios en la estructura de poderes públicos.",
      image: "",
    },
  
    // --- Sociedad ---
    {
      id: "4",
      category: "Sociedad",
      author: "María González",
      timeAgo: "Hace 3 horas",
      title: "Programas Sociales Benefician a Miles de Familias",
      description:
        "Nuevas iniciativas gubernamentales llegan a comunidades vulnerables, ofreciendo apoyo en áreas de salud, alimentación y vivienda. Líderes comunitarios destacan la importancia de estas políticas para mejorar la calidad de vida.",
      image: "",
    },
    {
      id: "5",
      category: "Sociedad",
      author: "Jorge Ramírez",
      timeAgo: "Hace 6 horas",
      title: "Crecen las Iniciativas de Voluntariado Juvenil",
      description:
        "Miles de jóvenes en todo el país se suman a programas de voluntariado que buscan atender problemáticas sociales como la alfabetización, la salud preventiva y el cuidado del medio ambiente.",
      image: "",
    },
    {
      id: "6",
      category: "Sociedad",
      author: "Laura Fernández",
      timeAgo: "Hace 9 horas",
      title: "Aumento en el Acceso a la Educación Superior",
      description:
        "Universidades públicas y privadas reportan un crecimiento significativo en la matrícula estudiantil. Expertos señalan que el acceso a becas y programas de apoyo económico han sido determinantes en este avance.",
      image: "",
    },
  
    // --- Internacional ---
    {
      id: "7",
      category: "Internacional",
      author: "Carlos Mendez",
      timeAgo: "Hace 5 horas",
      title: "Relaciones Diplomáticas se Fortalecen en la Región",
      description:
        "Cancilleres de varios países se reúnen para discutir temas de cooperación en materia de comercio, seguridad y medio ambiente. El encuentro busca consolidar alianzas estratégicas a largo plazo.",
      image: "",
    },
    {
      id: "8",
      category: "Internacional",
      author: "Isabel Rojas",
      timeAgo: "Hace 8 horas",
      title: "Cumbre Económica Internacional 2024",
      description:
        "Líderes de las principales economías del mundo se congregan para debatir sobre los retos financieros globales, incluyendo la inflación, el comercio internacional y el cambio climático.",
      image: "",
    },
    {
      id: "9",
      category: "Internacional",
      author: "Agencias",
      timeAgo: "Hace 10 horas",
      title: "Avances en los Acuerdos de Paz",
      description:
        "Delegaciones internacionales informan progresos en las negociaciones de paz en zonas de conflicto. La mediación de organismos multilaterales ha permitido acercar posiciones entre las partes involucradas.",
      image: "",
    },
  ]