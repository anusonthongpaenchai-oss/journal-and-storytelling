type PostLogoutAlert = {
  title: string;
  description: string;
  variant: "primary" | "secondary";
};

const POST_LOGOUT_ALERT_KEY = "postLogoutAlert";

export function setPostLogoutAlert(alert: PostLogoutAlert) {
  window.sessionStorage.setItem(POST_LOGOUT_ALERT_KEY, JSON.stringify(alert));
}

export function getPostLogoutAlert(): PostLogoutAlert | null {
  const storedAlert = window.sessionStorage.getItem(POST_LOGOUT_ALERT_KEY);

  if (!storedAlert) return null;

  window.sessionStorage.removeItem(POST_LOGOUT_ALERT_KEY);

  try {
    return JSON.parse(storedAlert) as PostLogoutAlert;
  } catch {
    return null;
  }
}

export type { PostLogoutAlert };
