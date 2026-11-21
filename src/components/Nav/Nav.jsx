import { useState } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { CloseIcon, MenuIcon } from "../Icons/Icons";
import styles from "./Nav.module.scss";

function initials(name = "") {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toLowerCase();
}

export default function Nav({ name, links }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(links.map((link) => link.id));

  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="#about" className={styles.logo} aria-label={`${name}, back to top`}>
          {initials(name)}
        </a>

        <nav aria-label="Sections">
          <ul id="nav-links" className={`${styles.links} ${open ? styles.open : ""}`}>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={active === link.id ? styles.active : undefined}
                  aria-current={active === link.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
