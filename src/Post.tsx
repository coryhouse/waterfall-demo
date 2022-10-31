import { QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Comments from "./Comments";
import { getPost } from "./services/postService";
import { Post as PostType } from "./types/Post.types";
import { CommentWithUser } from "./types/Comment.types";
import { isNumeric } from "./utils/isNumeric";
import { getCommentsWithUser } from "./services/commentService";

type LoaderResponse = {
  post: Promise<PostType>;
  comments: Promise<CommentWithUser[]>;
};

const postQuery = (id: number) => ({
  queryKey: ["post", id],
  queryFn: () => getPost(id),
});

const commentsQuery = (postId: number) => ({
  queryKey: ["comments", postId],
  queryFn: () => getCommentsWithUser(postId),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any) => {
    const { id } = params;
    if (!isNumeric(id)) throw new Error("Invalid id provided");
    const postQueryById = postQuery(id);
    const commentsQueryByPostId = commentsQuery(id);

    return defer({
      post: {
        ...(queryClient.getQueryData(postQueryById.queryKey) ??
          (await queryClient.fetchQuery(postQueryById))),
        comments:
          queryClient.getQueryData(commentsQueryByPostId.queryKey) ??
          (await queryClient.fetchQuery(commentsQueryByPostId)),
      },
    });
  };

export default function Post() {
  const data = useLoaderData() as LoaderResponse;

  return (
    <Suspense fallback={<div>Loading post...</div>}>
      <Await resolve={data.post} errorElement={<p>Error loading post!</p>}>
        {(post) => {
          return (
            <>
              <h1>{post.title}</h1>
              <Comments comments={post.comments} />
            </>
          );
        }}
      </Await>
    </Suspense>
  );
}

Post.loader = loader;
