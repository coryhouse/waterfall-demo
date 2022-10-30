import { QueryClient, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { getPost } from "./services/postService";

const isNumeric = (num: any) =>
  (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) &&
  !isNaN(num as number);

const postQuery = (id: number) => ({
  queryKey: ["post", id],
  queryFn: () => getPost(id),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const query = postQuery(params.id);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export default function Post() {
  const { id } = useParams();
  if (!id || Number.isInteger(id)) throw new Error("No id provided");
  if (!isNumeric(id)) throw new Error("Invalid id provided");
  const post = useQuery(postQuery(Number(id)));

  if (!post.isLoading && !post.data) {
    return <div>Post not found</div>;
  }

  return post.data ? (
    <>
      <h1>{post.data.title}</h1>
      <Comments postId={post.data.id} />
    </>
  ) : (
    <>Loading post...</>
  );
}
