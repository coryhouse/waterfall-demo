import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getPosts } from "./services/postService";
import { Post } from "./types/Post.types";

type LoaderResponse = {
  posts: Promise<Post[]>;
};

export function loader() {
  return defer({ posts: getPosts() });
}

export default function Posts() {
  const data = useLoaderData() as LoaderResponse;

  return (
    <>
      <h1>Posts</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <Await resolve={data.posts} errorElement={<p>Error loading posts!</p>}>
          {/* Can avoid the render prop below by extracting this to a separate component and using useLoaderData in that. https://reactrouter.com/en/main/guides/deferred */}
          {(posts) => (
            <ul>
              {posts.map((post: Post) => (
                <li key={post.id}>
                  <Link to={"/post/" + post.id}>{post.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </>
  );
}
