import { useState, useEffect, useRef, useReducer } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";

import InfoContext from "./InfoContext";
import UserContext from "./UserContext";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";

import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const infoReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return { message: null };
    default:
      return state;
  }
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const App = () => {
  const [user, userDispatch] = useReducer(userReducer, "");
  const [info, infoDispatch] = useReducer(infoReducer, { message: null });

  const queryClient = useQueryClient();

  const blogFormRef = useRef();

  useEffect(() => {
    const user = storageService.loadUser();
    userDispatch({ type: "SET", payload: user });
  }, []);

  const notifyWith = (message, type = "info") => {
    infoDispatch({
      type: "SET",
      payload: {
        message,
        type,
      },
    });
    setTimeout(() => {
      infoDispatch({ type: "CLEAR" });
    }, 500);
  };

  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
    },
    onError: () => {
      notifyWith("Error: Bad Request", "error");
    },
  });

  const likeBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      const updatedBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      );
      queryClient.setQueryData("blogs", updatedBlogs);
    },
    onError: () => {
      notifyWith("Error: Bad Request", "error");
    },
  });

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: (id) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData(
        "blogs",
        blogs.filter((b) => b.id !== id)
      );
    },
    onError: () => {
      notifyWith("Error: Bad Request", "error");
    },
  });

  const result = useQuery("blogs", blogService.getAll);

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>blog service not available due to problems in server</div>;
  }

  const blogs = result.data;

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      userDispatch({ type: "SET", payload: user });
      storageService.saveUser(user);
      notifyWith("welcome!");
    } catch (e) {
      notifyWith("wrong username or password", "error");
    }
  };

  const logout = async () => {
    userDispatch({ type: "SET", payload: null });
    storageService.removeUser();
    notifyWith("logged out");
  };

  const createBlog = async (newBlog) => {
    newBlogMutation.mutate(newBlog);
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    blogFormRef.current.toggleVisibility();
  };

  const like = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    likeBlogMutation.mutate(blogToUpdate);
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
  };

  const remove = async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      removeBlogMutation.mutate(blog.id);
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
    }
  };

  if (!user) {
    return (
      <UserContext.Provider value={[user, userDispatch]}>
        <InfoContext.Provider value={[info, infoDispatch]}>
          <div>
            <h2>log in to application</h2>
            <Notification />
            <LoginForm login={login} />
          </div>
        </InfoContext.Provider>
      </UserContext.Provider>
    );
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <InfoContext.Provider value={[info, infoDispatch]}>
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user.username} logged in
          <button onClick={logout}>logout</button>
        </div>
        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <NewBlog createBlog={createBlog} />
        </Togglable>
        <div>
          {blogs.sort(byLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              like={() => like(blog)}
              canRemove={user && blog.user.username === user.username}
              remove={() => remove(blog)}
            />
          ))}
        </div>
      </div>
    </InfoContext.Provider>
  );
};

export default App;
