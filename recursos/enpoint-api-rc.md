================================================================================
                    BLOG API - DOCUMENTACIÓN DE ENDPOINTS
================================================================================

Base URL: http://localhost:3000/api

================================================================================
🔐 MÓDULO DE AUTENTICACIÓN (/auth)
================================================================================

1. Registro de Usuario
   POST /api/auth/register
   Auth: No
   Body: {
     "email": "usuario@example.com",
     "password": "password123",
     "role": "author"  // Opcional: admin, editor, author (default: author)
   }
   Respuesta: {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "id": 1,
       "email": "usuario@example.com",
       "role": "author"
     }
   }

2. Iniciar Sesión
   POST /api/auth/login
   Auth: No
   Body: {
     "email": "usuario@example.com",
     "password": "password123"
   }
   Respuesta: {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "id": 1,
       "email": "usuario@example.com",
       "role": "author"
     }
   }

3. Obtener Perfil
   GET /api/auth/profile
   Auth: Sí (Bearer Token)
   Headers: {
     "Authorization": "Bearer <token>"
   }
   Respuesta: {
     "id": 1,
     "email": "usuario@example.com",
     "role": "author",
     "created_at": "2025-01-15T10:30:00.000Z"
   }

================================================================================
👥 MÓDULO DE USUARIOS (/users)
================================================================================

NOTA: Todos los endpoints de usuarios requieren autenticación y rol de ADMIN

4. Listar Todos los Usuarios
   GET /api/users
   Auth: Sí (Admin)
   Headers: {
     "Authorization": "Bearer <token>"
   }
   Respuesta: [
     {
       "id": 1,
       "email": "admin@example.com",
       "role": "admin",
       "created_at": "2025-01-15T10:30:00.000Z"
     },
     ...
   ]

5. Obtener Usuario por ID
   GET /api/users/:id
   Auth: Sí (Admin)
   Headers: {
     "Authorization": "Bearer <token>"
   }
   Ejemplo: GET /api/users/1
   Respuesta: {
     "id": 1,
     "email": "admin@example.com",
     "role": "admin",
     "created_at": "2025-01-15T10:30:00.000Z"
   }

6. Actualizar Usuario
   PUT /api/users/:id
   Auth: Sí (Admin)
   Headers: {
     "Authorization": "Bearer <token>"
   }
   Body: {
     "email": "nuevo@example.com",  // Opcional
     "role": "editor"                // Opcional
   }
   Ejemplo: PUT /api/users/1
   Respuesta: {
     "id": 1,
     "email": "nuevo@example.com",
     "role": "editor",
     "updated_at": "2025-01-15T11:00:00.000Z"
   }

7. Eliminar Usuario
   DELETE /api/users/:id
   Auth: Sí (Admin)
   Headers: {
     "Authorization": "Bearer <token>"
   }
   Ejemplo: DELETE /api/users/1
   Respuesta: {
     "message": "Usuario eliminado exitosamente"
   }

================================================================================
📝 MÓDULO DE POSTS (/posts)
================================================================================

RUTAS PÚBLICAS (Sin autenticación):

8. Listar Todos los Posts
   GET /api/posts
   Auth: No
   Query Params: ?published=true (opcional, filtra posts publicados)
   Respuesta: [
     {
       "id": 1,
       "title": "Mi Primer Post",
       "slug": "mi-primer-post",
       "body": "Contenido del post...",
       "cover_url": "http://localhost:3000/media/imagen.jpg",
       "author_id": 1,
       "views": 150,
       "published": true,
       "created_at": "2025-01-15T10:30:00.000Z",
       "updated_at": "2025-01-15T10:30:00.000Z"
     },
     ...
   ]

9. Obtener Post por ID
   GET /api/posts/:id
   Auth: No
   Ejemplo: GET /api/posts/1
   Respuesta: {
     "id": 1,
     "title": "Mi Primer Post",
     "slug": "mi-primer-post",
     "body": "Contenido del post...",
     "cover_url": "http://localhost:3000/media/imagen.jpg",
     "author_id": 1,
     "author_email": "autor@example.com",
     "views": 151,
     "published": true,
     "created_at": "2025-01-15T10:30:00.000Z"
   }

10. Obtener Post por Slug
    GET /api/posts/slug/:slug
    Auth: No
    Ejemplo: GET /api/posts/slug/mi-primer-post
    Respuesta: {
      "id": 1,
      "title": "Mi Primer Post",
      "slug": "mi-primer-post",
      "body": "Contenido del post...",
      "views": 152,
      "published": true
    }

RUTAS PROTEGIDAS (Requieren autenticación):

11. Crear Nuevo Post
    POST /api/posts
    Auth: Sí (Bearer Token)
    Headers: {
      "Authorization": "Bearer <token>"
    }
    Body: {
      "title": "Título del Post",
      "slug": "titulo-del-post",
      "body": "Contenido completo del post...",
      "cover_url": "http://localhost:3000/media/imagen.jpg",  // Opcional
      "published": true  // Opcional (default: false)
    }
    Respuesta: {
      "id": 2,
      "title": "Título del Post",
      "slug": "titulo-del-post",
      "body": "Contenido completo del post...",
      "author_id": 1,
      "views": 0,
      "published": true,
      "created_at": "2025-01-15T12:00:00.000Z"
    }

