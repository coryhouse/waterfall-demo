import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getComments } from "./services/commentService";
import { getPost } from "./services/postService";
import Comment from "./Comment";

export default function Post() {
  const { postId } = useParams();
  if (!postId) throw new Error("Invalid postId");

  const postIdAsNumber = Number(postId);

  // These queries run in parallel automatically
  const post = useQuery(["post", postIdAsNumber], () =>
    getPost(postIdAsNumber)
  );

  const comments = useQuery(["comment", postIdAsNumber], () =>
    getComments(postIdAsNumber)
  );

  if (post.isLoading) {
    return <div>Loading post...</div>;
  }

  if (comments.isLoading) {
    return <div>Loading comments...</div>;
  }

  if (!post.data) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <h1>{post.data.title}</h1>
      <h2>Comments</h2>
      {comments.data && comments.data.length > 0
        ? comments.data.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        : "No comments"}
    </>
  );
}
