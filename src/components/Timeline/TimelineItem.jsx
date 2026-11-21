import { splitRange } from "../../utils/dates";
import styles from "./Timeline.module.scss";

export function Timeline({ children }) {
  return <ol className={styles.timeline}>{children}</ol>;
}

export function TimelineItem({ range, meta, title, subtitle, current = false, children }) {
  const { start, end } = splitRange(range);

  return (
    <li className={styles.item}>
      <div className={styles.dates}>
        <span>
          {start}
          {end && (
            <>
              {" · "}
              <span className={/present/i.test(end) ? styles.present : undefined}>{end}</span>
            </>
          )}
        </span>
        {meta && <span className={styles.meta}>{meta}</span>}
      </div>
      <div className={`${styles.marker} ${current ? styles.current : ""}`} aria-hidden="true" />
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
    </li>
  );
}
