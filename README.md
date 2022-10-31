# React Waterfall Demo

This repo shows different approaches for handling fetch waterfalls in React.

- main branch: Uses React query alone
- prefetch: Prefetches requests with React query
- react-router-loaders: Uses React Router 6.4 loaders without React Query
- react-router-loaders-with-react-query: Uses React Router 6.4 loaders with React Query

## Key takeaways

Your React app probably needs caching. React Router doesn't have caching built in. React Query is a best-of-breed option, so integrating React Router with React Query is going to be common.

1. React Query's prefetch approach is flexible and trivial to implement. You place a prefetch in a parent, when desired. No other changes to your existing code are necessary.
2. React Router's loaders couple the fetch approach to the route. You can only have one loader per route. So, if you want to get more granular (by lazy loading parts of a route), you end up with two different ways of fetching data. The loader for things that should cause the route's Suspense fallback to render, and raw React Query for anything you want to lazy load on the route after the initial render, when scrolled into view, etc.
3. React Router new loader approach has many moving parts: A loader prop on the route, the loader function itself, a Suspense component with a fallback, an Await component inside the Suspense wrapper, and a defer wrapper, assuming you want the same level of granularity as React Query's prefetch. This is a lot of boilerplate.
4. Unfortunately, integrating React Router's loaders with React Query is cumbersome. You have to pass the queryClient to the loader, and accept it in the loader via an extra wrapper function, which may confuse some developers.
5. Typing React Router's loader approach is also more cumbersome than using React Query's prefetch. React Query is currently more TypeScript friendly.
6. React Router 6.4's new loader approach seems well-suited to server-rendering, where you would do all your calls on the server in parallel (this server-oriented approach is unsurprising, since it's copied from Remix). But on the client, it's often nice to have granular control, and show spinners in various spots to give the user instant feedback. The loader approach supports this, but it requires extra code, feels less intuitive, and is much more verbose than React Query's prefetch approach.
7. The Async function uses a HOC, which feels clunky, or you have to extract a child component, which feels equally clunky. The Await component's HOC isn't typed, so you have to manually declare the HOC arg's type as well.