12. Actualizar Post
    PUT /api/posts/:id
    Auth: Sí (Bearer Token)
    Headers: {
      "Authorization": "Bearer <token>"
    }
    Body: {
      "title": "Título Actualizado",      // Opcional
      "slug": "titulo-actualizado",        // Opcional
      "body": "Contenido actualizado...",  // Opcional
      "cover_url": "nueva-imagen.jpg",     // Opcional
      "published": false                   // Opcional
    }
    Ejemplo: PUT /api/posts/1
    Respuesta: {
      "id": 1,
      "title": "Título Actualizado",
      "slug": "titulo-actualizado",
      "updated_at": "2025-01-15T13:00:00.000Z"
    }

13. Eliminar Post
    DELETE /api/posts/:id
    Auth: Sí (Bearer Token)
    Headers: {
      "Authorization": "Bearer <token>"
    }
    Ejemplo: DELETE /api/posts/1
    Respuesta: {
      "message": "Post eliminado exitosamente"
    }

================================================================================
🖼️ MÓDULO DE MEDIA (/media)
================================================================================

RUTAS PÚBLICAS (Sin autenticación):

14. Listar Todos los Archivos
    GET /api/media
    Auth: No
    Respuesta: [
      {
        "id": 1,
        "file_url": "http://localhost:3000/media/imagen-1234567890.jpg",
        "type": "image",
        "title": "Mi Imagen",
        "description": "Descripción de la imagen",
        "uploaded_by": 1,
        "uploader_email": "usuario@example.com",
        "created_at": "2025-01-15T10:30:00.000Z"
      },
      ...
    ]

15. Obtener Archivo por ID
    GET /api/media/:id
    Auth: No
    Ejemplo: GET /api/media/1
    Respuesta: {
      "id": 1,
      "file_url": "http://localhost:3000/media/imagen-1234567890.jpg",
      "type": "image",
      "title": "Mi Imagen",
      "description": "Descripción de la imagen",
      "uploaded_by": 1,
      "uploader_email": "usuario@example.com",
      "created_at": "2025-01-15T10:30:00.000Z"
    }

RUTAS PROTEGIDAS (Requieren autenticación):

16. Subir Archivo
    POST /api/media
    Auth: Sí (Bearer Token)
    Headers: {
      "Authorization": "Bearer <token>",
      "Content-Type": "multipart/form-data"
    }
    Body (FormData): {
      "file": [archivo],                    // Requerido
      "title": "Título del archivo",        // Opcional
      "description": "Descripción del archivo"  // Opcional
    }
    Tipos permitidos: jpg, jpeg, png, gif, mp4, avi, mov
    Tamaño máximo: 50MB
    Respuesta: {
      "id": 2,
      "file_url": "http://localhost:3000/media/video-1234567890.mp4",
      "type": "video",
      "title": "Mi Video",
      "description": "Descripción del video",
      "uploaded_by": 1,
      "created_at": "2025-01-15T14:00:00.000Z"
    }

17. Actualizar Metadata de Archivo
    PUT /api/media/:id
    Auth: Sí (Bearer Token)
    Headers: {
      "Authorization": "Bearer <token>"
    }
    Body: {
      "title": "Nuevo Título",              // Opcional
      "description": "Nueva Descripción"    // Opcional
    }
    Ejemplo: PUT /api/media/1
    Respuesta: {
      "id": 1,
      "title": "Nuevo Título",
      "description": "Nueva Descripción",
      "updated_at": "2025-01-15T15:00:00.000Z"
    }

18. Eliminar Archivo
    DELETE /api/media/:id
    Auth: Sí (Bearer Token)
    Headers: {
      "Authorization": "Bearer <token>"
    }
    Ejemplo: DELETE /api/media/1
    Respuesta: {
      "message": "Archivo eliminado exitosamente"
    }

================================================================================
📁 ARCHIVOS ESTÁTICOS
================================================================================

19. Servir Archivos Multimedia
    GET /media/:filename
    Auth: No
    Ejemplo: GET http://localhost:3000/media/imagen-1234567890.jpg
    Respuesta: Archivo binario (imagen o video)

================================================================================
🔑 AUTENTICACIÓN
================================================================================

Para usar endpoints protegidos, incluye el token JWT en el header:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Ejemplo con cURL:
curl -H "Authorization: Bearer <tu_token>" http://localhost:3000/api/posts

Ejemplo con JavaScript (fetch):
fetch('http://localhost:3000/api/posts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'Mi Post', slug: 'mi-post', body: 'Contenido...' })
})

================================================================================
📊 ROLES Y PERMISOS
================================================================================

- admin: Acceso completo a todos los endpoints
- editor: Puede crear, editar y eliminar posts y media
- author: Puede crear posts y subir media (solo editar/eliminar los propios)

================================================================================
❌ CÓDIGOS DE ERROR COMUNES
================================================================================

400 - Bad Request: Datos inválidos o faltantes
401 - Unauthorized: Token inválido o faltante
403 - Forbidden: No tienes permisos para esta acción
404 - Not Found: Recurso no encontrado
500 - Internal Server Error: Error del servidor

================================================================================
