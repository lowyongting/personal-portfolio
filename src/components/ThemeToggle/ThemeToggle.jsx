import { useTheme } from "../../hooks/useTheme";
import { MonitorIcon, MoonIcon, SunIcon } from "../Icons/Icons";
import styles from "./ThemeToggle.module.scss";

const ICONS = { system: MonitorIcon, light: SunIcon, dark: MoonIcon };
const LABELS = { system: "System theme", light: "Light theme", dark: "Dark theme" };

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();
  const Icon = ICONS[theme];

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={cycleTheme}
      aria-label={`${LABELS[theme]} (click to change)`}
      title={LABELS[theme]}
    >
      <Icon />
    </button>
  );
}
