import { List, ListItem } from "@mui/material";

const User = ({ user }) => {
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>
        <p>added blogs</p>
      </h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
