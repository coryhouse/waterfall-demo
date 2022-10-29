import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { getPost } from "./services/postService";

export default function Post() {
  const { postId: postIdString } = useParams();
  if (!postIdString) throw new Error("Invalid postId");

  const postId = Number(postIdString);

  const post = useQuery(["post", postId], () => getPost(postId));

  if (post.isLoading) {
    return <div>Loading post...</div>;
  }

  if (!post.data) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <h1>{post.data.title}</h1>
      <Comments postId={postId} />
    </>
  );
}
