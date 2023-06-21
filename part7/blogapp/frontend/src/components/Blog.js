import { useContext, useState } from "react";
import PropTypes from "prop-types";

import { changeBlog, removeBlog, addComment } from "../reducers/blogsReducer";

import UserContext from "../UserContext";

const Blog = ({ blog, dispatch, notifyWith }) => {
  if (!blog) return <div>Blog does not exist.</div>;

  const [commentContent, setCommentContent] = useState("");

  const [user] = useContext(UserContext);
  const canRemove = user && blog.user.username === user.username;

  const like = async () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(changeBlog(blogToUpdate));
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`);
  };

  const remove = async () => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    );
    if (ok) {
      dispatch(removeBlog(blog));
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("blog argument: ", blog);
    await dispatch(addComment(blog, commentContent));
  };

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
  };

  console.log("Blog: ", blog);

  return (
    <div style={style} className="blog">
      <h1>
        <p>{blog.title}</p>
      </h1>
      <div>
        <div>
          {" "}
          <a href={blog.url}> {blog.url}</a>{" "}
        </div>
        <div>
          <p>
            likes {blog.likes} <button onClick={like}>like</button>
          </p>
        </div>
        <p>Author: {blog.author}</p>
        <div> Added by {blog.user && blog.user.name}</div>
        <p>{canRemove && <button onClick={remove}>delete</button>}</p>
        <h2>
          <p>comments</p>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            id="content"
            value={commentContent}
            onChange={({ target }) => setCommentContent(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment._id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
};

export default Blog;
