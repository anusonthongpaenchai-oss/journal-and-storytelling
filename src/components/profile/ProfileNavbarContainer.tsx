import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileNavbar from "@/components/profile/ProfileNavbar";
import { UserDropdownMenu } from "@/components/profile/UserDropdownMenu";
import { NotificationList } from "@/components/profile/NotificationList";

import { dataNotification, profileData } from "@/lib/mocks/dataProfile";

export function ProfileNavbarContainer() {
  const [profileMenu, setProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  const navigate = useNavigate();

  return (
    <div>
      <ProfileNavbar
        name={profileData.name}
        avatarUrl={profileData.avatarUrl}
        hasUnreadNotifications={hasUnreadNotifications}
        onNotificationClick={() => {
          setNotifications(true);
          setHasUnreadNotifications(false);
        }}
        onProfileClick={() => {
          setProfileMenu(true);
        }}
        onProfile={() => navigate("/profile")}
        onResetPassword={() => navigate("/resetPassword")}
        onLogout={() => navigate("/")}
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
              items={dataNotification}
              onItemClick={(id) => {
                console.log("open notification", id);
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
              onProfile={() => navigate("/profile")}
              onResetPassword={() => navigate("/resetPassword")}
              onLogout={() => navigate("/")}
            />
          </div>
        </>
      )}
    </div>
  );
}
