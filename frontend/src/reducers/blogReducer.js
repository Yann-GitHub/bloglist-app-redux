import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotificationWithTimeout } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

// Export the reducer function
export default blogSlice.reducer;

// Export the action creators
export const { setBlogs, appendBlog, deleteBlog, updateBlog } =
  blogSlice.actions;

////////////////////// Action creators with redux-thunk ////////////////////////
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const blog = state.blogs.find((blog) => blog.id === id);
    if (!blog) {
      dispatch(
        setNotificationWithTimeout(
          {
            message: "Blog not found",
            type: "error",
          },
          4000
        )
      );
      return;
    }

    const updatedBlogData = { ...blog, likes: blog.likes + 1 };
    console.log("Updating blog with data:", updatedBlogData);

    try {
      const updatedBlog = await blogService.updateBlog(id, updatedBlogData);
      dispatch(updateBlog(updatedBlog));
      dispatch(
        setNotificationWithTimeout(
          {
            message: `You liked "${updatedBlog.title}"`,
            type: "success",
          },
          4000
        )
      );
    } catch (error) {
      console.error("Error liking blog:", error);
      dispatch(
        setNotificationWithTimeout(
          {
            message: `Failed to like blog: ${
              error.response ? error.response.data.error : error.message
            }`,
            type: "error",
          },
          4000
        )
      );
    }
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(content);
      dispatch(appendBlog(newBlog));
      dispatch(
        setNotificationWithTimeout(
          {
            message: `Blog "${newBlog.title}" created successfully`,
            type: "success",
          },
          4000
        )
      );
    } catch (error) {
      console.error("Error creating blog:", error);
      dispatch(
        setNotificationWithTimeout(
          {
            message: `Failed to create blog: ${
              error.response ? error.response.data.error : error.message
            }`,
            type: "error",
          },
          4000
        )
      );
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id);
      dispatch(deleteBlog(id));
      dispatch(
        setNotificationWithTimeout(
          {
            message: "Blog deleted successfully",
            type: "success",
          },
          4000
        )
      );
    } catch (error) {
      console.error("Error deleting blog:", error);
      dispatch(
        setNotificationWithTimeout(
          {
            message: `Failed to delete blog: ${
              error.response ? error.response.data.error : error.message
            }`,
            type: "error",
          },
          4000
        )
      );
    }
  };
};
