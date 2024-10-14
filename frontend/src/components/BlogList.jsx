import { useDispatch, useSelector } from "react-redux";
import { removeBlog, likeBlog } from "../reducers/blogReducer";
import Blog from "./Blog";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  // Sort the blogs by likes
  //   const blogs = useSelector((state) => {
  //     return [...state.blogs].sort((a, b) => b.likes - a.likes);
  //   });

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  const handleLike = async (blog) => {
    dispatch(likeBlog(blog.id));
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={() => handleDelete(blog)}
          handleLike={() => handleLike(blog)}
        />
      ))}
    </div>
  );
};

export default BlogList;
