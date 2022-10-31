import { QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { Await, defer, Outlet, useLoaderData } from "react-router-dom";
import Nav from "./Nav";
import { getLinks } from "./services/linkService";
import { Link } from "./types/Link.types";

type LoaderResponse = {
  links: Promise<Link[]>;
};

const linksQuery = {
  queryKey: ["links"],
  queryFn: getLinks,
};

const loader = (queryClient: QueryClient) => async () => {
  return defer({
    links:
      queryClient.getQueryData(linksQuery.queryKey) ??
      (await queryClient.fetchQuery(linksQuery)),
  });
};

export default function AppLayout() {
  const data = useLoaderData() as LoaderResponse;
  return (
    <>
      <Suspense fallback={<div>Loading Nav Links...</div>}>
        <Await resolve={data.links} errorElement={<p>Error loading links!</p>}>
          {(links) => <Nav links={links} />}
        </Await>
      </Suspense>
      <Outlet />
    </>
  );
}

AppLayout.loader = loader;
