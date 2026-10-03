import { useEffect, useRef } from "react";

/**
 * Adds the `is-visible` class to elements with the `reveal` class
 * when they scroll into view. Returns a ref to attach to a container,
 * or observes the whole document body if no ref is attached.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  deps: unknown[] = [],
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current ?? document.body;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
