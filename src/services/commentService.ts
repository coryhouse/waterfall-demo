import { Comment, CommentWithUser } from "../types/Comment.types";
import { User } from "../types/User.types";

export async function getComments(postId: number): Promise<Comment[]> {
  const res = await fetch("http://localhost:3001/comments?postId=" + postId);
  return res.json();
}

// Weave user data in with Comment data.
export async function getCommentsWithUser(
  postId: number
): Promise<CommentWithUser[]> {
  const res = await fetch("http://localhost:3001/comments?postId=" + postId);
  const comments = (await res.json()) as Comment[];

  // Now get the user for each comment via a single call.
  const usersRes = await fetch(
    "http://localhost:3001/users?id_like=[" +
      comments.map((c) => c.userId).join(",") +
      "]"
  );

  const users = (await usersRes.json()) as User[];

  return comments.map((c) => {
    const user = users.find((u) => u.id === c.userId);
    if (!user) throw new Error("User not found for comment " + c.id);
    return { ...c, user };
  });
}
