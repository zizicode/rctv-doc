-- PostgreSQL database init for media_db

-- Requiere extensión para UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET row_security = off;
SET default_tablespace = '';
SET default_table_access_method = heap;

-- ========================================
-- TABLES
-- ========================================

-- USERS
CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    role text DEFAULT 'author'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    username text,
    live_url text,
    CONSTRAINT users_role_check CHECK ((role = ANY (ARRAY['admin'::text, 'editor'::text, 'author'::text]))),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
);

ALTER TABLE public.users OWNER TO rctv;

-- MEDIA
CREATE TABLE IF NOT EXISTS public.media (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    file_url text NOT NULL,
    type text NOT NULL,
    title text,
    description text,
    uploaded_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT media_type_check CHECK ((type = ANY (ARRAY['image'::text, 'video'::text]))),
    CONSTRAINT media_pkey PRIMARY KEY (id)
);

ALTER TABLE public.media OWNER TO rctv;

-- POSTS
CREATE TABLE IF NOT EXISTS public.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    body text NOT NULL,
    cover_url text,
    author_id uuid,
    views integer DEFAULT 0 NOT NULL,
    published boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    keywords text[],
    description text,
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT posts_slug_key UNIQUE (slug)
);

ALTER TABLE public.posts OWNER TO rctv;

-- ========================================
-- RELACIONES
-- ========================================
ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_uploaded_by_fkey FOREIGN KEY (uploaded_by)
    REFERENCES public.users(id) ON DELETE SET NULL;

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id)
    REFERENCES public.users(id) ON DELETE SET NULL;

-- ========================================
-- INDEXES
-- ========================================
CREATE INDEX IF NOT EXISTS idx_media_type ON public.media USING btree (type);
CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON public.media USING btree (uploaded_by);
CREATE INDEX IF NOT EXISTS idx_posts_author ON public.posts USING btree (author_id);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts USING btree (published);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts USING btree (slug);

-- ========================================
-- DATA (solo usuarios)
-- ========================================
INSERT INTO public.users (id, email, password_hash, role, created_at, updated_at, username, live_url)
VALUES (
    'e8cd4a10-cd6a-4825-9ed5-e1970cd38350',
    'admin@rodolfocordones.com',
    '$2a$10$uSDX2K5sF.a287I5/54JjeJnUl8Q.U2I8qp9Ce4sWSKvT1lnCvkFO',
    'admin',
    '2025-10-03 23:45:04.38555+00',
    '2025-10-06 17:16:57.623658+00',
    'admin',
    'https://castr.io'
)
ON CONFLICT (email) DO NOTHING;

-- ========================================
-- END
-- ========================================
