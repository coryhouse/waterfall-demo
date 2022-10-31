import { Link } from "react-router-dom";
import { Link as LinkType } from "./types/Link.types";

type NavProps = {
  links: LinkType[];
};

export default function Nav({ links }: NavProps) {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <Link to={link.url}>{link.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
