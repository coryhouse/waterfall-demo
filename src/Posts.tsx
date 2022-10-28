import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "./services/postService";

export default function Posts() {
  const posts = useQuery(["posts"], getPosts, { initialData: [] });

  if (posts.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.data.map((post) => (
          <li key={post.id}>
            <Link to={"/post/" + post.id}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
