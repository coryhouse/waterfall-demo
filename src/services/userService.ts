export async function getUser(id: number) {
  const response = await fetch(`http://localhost:3001/users/${id}`);
  return response.json();
}
