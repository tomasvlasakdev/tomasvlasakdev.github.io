"use client";

import { useEffect, useRef } from "react";

// Arrow cursor that follows the mouse with a slight lag, so moving around the page feels calm.
// Only on devices with a precise pointer and only when the visitor allows motion; otherwise the
// normal system cursor stays. It never moves the page or changes scrolling.

const INTERACTIVE = "a, button, summary, label, [role='button'], input[type='submit']";
// Fraction of the remaining distance covered per 60 Hz frame: lower = more lag.
const FOLLOW = 0.2;

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const el = ref.current;
    if (!el) return;
    document.documentElement.classList.add("has-cursor");

    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let last = performance.now();
    let raf = 0;
    let started = false;

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const k = 1 - Math.pow(1 - FOLLOW, dt / 16.67);
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!started) {
        // First move: jump there instead of flying in from the corner.
        x = tx;
        y = ty;
        started = true;
      }
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
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
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
