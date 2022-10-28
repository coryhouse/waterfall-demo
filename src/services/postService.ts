import { Post } from "./Post.types";

export async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3001/posts");
  return res.json();
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch("http://localhost:3001/posts/" + id);
  return res.json();
}
