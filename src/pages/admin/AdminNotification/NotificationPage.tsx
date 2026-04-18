import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "@/components/Admin/AdminSidebar";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthenticationContext";
import { getNotifications } from "@/services/notificationApi";
import {
  formatNotification,
  type FormattedNotification,
} from "@/utils/notificationFormatter";

const EMPTY_MESSAGE = "No notifications yet.";

function NotificationPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [notifications, setNotifications] = useState<FormattedNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadNotifications = async () => {
      try {
        setIsLoading(true);
        const items = await getNotifications(50);
        if (!isMounted) return;
        setNotifications(items.map(formatNotification));
      } catch (error) {
        if (!isMounted) return;
        setNotifications([]);
        console.error("Failed to fetch admin notifications:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-brown-100">
      <div className="flex flex-row">
        <AdminSidebar onLogout={logout} end="/admin/notification" />

        <main className="flex-1 bg-white">
          <header className="border-b border-brown-300 px-[60px] py-[24px]">
            <h1 className="text-headline-3 text-brown-600">Notification</h1>
          </header>

          <section className="px-[36px] py-[24px]">
            {isLoading ? (
              <p className="text-body-2 text-brown-400">Loading notifications...</p>
            ) : notifications.length === 0 ? (
              <p className="text-body-2 text-brown-400">{EMPTY_MESSAGE}</p>
            ) : (
              <div className="flex flex-col gap-[6px]">
                {notifications.map((item, index) => (
                  <article
                    key={item.id}
                    className={`flex items-start justify-between gap-[24px] py-[24px] ${
                      index < notifications.length - 1 ? "border-b border-brown-300" : ""
                    }`}
                  >
                    <div className="flex items-start gap-[16px]">
                      <img
                        src={item.avatarUrl}
                        alt={item.title}
                        className="h-[48px] w-[48px] rounded-full object-cover"
                      />

                      <div className="flex flex-col gap-[8px]">
                        <p className="m-0 text-body-1">
                          <span className="text-brown-500 text-body-1">
                            {item.title}
                          </span>{" "}
                          <span className="text-brown-400">
                            {item.message}
                          </span>
                        </p>

                        {item.commentText && (
                          <p className="m-0 max-w-[760px] text-body-1 text-brown-500">
                            "{item.commentText}"
                          </p>
                        )}

                        <span className="text-body-3 text-brand-orange">
                          {item.timeAgo}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <Button
                        label="View"
                        variant="text"
                        width="w-auto"
                        onClick={() => navigate(`/post/${item.postId}`)}
                      />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default NotificationPage;
