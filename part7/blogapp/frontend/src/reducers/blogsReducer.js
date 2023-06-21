import { createSlice } from "@reduxjs/toolkit";
import blogs from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map((b) =>
        b.id === action.payload.id ? action.payload : b
      );
    },
    deleteBlog(state, action) {
      return state.filter((b) => b.id !== action.payload.id);
    },
    appendComment(state, action) {
      return state.map((b) =>
        b.id === action.payload.id
          ? {
              ...b,
              comments: b.comments.concat({
                id: action.payload.id,
                content: action.payload.content,
              }),
            }
          : b
      );
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, deleteBlog, appendComment } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const initialBlogs = await blogs.getAll();
    dispatch(setBlogs(initialBlogs));
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogs.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const changeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogs.update(blog);
    dispatch(updateBlog(updatedBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogs.remove(blog.id);
    dispatch(deleteBlog(blog));
  };
};

export const addComment = (blog, content) => {
  return async (dispatch) => {
    console.log("arguments received: ", blog, " and ", content);
    await blogs.addComment(blog.id, { content: content });
    dispatch(appendComment({ id: blog.id, content: content }));
  };
};

export default blogsSlice.reducer;
