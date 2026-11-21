import { useState } from "react";
import Section from "../Section/Section";
import ProjectModal from "./ProjectModal";
import styles from "./Projects.module.scss";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function Projects({ id, title, items = [] }) {
  const [selected, setSelected] = useState(null);

  return (
    <Section id={id} title={title}>
      <ul className={styles.grid}>
        {items.map((project) => (
          <li key={project.title}>
            <button type="button" className={styles.card} onClick={() => setSelected(project)}>
              <img src={asset(project.images[0])} alt="" loading="lazy" />
              <span className={styles.date}>{project.startDate}</span>
              <span className={styles.title}>{project.title.trim()}</span>
              <span className={styles.tech}>
                {project.technologies.map((tech) => tech.name).join(" · ")}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
