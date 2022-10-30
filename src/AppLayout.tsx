import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const queryClient = new QueryClient();

export default function AppLayout() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Nav />
        <Outlet />
      </QueryClientProvider>
    </React.StrictMode>
  );
}
