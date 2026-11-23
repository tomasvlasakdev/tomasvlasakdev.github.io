"use client";

import { useEffect, useRef } from "react";

// Arrow cursor drawn in the site's colours. It sits exactly on the mouse position (no lag or
// smoothing). Only on devices with a precise pointer and only when the visitor allows motion;
// otherwise the normal system cursor stays. It never moves the page or changes scrolling.

const INTERACTIVE = "a, button, summary, label, [role='button'], input[type='submit']";

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      el.dataset.visible = "true";
      const target = e.target as Element | null;
      el.dataset.hover = target?.closest?.(INTERACTIVE) ? "true" : "false";
    };
    const onDown = () => (el.dataset.down = "true");
    const onUp = () => (el.dataset.down = "false");
    const onLeave = () => (el.dataset.visible = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true" data-visible="false">
      <svg viewBox="0 0 24 24">
        <path
          d="M4 3 L20 10 L12.5 12.5 L10 20 Z"
          fill="var(--accent)"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
