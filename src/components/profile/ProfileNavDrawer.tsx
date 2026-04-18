import { useState } from "react";
import { Menu, User, RotateCcw, LogOut, Bell, Shield } from "lucide-react";

import { ProfileMenuItem } from "./ProfileMenuItem";

type ProfileNavDrawerProps = {
  onProfile: () => void;
  onResetPassword: () => void;
  onLogout: () => void;
  avatarUrl: string;
  name: string;
  onNotificationClick?: () => void;
  hasUnreadNotifications?: boolean;
  onAdminManagement?: () => void;
  showAdminEntry?: boolean;
};

function ProfileNavDrawer({
  onProfile,
  onResetPassword,
  onLogout,
  avatarUrl,
  name,
  onNotificationClick,
  hasUnreadNotifications,
  onAdminManagement,
  showAdminEntry = false,
}: ProfileNavDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className="flex items-center justify-center"
      >
        <Menu />
      </button>

      {/* ================= Overlay ================= */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0
          bg-white/0
          transition-opacity
          ${open ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      {/* ================= Drawer ================= */}
      <aside
        className={`
          fixed
          top-[49px] left-0
          flex flex-col items-start
          gap-[16px]
          p-[24px]
          w-full
          bg-brown-100
          shadow-md
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-[8px] w-full">
          <div className="flex items-center gap-[8px]">
            <img
              src={avatarUrl}
              alt={name}
              className="
                w-[48px] h-[48px]
                rounded-full
                object-cover
              "
            />

            <span className="text-body-1 text-brown-500">
              {name}
            </span>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            onClick={onNotificationClick}
            className="
              relative
              flex items-center justify-center
              w-[48px] h-[48px]
              bg-white
              border border-brown-200
              rounded-full
            "
          >
            <Bell className="w-[24px] h-[24px] text-brown-400" />

            {hasUnreadNotifications && (
            <span
              className="
                absolute
                right-0 top-1
                md:hidden flex
                w-[8px] h-[8px]
                bg-brand-red
                rounded-full
                z-50
              "
            />
          )}
          </button>
        </div>

        {/* Menu Items */}
          <ProfileMenuItem
            icon={<User className="w-[24px] h-[24px] text-brown-400" />}
            label="Profile"
            onClick={onProfile}
          />

        <ProfileMenuItem
          icon={<RotateCcw className="w-[24px] h-[24px] text-brown-400" />}
          label="Reset password"
          onClick={onResetPassword}
        />

        {showAdminEntry && onAdminManagement && (
          <ProfileMenuItem
            icon={<Shield className="w-[24px] h-[24px] text-brown-400" />}
            label="Admin"
            onClick={onAdminManagement}
          />
        )}

        <div className="w-full h-px bg-brown-300" />

        <ProfileMenuItem
          icon={<LogOut className="w-[24px] h-[24px] text-brown-400 " />}
          label="Logout"
          onClick={onLogout}
        />
      </aside>
    </div>
  );
}

export default ProfileNavDrawer;
