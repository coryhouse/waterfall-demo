import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { getPost } from "./services/postService";

export default function Post() {
  const { postId } = useParams();
  if (!postId) throw new Error("Invalid postId");

  const postIdAsNumber = Number(postId);

  const post = useQuery(["post", postIdAsNumber], () =>
    getPost(postIdAsNumber)
  );

  if (post.isLoading) {
    return <div>Loading post...</div>;
  }

  if (!post.data) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <h1>{post.data.title}</h1>
      <Comments postId={postIdAsNumber} />
    </>
  );
}
