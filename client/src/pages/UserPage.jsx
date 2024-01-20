import { useParams, Outlet, Link } from "react-router-dom";

export default function UserPage() {
  const { username } = useParams();

  // fetch request to database to get user information

  return (
    <div>
      <h2>User Page</h2>
      <nav>
        <Link to={`/users/${username}/likes`}>Likes</Link>
        <Link to={`/users/${username}/posts`}>Posts</Link>
      </nav>
      <p>Welcome {username}.</p>
      {/* display sub-routes if available */}
      <Outlet />
    </div>
  );
}
