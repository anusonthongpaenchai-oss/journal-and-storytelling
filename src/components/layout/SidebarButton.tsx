import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type SidebarButtonProps = {
  to: string;
  label: string;
  icon: ReactNode;
};

function SidebarButton({ to, icon, label }: SidebarButtonProps) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) => `
        flex items-center
        gap-[12px]
        px-[16px] py-[12px]
        rounded-[8px]
        text-body-1
        hover:bg-brown-100
        ${
          isActive
            ? "text-brown-500"
            : "text-brown-400 hover:text-brown-500"
        }
      `}
    >
      {icon}
      {label}
    </NavLink>
  );
}

export default SidebarButton;
