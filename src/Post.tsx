import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getComments } from "./services/commentService";
import { getPost } from "./services/postService";

export default function Post() {
  const { postId } = useParams();
  if (!postId) throw new Error("Invalid postId");

  const postIdAsNumber = Number(postId);

  const post = useQuery(["post", postIdAsNumber], () =>
    getPost(postIdAsNumber)
  );

  const comment = useQuery(["comment", postIdAsNumber], () =>
    getComments(postIdAsNumber)
  );

  if (post.isLoading || comment.isLoading) {
    return <div>Loading...</div>;
  }

  if (!post.data) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <h1>{post.data.title}</h1>
      <h2>Comments</h2>
      {comment.data && comment.data.map((comment) => <p>{comment.body}</p>)}
    </>
  );
}
