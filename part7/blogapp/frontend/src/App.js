import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useMatch } from "react-router-dom";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, addBlog } from "./reducers/blogsReducer";
import { loginUser, logoutUser, loadUser } from "./reducers/userReducer";
import { loadUsers } from "./reducers/usersReducer";

import UserContext from "./UserContext";

import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    // console.log("User: ", state.user);
    return state.user;
  });

  const users = useSelector((state) => state.users);

  const blogs = useSelector((state) => {
    console.log("Blogs: ", state.blogs);
    return [...state.blogs];
  });

  const userMatch = useMatch("/users/:id");
  const matchedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const matchedBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const notifyWith = (message, type = "info") => {
    dispatch(setNotification(message, type, 500));
  };

  const login = async (username, password) => {
    dispatch(loginUser(username, password));
  };

  const logout = async () => {
    dispatch(logoutUser());
    notifyWith("logged out");
  };

  const blogFormRef = useRef();

  const createBlog = async (newBlog) => {
    dispatch(addBlog(newBlog));
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`);
    blogFormRef.current.toggleVisibility();
  };

  if (!user || user === "error") {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm login={login} />
      </div>
    );
  }

  const padding = {
    padding: 5,
  };

  return (
    <UserContext.Provider value={[user]}>
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          <Link style={padding} to="/blogs">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          {user.username} logged in
          <p>
            <button onClick={logout}>logout</button>
          </p>
        </div>
        <Routes>
          <Route
            path="/blogs"
            element={
              <Blogs
                blogs={blogs}
                blogFormRef={blogFormRef}
                createBlog={createBlog}
              />
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blog={matchedBlog}
                dispatch={dispatch}
                notifyWith={notifyWith}
              />
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User user={matchedUser} />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
