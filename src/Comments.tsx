import { useQuery } from "@tanstack/react-query";
import { getComments } from "./services/commentService";
import Comment from "./Comment";

type CommentsProps = {
  postId: number;
};

export default function Comments({ postId }: CommentsProps) {
  const comments = useQuery(["comments", postId], () => getComments(postId));

  if (comments.isLoading) {
    return <div>Loading comments...</div>;
  }

  return (
    <>
      <h2>Comments</h2>
      {comments.data && comments.data.length > 0
        ? comments.data.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        : "No comments"}
    </>
  );
}
