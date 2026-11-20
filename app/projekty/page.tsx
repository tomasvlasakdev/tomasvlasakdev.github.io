import { projektyPage } from "@/content/cs/projekty";
import { projects } from "@/content/cs/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...projektyPage.meta, path: "/projekty/" });

export default function ProjektyPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>{projektyPage.heading}</h1>
          <p className="lead">{projektyPage.intro}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ul className="card-grid">
            {projects.map((p) => (
              <li key={p.id}>
                <ProjectCard project={p} headingLevel={2} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
