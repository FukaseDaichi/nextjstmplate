import Link from "next/link";

import styles from "./header.module.scss";

const items = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/peer", label: "Peer" },
];

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>Title</h1>
      <nav>
        {items.map(({ href, label }) => {
          return (
            <Link key={href} href={href}>
              <a>{label}</a>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
