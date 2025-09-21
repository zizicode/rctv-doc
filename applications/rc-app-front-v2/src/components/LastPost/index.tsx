// src/components/LastPost.tsx
import React from "react"
import "./LastPost.scss"
import { mockPosts } from "@mocks/post"
import { MdImageNotSupported } from "react-icons/md"
import { TbCalendarClock } from "react-icons/tb";

const LastPost: React.FC = () => {
  return (
    <section className="last-post">
      <h2>Ultimas noticias</h2>
      <div className="grid">
        {mockPosts.map((post, index) => (
          <article
            key={post.id}
            className={`card ${index === 0 ? "card--main" : ""}`}
          >
            <div className="image-wrapper">
              {post.image ? (
                <div
                  className="image"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
              ) : (
                <div className="image placeholder">
                  <MdImageNotSupported size={40} />
                </div>
              )}
            </div>

            <div className="content">
              <header>
                <span className="category">{post.category}</span>
                <span className="time"><TbCalendarClock/>{post.timeAgo}</span>
              </header>
              <h2 className="title">{post.title}</h2>
              <p className="description">{post.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default LastPost