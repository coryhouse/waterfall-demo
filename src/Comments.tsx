import Comment from "./Comment";
import { CommentWithUser } from "./types/Comment.types";

type CommentsProps = {
  comments: CommentWithUser[];
};

export default function Comments({ comments }: CommentsProps) {
  return (
    <>
      <h2>Comments</h2>
      {comments.length > 0
        ? comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        : "No comments"}
    </>
  );
}
