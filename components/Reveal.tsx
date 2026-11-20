"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Fades content in as it scrolls into view. Only elements that start below the fold are hidden,
// so nothing visible on load ever blinks, and nothing is hidden without JS or with reduced motion.

const TARGETS = [
  "main section > .wrap > *:not(.card-grid):not(ul):not(ol)",
  "main [data-reveal]",
  "main .card-grid > li",
  "main [data-reveal-group] > *",
].join(", ");

export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("rv-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const fold = window.innerHeight * 0.95;
    const seen = new Set<Element>();
    document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
      if (seen.has(el) || el.classList.contains("rv")) return;
      seen.add(el);
      if (el.getBoundingClientRect().top < fold) return;
      // Stagger siblings a little.
      const index = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty("--rv-delay", `${Math.min(index, 6) * 70}ms`);
      el.classList.add("rv");
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
