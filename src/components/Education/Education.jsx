import Section from "../Section/Section";
import { Timeline, TimelineItem } from "../Timeline/TimelineItem";
import styles from "./Education.module.scss";

export default function Education({ id, title, items = [] }) {
  return (
    <Section id={id} title={title}>
      <Timeline>
        {items.map((entry) => (
          <TimelineItem
            key={entry.title}
            range={entry.years}
            meta={entry.typeOfEdu?.join(", ")}
            title={entry.title}
            subtitle={entry.schoolName}
          >
            {entry.description && <p className={styles.description}>{entry.description}</p>}
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
