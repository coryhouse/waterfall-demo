import Comment from "./Comment";
import { Comment as CommentType } from "./types/Comment.types";

type CommentsProps = {
  comments: CommentType[];
};

export default function Comments({ comments }: CommentsProps) {
  return (
    <>
      <h2>Comments</h2>
      {comments.length > 0
        ? comments.map((comment: CommentType) => (
            <Comment key={comment.id} comment={comment} />
          ))
        : "No comments"}
    </>
  );
}
