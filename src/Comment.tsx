import { useQuery } from "@tanstack/react-query";
import { getUser } from "./services/userService";
import { Comment as CommentType } from "./types/Comment.types";

type CommentProps = {
  comment: CommentType;
};
export default function Comment({ comment }: CommentProps) {
  const user = useQuery(["user", comment.userId], () =>
    getUser(comment.userId)
  );

  if (user.isLoading) {
    return <div>Loading user...</div>;
  }

  return (
    <p>
      {comment.body} - By {user.data && user.data.name}
    </p>
  );
}
