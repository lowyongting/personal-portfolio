import { useEffect, useState } from "react";

const isAtPageBottom = () =>
  window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

/** Returns the id of the section currently in view, for highlighting nav links. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return undefined;
    const lastId = sections[sections.length - 1].id;

    const observer = new IntersectionObserver(
      (entries) => {
        // Short final sections (like the footer) never reach the observer band,
        // so the last one wins once the page is scrolled to the bottom.
        if (isAtPageBottom()) return setActive(lastId);
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      if (isAtPageBottom()) setActive(lastId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [key]);

  return active;
}
