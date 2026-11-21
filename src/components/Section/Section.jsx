import styles from "./Section.module.scss";

export default function Section({ id, title, children }) {
  return (
    <section id={id} className={`container ${styles.section}`} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={styles.title}>
        {title}
      </h2>
      {children}
    </section>
  );
}
