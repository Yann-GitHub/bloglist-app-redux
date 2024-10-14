import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleCreateBlog = (event) => {
    event.preventDefault();

    const newBlog = { title, author, url };

    // Dispatch the thunk to create the blog
    dispatch(createBlog(newBlog));

    // Clear the form fields
    setTitle("");
    setAuthor("");
    setUrl("");

    // Close the form (if applicable)
    if (blogFormRef && blogFormRef.current) {
      blogFormRef.current.toggleVisibility();
    }
  };

  return (
    <>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">Save blog</button>
      </form>
    </>
  );
};

export default BlogForm;
