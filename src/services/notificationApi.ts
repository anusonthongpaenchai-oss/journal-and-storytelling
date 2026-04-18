import axios from "axios";

export type NotificationItem = {
  type: "like" | "comment";
  source_id: string;
  postId: number;
  postTitle: string;
  commentText: string | null;
  createdAt: string;
  actorId: string | null;
  actorName: string;
  actorAvatar: string | null;
};

type NotificationResponse = {
  notifications?: NotificationItem[];
};

export async function getNotifications(limit = 20) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { data } = await axios.get<NotificationResponse>(
    `${API_BASE_URL}/notifications`,
    {
      params: { limit },
    }
  );

  return data.notifications ?? [];
}
