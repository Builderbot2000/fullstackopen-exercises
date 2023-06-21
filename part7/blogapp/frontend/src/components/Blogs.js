import { Link } from "react-router-dom";

import Togglable from "./Togglable";
import NewBlog from "./NewBlog";

const Blogs = ({ blogs, blogFormRef, createBlog }) => {
  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
  };

  return (
    <div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.sort(byLikes).map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div style={style} className="blog">
              <p>{blog.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
