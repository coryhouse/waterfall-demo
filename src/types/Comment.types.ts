import { User } from "./User.types";

export interface Comment {
  id: number;
  body: string;
  postId: number;
  userId: number;
}

export interface CommentWithUser extends Comment {
  user: User;
}
