import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getLinks } from "./services/linkService";

export default function Nav() {
  const links = useQuery(["links"], getLinks);

  if (links.isLoading) {
    return <div>Loading links...</div>;
  }

  return (
    <nav>
      <ul>
        {links.data &&
          links.data.map((link) => (
            <li key={link.id}>
              <Link to={link.url}>{link.text}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
