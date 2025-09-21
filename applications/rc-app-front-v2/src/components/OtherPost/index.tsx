import React from "react";
import "./OtherPost.scss";
import { mockOtherPosts } from "@mocks/post";
import { FaUser } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

const OtherPost: React.FC = () => {
  // Agrupamos posts por categoría
  const groupedPosts = mockOtherPosts.reduce(
    (acc: Record<string, typeof mockOtherPosts>, post) => {
      if (!acc[post.category]) acc[post.category] = [];
      acc[post.category].push(post);
      return acc;
    },
    {}
  );

  return (
    <section className="other-post">
      <h2>Más noticias</h2>

      <div className="grid-other-post">
        {Object.entries(groupedPosts).map(([category, posts]) => (
          <div key={category} className="category-column">
            <h3 className="category-title">{category}</h3>
            <div className="post-list">
              {posts.map((post) => (
                <article key={post.id} className="post-card">
                  <h4 className="title">{post.title}</h4>
                  <p className="description">{post.description}</p>
                  <footer className="meta">
                    <span className="author">
                      <FaUser /> {post.author}
                    </span>
                    <span className="time">
                      <MdAccessTime /> {post.timeAgo}
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OtherPost;
