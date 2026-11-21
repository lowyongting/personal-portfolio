import Section from "../Section/Section";
import styles from "./Skills.module.scss";

const GROUPS = [
  { key: "technical", label: "Technical" },
  { key: "soft", label: "Professional" },
];

export default function Skills({ id, title, skills = {} }) {
  return (
    <Section id={id} title={title}>
      <div className={styles.groups}>
        {GROUPS.filter((group) => skills[group.key]?.length).map((group) => (
          <div key={group.key} className={styles.group}>
            <h3 className={styles.label}>{group.label}</h3>
            <ul className={styles.chips}>
              {skills[group.key].map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
