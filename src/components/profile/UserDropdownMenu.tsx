import { User, RotateCcw, LogOut } from "lucide-react";
import { ProfileMenuItem } from "./ProfileMenuItem";

type UserDropdownMenuProps = {
  onProfile: () => void;
  onResetPassword: () => void;
  onLogout: () => void;
};

export function UserDropdownMenu({
  onProfile,
  onResetPassword,
  onLogout,
}: UserDropdownMenuProps) {
  return (
    <div
      className="
        flex flex-col
        w-[240px]
        pt-[8px] pb-[8px]
        bg-brown-100
        rounded-[12px]
        shadow-lg
        overflow-hidden
      "
    >
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

      <div className="h-px bg-brown-300" />

      <ProfileMenuItem
        icon={<LogOut className="w-[24px] h-[24px] text-brown-400" />}
        label="Logout"
        onClick={onLogout}
      />
    </div>
  );
}
