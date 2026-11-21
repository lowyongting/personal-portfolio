import { GithubIcon, LinkedinIcon, MailIcon } from "../Icons/Icons";
import styles from "./Footer.module.scss";

const SOCIAL_ICONS = { github: GithubIcon, linkedin: LinkedinIcon, email: MailIcon };
const SOCIAL_LABELS = { github: "GitHub", linkedin: "LinkedIn", email: "Email" };

export default function Footer({ id, basicInfo, links }) {
  const photo = `${import.meta.env.BASE_URL}images/${basicInfo.image}`;

  return (
    <footer id={id} className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.identity}>
          <img src={photo} alt="" width="40" height="40" />
          <div>
            <p className={styles.name}>{basicInfo.name}</p>
            <p className={styles.role}>{basicInfo.titles?.[1] ?? basicInfo.titles?.[0]}</p>
          </div>
        </div>

        <div className={styles.right}>
          <nav aria-label="Footer">
            <ul className={styles.links}>
              {links.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className={styles.social}>
            {basicInfo.social.map((network) => {
              const Icon = SOCIAL_ICONS[network.name];
              const external = !network.url.startsWith("mailto:");
              return (
                <li key={network.name}>
                  <a
                    href={network.url}
                    aria-label={SOCIAL_LABELS[network.name] ?? network.name}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {Icon ? <Icon /> : network.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <p className={`container ${styles.copyright}`}>
        © {new Date().getFullYear()} {basicInfo.name}
      </p>
    </footer>
  );
}
