import { useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { logout, setUser } from "./reducers/authReducer";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const status = auth.status;
  const error = auth.error;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      const decodedToken = jwtDecode(user.token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired
        dispatch(logout());
      } else {
        // Token is still valid
        dispatch(setUser({ user, token: user.token }));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const blogFormRef = useRef();

  return (
    <div>
      <Notification />
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <h2>Blogs</h2>

      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <div className="logout">
            <span>{`👨🏻 ${user.username} logged in`}</span>
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel={"Create new blog"} ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
