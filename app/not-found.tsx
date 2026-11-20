import Link from "next/link";
import type { Metadata } from "next";
import { common } from "@/content/cs/common";

export const metadata: Metadata = { title: { absolute: common.notFound.title }, robots: { index: false } };

export default function NotFound() {
  return (
    <section className="hero">
      <div className="wrap prose">
        <h1>{common.notFound.heading}</h1>
        <p className="lead">{common.notFound.text}</p>
        <Link className="button" href="/">
          {common.notFound.link}
        </Link>
      </div>
    </section>
  );
}
