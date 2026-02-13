export function formatDate(dateString?: string) {
    if (!dateString) return "-";
  
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) return "-";
  
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };