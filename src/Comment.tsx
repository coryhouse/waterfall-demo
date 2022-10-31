import { CommentWithUser } from "./types/Comment.types";

type CommentProps = {
  comment: CommentWithUser;
};

export default function Comment({ comment }: CommentProps) {
  return (
    <p>
      {comment.body} - By {comment.user.name}
    </p>
  );
}
