import styles from "./Hero.module.scss";

export default function Hero({ id, basicInfo, about }) {
  const photo = `${import.meta.env.BASE_URL}images/${basicInfo.image}`;

  return (
    <section id={id} className="container">
      <div className={styles.panel}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>{about.description_header}</p>
          <h1 className={styles.name}>{basicInfo.name}</h1>
          <p className={styles.lead}>{about.description}</p>
          <p className={styles.body}>{about.philosophy}</p>
          <div className={styles.actions}>
            <a href="#experience" className={styles.primary}>
              View experience
            </a>
            <a href="#contact" className={styles.secondary}>
              Get in touch
            </a>
          </div>
        </div>
        <figure className={styles.figure}>
          <img src={photo} alt={`Portrait of ${basicInfo.name}`} width="260" height="260" />
          {basicInfo.location && <figcaption>{basicInfo.location}</figcaption>}
        </figure>
      </div>
    </section>
  );
}
