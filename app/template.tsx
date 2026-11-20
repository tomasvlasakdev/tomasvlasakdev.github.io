"use client";

import { useEffect, useState } from "react";

// Re-mounted on every navigation. The first page load is not animated (keeps it fast and avoids
// delaying the first paint, and matches the static HTML); every later page fades and rises in.
let hasMounted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => typeof window !== "undefined" && hasMounted);
  useEffect(() => {
    hasMounted = true;
  }, []);
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
