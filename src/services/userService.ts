import { User } from "../types/User.types";

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`http://localhost:3001/users/${id}`);
  return response.json();
}
