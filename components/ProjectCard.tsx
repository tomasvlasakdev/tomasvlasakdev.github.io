import Link from "next/link";
import type { Project } from "@/content/cs/projects";
import { common } from "@/content/cs/common";

export function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="card">
      <H style={headingLevel === 2 ? { fontSize: "var(--step-1)" } : undefined}>{project.title}</H>
      <p>{project.text}</p>
      {(project.tags.length > 0 || project.link) && (
        <div className="card__footer">
          {project.tags.length > 0 && (
            <ul className="tags" aria-label={common.ui.tagsLabel}>
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          {project.link && (
            <Link className="text-link" href={project.link.href}>
              {project.link.label}
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
