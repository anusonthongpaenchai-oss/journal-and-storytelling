import { Link } from "react-router-dom";
import { Bell, ChevronDown } from "lucide-react";

import logo from "@/assets/common/logo.png";
import ProfileNavDrawer from "./ProfileNavDrawer";

type ProfileNavbarProps = {
  name: string;
  avatarUrl: string;
  onProfileClick?: () => void;
  onNotificationClick?: () => void;
  hasUnreadNotifications?: boolean;
  onProfile: () => void;
  onResetPassword: () => void;
  onLogout: () => void;
};

function ProfileNavbar({
  name,
  avatarUrl,
  onProfileClick,
  onNotificationClick,
  hasUnreadNotifications,
  onProfile,
  onResetPassword,
  onLogout,
}: ProfileNavbarProps) {
  return (
    <nav
      className="
        flex items-center justify-between
        sticky top-0 left-0 z-50
        w-full
        px-[24px] py-[12px]
        bg-brown-100
        border-b border-brown-300
        md:px-[120px] md:py-[16px]
      "
    >
      <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="w-[24px] md:w-[48px]"
        />
      </Link>

      {/* Desktop actions */}
      <div className="hidden md:flex items-center gap-[24px]">
        <button
          type="button"
          onClick={onNotificationClick}
          aria-label="Notifications"
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
                hidden md:flex
                w-[8px] h-[8px]
                bg-brand-red
                rounded-full
                z-50
              "
            />
          )}
        </button>

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

          <button
            type="button"
            onClick={onProfileClick}
            aria-label="Open profile menu"
          >
            <ChevronDown className="w-[16px] h-[16px] text-brown-400" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <ProfileNavDrawer
        name={name}
        avatarUrl={avatarUrl}
        onNotificationClick={onNotificationClick}
        onProfile={onProfile}
        onResetPassword={onResetPassword}
        onLogout={onLogout}
        hasUnreadNotifications={hasUnreadNotifications}
      />
    </nav>
  );
}

export default ProfileNavbar;
