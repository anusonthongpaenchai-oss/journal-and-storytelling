export function formatCommentDateTime(dateString?: string) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "-";

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const datePart = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: userTimeZone,
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: userTimeZone,
  }).format(date);

  return `${datePart} at ${timePart}`;
}
