/**
 * Configuración de metadatos SEO básicos
 * Usaremos react-helmet-async para client-side
 */

export const defaultMetaTags = {
    title: 'Mi Blog - Contenido de Calidad',
    description: 'Blog con artículos sobre tecnología, desarrollo web y SEO',
    keywords: 'blog, tecnología, desarrollo, seo',
    author: 'Rodolfo Cordones',
    ogType: 'website',
    twitterCard: 'summary_large_image',
  }
  
  /**
   * Función para generar metadatos de un artículo específico
   */
  export const generatePostMetaTags = (post:any) => {
    return {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      keywords: post.tags?.join(', ') || '',
      ogImage: post.coverImage,
      ogType: 'article',
      article: {
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [post.author],
        tags: post.tags || [],
      },
    }
  }
  
  /**
   * Configuración de headers HTTP para mejorar SEO y seguridad
   * Estos se configuran en el servidor backend, pero documentamos aquí
   */
  export const securityHeaders = {
    // 'X-Content-Type-Options': 'nosniff',
    // 'X-Frame-Options': 'SAMEORIGIN',
    // 'X-XSS-Protection': '1; mode=block',
    // 'Referrer-Policy': 'strict-origin-when-cross-origin',
    // 'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    // 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  }
  
  export default {
    defaultMetaTags,
    generatePostMetaTags,
    securityHeaders,
  }