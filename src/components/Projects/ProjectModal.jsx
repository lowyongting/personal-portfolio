import { useEffect, useRef, useState } from "react";
import { ArrowIcon, ChevronIcon, CloseIcon } from "../Icons/Icons";
import styles from "./ProjectModal.module.scss";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [shownProject, setShownProject] = useState(project);

  // Reset to the first image whenever a different project opens.
  if (project !== shownProject) {
    setShownProject(project);
    setIndex(0);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  const images = project?.images ?? [];
  const step = (delta) => setIndex((i) => (i + delta + images.length) % images.length);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };

  // Clicking the backdrop (the dialog element itself) closes it.
  const onClick = (event) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-labelledby="project-modal-title"
    >
      {project && (
        <div className={styles.content}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>

          <div className={styles.gallery}>
            <img src={asset(images[index])} alt={`${project.title.trim()} screenshot ${index + 1}`} />
            {images.length > 1 && (
              <div className={styles.controls}>
                <button type="button" onClick={() => step(-1)} aria-label="Previous image">
                  <ChevronIcon direction="left" />
                </button>
                <span>
                  {index + 1} / {images.length}
                </span>
                <button type="button" onClick={() => step(1)} aria-label="Next image">
                  <ChevronIcon />
                </button>
              </div>
            )}
          </div>

          <div className={styles.details}>
            <p className={styles.date}>{project.startDate}</p>
            <h3 id="project-modal-title" className={styles.title}>
              {project.title.trim()}
            </h3>
            <p className={styles.description}>{project.description}</p>
            <ul className={styles.tags}>
              {project.technologies.map((tech) => (
                <li key={tech.name}>{tech.name}</li>
              ))}
            </ul>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                View source <ArrowIcon />
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
