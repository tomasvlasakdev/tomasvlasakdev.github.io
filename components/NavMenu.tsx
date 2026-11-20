"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

type Props = {
  items: { label: string; href: string }[];
  label: string;
  toggleLabel: string;
};

// Disclosure menu. On wide screens the toggle is hidden and the list is always shown.
export function NavMenu({ items, label, toggleLabel }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const id = useId();

  // Close after navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Close with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const strip = (p: string) => p.replace(/\/+$/, "");
  const isCurrent = (href: string) => {
    const here = strip(pathname ?? "");
    const target = strip(href);
    return here === target || here.startsWith(target + "/");
  };

  return (
    <>
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="nav__icon" aria-hidden="true" />
        {toggleLabel}
      </button>
      <nav id={id} className="nav" aria-label={label} data-open={open}>
        <ul className="nav__list">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="nav__link"
                aria-current={isCurrent(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
