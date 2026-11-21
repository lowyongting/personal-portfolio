import Section from "../Section/Section";
import { Timeline, TimelineItem } from "../Timeline/TimelineItem";
import { formatDuration } from "../../utils/dates";
import styles from "./Experience.module.scss";

function ProjectList({ projects = [] }) {
  return projects.map((project) => (
    <div key={project.name} className={styles.project}>
      <h4 className={styles.projectName}>{project.name}</h4>
      <ul className={styles.highlights}>
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </div>
  ));
}

export default function Experience({ id, title, items = [] }) {
  return (
    <Section id={id} title={title}>
      <Timeline>
        {items.map((job) => {
          // A job either has several roles (each with its own projects)
          // or a single title with its projects directly underneath.
          const hasRoles = job.roles?.length > 0;
          return (
            <TimelineItem
              key={`${job.company}-${job.years}`}
              range={job.years}
              meta={formatDuration(job.years)}
              title={job.company}
              subtitle={hasRoles ? undefined : job.title}
              current={/present/i.test(job.years)}
            >
              {hasRoles ? (
                job.roles.map((role) => (
                  <div key={role.title} className={styles.role}>
                    <h4 className={styles.roleTitle}>{role.title}</h4>
                    <ProjectList projects={role.projects} />
                  </div>
                ))
              ) : (
                <ProjectList projects={job.projects} />
              )}
              {job.technologies?.length > 0 && (
                <ul className={styles.tags} aria-label="Tools and platforms">
                  {job.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}
            </TimelineItem>
          );
        })}
      </Timeline>
    </Section>
  );
}
