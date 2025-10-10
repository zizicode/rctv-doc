--
-- PostgreSQL database dump
--

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 17.1

-- Started on 2025-10-06 14:30:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16416)
-- Name: media; Type: TABLE; Schema: public; Owner: rctv
--

CREATE TABLE public.media (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    file_url text NOT NULL,
    type text NOT NULL,
    title text,
    description text,
    uploaded_by uuid,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT media_type_check CHECK ((type = ANY (ARRAY['image'::text, 'video'::text])))
);


ALTER TABLE public.media OWNER TO rctv;

--
-- TOC entry 215 (class 1259 OID 16398)
-- Name: posts; Type: TABLE; Schema: public; Owner: rctv
--

CREATE TABLE public.posts (
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
    description text
);


ALTER TABLE public.posts OWNER TO rctv;

--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 215
-- Name: COLUMN posts.keywords; Type: COMMENT; Schema: public; Owner: rctv
--

COMMENT ON COLUMN public.posts.keywords IS 'Palabras clave';


--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 215
-- Name: COLUMN posts.description; Type: COMMENT; Schema: public; Owner: rctv
--

COMMENT ON COLUMN public.posts.description IS 'Descripcion del articulo para seo';


--
-- TOC entry 214 (class 1259 OID 16385)
-- Name: users; Type: TABLE; Schema: public; Owner: rctv
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    role text DEFAULT 'author'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    username text,
    live_url text,
    CONSTRAINT users_role_check CHECK ((role = ANY (ARRAY['admin'::text, 'editor'::text, 'author'::text])))
);


ALTER TABLE public.users OWNER TO rctv;

--
-- TOC entry 3442 (class 0 OID 16416)
-- Dependencies: 216
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: rctv
--

COPY public.media (id, file_url, type, title, description, uploaded_by, created_at) FROM stdin;
3005091b-1c62-41c3-8b78-7998fe15f60e	/media/1759541841093-521449649.jpg	image	wpp.jpg	Multimedia subida desde el editor	e8cd4a10-cd6a-4825-9ed5-e1970cd38350	2025-10-04 01:37:21.172034+00
99d0fd90-420d-4652-9743-4061156f86d9	/media/1759608804795-433041160.jpg	image	background-auth.jpg	Multimedia subida desde el editor	e8cd4a10-cd6a-4825-9ed5-e1970cd38350	2025-10-04 20:13:24.994291+00
\.


--
-- TOC entry 3441 (class 0 OID 16398)
-- Dependencies: 215
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: rctv
--

COPY public.posts (id, title, slug, body, cover_url, author_id, views, published, created_at, updated_at, keywords, description) FROM stdin;
e0310914-4bad-4a11-a60a-2d8be7b5b694	Especial de laptop a nivel nacional por el dia de la informaticas	especial-de-laptop-a-nivel-nacional-por-el-dia-de-la-informaticas	<p>Muy bien!</p>	/media/1759608804795-433041160.jpg	e8cd4a10-cd6a-4825-9ed5-e1970cd38350	0	t	2025-10-05 02:15:31.310497+00	2025-10-06 05:16:05.36596+00	{laptop,economia,politica}	Mas que un premio es un regalo por parte de nuestro equipo
d923008f-e1ae-4944-9646-310f9fbcae3e	Los primeros inicios de nuestro padre de la patrias	los-primeros-inicios-de-nuestro-padre-de-la-patrias	<p><em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus itaque officiis nesciunt recusandae dolores quos, deleniti minima voluptates laudantium quibusdam.</em></p>	/media/1759541841093-521449649.jpg	e8cd4a10-cd6a-4825-9ed5-e1970cd38350	0	t	2025-10-04 01:38:19.131524+00	2025-10-06 05:16:16.713634+00	{hola,adios,espero,que,esten,bien,espero}	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus itaque officiis nesciunt recusandae dolores quos, deleniti minima voluptates laudantium quibusdam.
\.


--
-- TOC entry 3440 (class 0 OID 16385)
-- Dependencies: 214
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: rctv
--

COPY public.users (id, email, password_hash, role, created_at, updated_at, username, live_url) FROM stdin;
e8cd4a10-cd6a-4825-9ed5-e1970cd38350	dev@gmail.com	$2a$10$uSDX2K5sF.a287I5/54JjeJnUl8Q.U2I8qp9Ce4sWSKvT1lnCvkFO	admin	2025-10-03 23:45:04.38555+00	2025-10-06 17:16:57.623658+00	dev	https://castr.io
\.


--
-- TOC entry 3295 (class 2606 OID 16425)
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: rctv
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- TOC entry 3289 (class 2606 OID 16408)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: rctv
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 3291 (class 2606 OID 16410)
-- Name: posts posts_slug_key; Type: CONSTRAINT; Schema: public; Owner: rctv
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_slug_key UNIQUE (slug);


--
-- TOC entry 3282 (class 2606 OID 16397)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: rctv
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3284 (class 2606 OID 16395)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: rctv
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3292 (class 1259 OID 16434)
-- Name: idx_media_type; Type: INDEX; Schema: public; Owner: rctv
--

CREATE INDEX idx_media_type ON public.media USING btree (type);


--
-- TOC entry 3293 (class 1259 OID 16435)
-- Name: idx_media_uploaded_by; Type: INDEX; Schema: public; Owner: rctv
--

CREATE INDEX idx_media_uploaded_by ON public.media USING btree (uploaded_by);


--
-- TOC entry 3285 (class 1259 OID 16432)
-- Name: idx_posts_author; Type: INDEX; Schema: public; Owner: rctv
--

CREATE INDEX idx_posts_author ON public.posts USING btree (author_id);


--
-- TOC entry 3286 (class 1259 OID 16433)
-- Name: idx_posts_published; Type: INDEX; Schema: public; Owner: rctv
--

CREATE INDEX idx_posts_published ON public.posts USING btree (published);


--
-- TOC entry 3287 (class 1259 OID 16431)
-- Name: idx_posts_slug; Type: INDEX; Schema: public; Owner: rctv
--

CREATE INDEX idx_posts_slug ON public.posts USING btree (slug);


--
-- TOC entry 3297 (class 2606 OID 16426)
-- Name: media media_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rctv
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 3296 (class 2606 OID 16411)
-- Name: posts posts_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rctv
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;


-- Completed on 2025-10-06 14:30:48

--
-- PostgreSQL database dump complete
--

