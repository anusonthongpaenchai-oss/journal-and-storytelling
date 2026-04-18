import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileNavbar from "@/components/profile/ProfileNavbar";
import { UserDropdownMenu } from "@/components/profile/UserDropdownMenu";
import { NotificationList } from "@/components/profile/NotificationList";

import { useAuth } from "@/context/AuthenticationContext";
import { getNotifications } from "@/services/notificationApi";
import {
  formatNotification,
  type FormattedNotification,
} from "@/utils/notificationFormatter";

const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export function ProfileNavbarContainer() {
  const [profileMenu, setProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [notificationItems, setNotificationItems] = useState<FormattedNotification[]>([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  const navigate = useNavigate();
  const { state, logout, isAuthenticated } = useAuth();
  const displayName = state.user?.name ?? state.user?.username ?? "User";
  const avatarUrl = state.user?.profilePic ?? DEFAULT_AVATAR;
  const isAdmin = state.user?.role === "admin";

  useEffect(() => {
    if (!isAuthenticated) {
      setNotificationItems([]);
      setHasUnreadNotifications(false);
      return;
    }

    let isMounted = true;

    const loadNotifications = async () => {
      try {
        const items = await getNotifications(5);
        if (!isMounted) return;

        const mappedItems = items.map(formatNotification);
        setNotificationItems(mappedItems);
        setHasUnreadNotifications(mappedItems.length > 0);
      } catch (error) {
        if (!isMounted) return;
        setNotificationItems([]);
        setHasUnreadNotifications(false);
        console.error("Failed to fetch notifications:", error);
      }
    };

    void loadNotifications();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, state.user?.id]);

  return (
    <>
      <ProfileNavbar
        name={displayName}
        avatarUrl={avatarUrl}
        hasUnreadNotifications={hasUnreadNotifications}
        onNotificationClick={() => {
          setNotifications(true);
          setHasUnreadNotifications(false);
        }}
        onProfileClick={() => {
          setProfileMenu(true);
        }}
        onProfile={() => navigate("/setting/profile")}
        onResetPassword={() => navigate("/setting/resetPassword")}
        onLogout={() => logout()}
        onAdminManagement={isAdmin ? () => navigate("/admin/post-managements") : undefined}
        showAdminEntry={isAdmin}
      />

      {/* ================= Notifications ================= */}
      {notifications && (
        <>
          <div
            className="fixed inset-0 z-50"
            onClick={() => setNotifications(false)}
          />

          <div
            className="
              fixed z-50
              right-2 top-32
              md:right-80 md:top-[75px]
            "
          >
            <NotificationList
              items={notificationItems}
              onItemClick={(id) => {
                const targetNotification = notificationItems.find((item) => item.id === id);
                if (targetNotification?.postId) {
                  navigate(`/post/${targetNotification.postId}`);
                }
                setNotifications(false);
              }}
            />
          </div>
        </>
      )}

      {/* ================= Profile Menu ================= */}
      {profileMenu && (
        <>
          <div
            className="fixed inset-0 z-50 w-screen"
            onClick={() => setProfileMenu(false)}
          />

          <div className="fixed right-28 top-[75px] z-50">
            <UserDropdownMenu
              onProfile={() => navigate("/setting/profile")}
              onResetPassword={() => navigate("/setting/resetPassword")}
              onLogout={() => logout()}
              onAdminManagement={isAdmin ? () => navigate("/admin/post-managements") : undefined}
              showAdminEntry={isAdmin}
            />
          </div>
        </>
      )}
    </>
  );
}

