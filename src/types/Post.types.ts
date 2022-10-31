import { CommentWithUser } from "./Comment.types";

export interface Post {
  id: number;
  title: string;
  author: string;
}

export interface PostWithComments extends Post {
  comments: CommentWithUser[];
}
