import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Posts, { loader as postsLoader } from "./Posts";
import Post, { loader as postLoader } from "./Post";
import About from "./About";
import ErrorPage from "./ErrorPage";
import AppLayout from "./AppLayout";

// If preferred, can use JSX below via createRoutesFromElements: https://reactrouter.com/en/main/start/tutorial#jsx-routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
        loader: postsLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/post/:id",
        element: <Post />,
        loader: postLoader,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<RouterProvider router={router} />);
