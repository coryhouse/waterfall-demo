import { Comment } from "../types/Comment.types";

export async function getComments(postId: number): Promise<Comment[]> {
  const res = await fetch("http://localhost:3001/comments?postId=" + postId);
  return res.json();
}
