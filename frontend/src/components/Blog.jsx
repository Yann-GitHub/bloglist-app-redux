import { useState } from "react";

const Blog = ({ blog, handleDelete, handleLike }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);
  const optionalClass = visible ? "" : "hidden";

  return (
    <div className="blog">
      <div className="blog__title">
        {blog.title}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>
      <div className={`blog__info ${optionalClass}`}>
        <span>{blog.author}</span>
        <span>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </span>
        <span>
          {blog.likes} likes{" "}
          <button onClick={() => handleLike(blog)}>like</button>
        </span>
        <button onClick={() => handleDelete(blog)}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
