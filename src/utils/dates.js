const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function parseMonth(text, now) {
  if (/present/i.test(text)) return { year: now.getFullYear(), month: now.getMonth() };
  const match = text.trim().match(/^([a-z]+)\w*\s+(\d{4})$/i);
  if (!match) return null;
  const month = MONTHS.indexOf(match[1].slice(0, 3).toLowerCase());
  return month === -1 ? null : { year: Number(match[2]), month };
}

/** Splits "Jul 2022 - Present" into its start and end labels. */
export function splitRange(range) {
  const [start, end] = range.split(/\s+[-–]\s+/);
  return { start, end };
}

/** "Jul 2022 - Present" → "4 yr 5 mo" (both months counted). Returns "" if unparseable. */
export function formatDuration(range, now = new Date()) {
  const { start, end } = splitRange(range);
  if (!start || !end) return "";
  const from = parseMonth(start, now);
  const to = parseMonth(end, now);
  if (!from || !to) return "";
  const total = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  if (total <= 0) return "";
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [years && `${years} yr`, months && `${months} mo`].filter(Boolean).join(" ");
}
