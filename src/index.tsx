import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts from "./Posts";
import Post from "./Post";
import About from "./About";
import ErrorPage from "./ErrorPage";
import AppLayout from "./AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

// If preferred, can use JSX below via createRoutesFromElements: https://reactrouter.com/en/main/start/tutorial#jsx-routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    loader: AppLayout.loader(queryClient),
    children: [
      {
        path: "/",
        element: <Posts />,
        loader: Posts.loader(queryClient),
        errorElement: <ErrorPage />,
      },
      {
        path: "/post/:id",
        element: <Post />,
        loader: Post.loader(queryClient),
        errorElement: <ErrorPage />,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
