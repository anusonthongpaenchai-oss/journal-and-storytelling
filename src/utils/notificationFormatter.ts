import type { NotificationItem } from "@/services/notificationApi";

export type FormattedNotification = {
  id: string;
  avatarUrl: string;
  title: string;
  message: string;
  timeAgo: string;
  postId: number;
  commentText?: string;
  actionLabel: "Commented" | "Liked";
};

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export function formatNotificationTimeAgo(dateTime: string) {
  const diffInSeconds = Math.max(
    Math.floor((Date.now() - new Date(dateTime).getTime()) / 1000),
    0
  );

  if (diffInSeconds < 60) return "Just now";

  const units = [
    { label: "day", seconds: 60 * 60 * 24 },
    { label: "hour", seconds: 60 * 60 },
    { label: "minute", seconds: 60 },
  ];

  for (const unit of units) {
    const value = Math.floor(diffInSeconds / unit.seconds);
    if (value >= 1) {
      return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

export function formatNotification(item: NotificationItem): FormattedNotification {
  const isComment = item.type === "comment";

  return {
    id: item.source_id,
    avatarUrl: item.actorAvatar || DEFAULT_AVATAR,
    title: item.actorName,
    message: isComment
      ? `Commented on your article: ${item.postTitle}`
      : `liked your article: ${item.postTitle}`,
    timeAgo: formatNotificationTimeAgo(item.createdAt),
    postId: item.postId,
    commentText: item.commentText ?? undefined,
    actionLabel: isComment ? "Commented" : "Liked",
  };
}
