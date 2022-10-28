import { useQuery } from "@tanstack/react-query";
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
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
