import { Link } from "../types/Link.types";

export async function getLinks(): Promise<Link[]> {
  const res = await fetch("http://localhost:3001/links");
  return res.json();
}
