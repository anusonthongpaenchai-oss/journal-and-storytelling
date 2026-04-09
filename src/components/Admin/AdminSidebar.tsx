import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
    Notebook,
    Bell,
    ExternalLink,
    Folder,
    LogOut,
    ShieldAlert,
    UserRound,
} from "lucide-react";

import logo from "@/assets/common/logo.png";

type SidebarItem = {
    to: string;
    label: string;
    icon: ReactNode;
};

const sidebarItems: SidebarItem[] = [
    {
        to: "/admin/managements",
        label: "Article management",
        icon: <Notebook size={24} strokeWidth={1}/>,
    },
    {
        to: "/admin/category-management",
        label: "Category management",
        icon: <Folder size={24} strokeWidth={1}/>,
    },
    {
        to: "/admin/profile",
        label: "Profile",
        icon: <UserRound size={24} strokeWidth={1}/>,
    },
    {
        to: "/admin/notification",
        label: "Notification",
        icon: <Bell size={24} strokeWidth={1}/>,
    },
    {
        to: "/admin/reset-password",
        label: "Reset password",
        icon: <ShieldAlert size={24} strokeWidth={1}/>,
    },
];

type AdminSidebarProps = {
    onLogout: () => void;
    end: string;
};

function AdminSidebar({ onLogout, end }: AdminSidebarProps) {
    return (
        <div className="w-[280px] h-[1024px] py-[16px] bg-brown-200">
            <aside className="flex flex-col  min-h-screen">
                <div className="flex flex-col justify-center gap-[4px] border-b border-brown-300 h-[200px] px-[18px] py-[24px]">
                    <img src={logo} alt="hh. logo" width="60" />
                    <p className="text-headline-4 text-brand-orange">Admin panel</p>
                </div>

                <nav className="flex flex-col w-full">
                    {sidebarItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === `${end}`}
                            className={({ isActive }) =>
                                `flex items-center gap-[12px] px-[24px] py-[20px] text-body-1 ${isActive
                                    ? "bg-brown-300 text-brown-500"
                                    : "text-brown-400 hover:bg-white"
                                }`
                            }
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto flex flex-col bg-brown-200 text-body-2">
                    <a
                        href="/"
                        className="flex h-[64px] items-center gap-[12px] px-[24px] py-[20px] text-brown-400 hover:bg-white"
                    >
                        <ExternalLink size={24} strokeWidth={1}/>
                        <span>hh. website</span>
                    </a>
                    <button
                        type="button"
                        onClick={onLogout}
                        className="flex items-center gap-[12px] px-[24px] py-[20px] text-brown-400 hover:bg-brown-100 border-t border-brown-300"
                    >
                        <LogOut size={24} strokeWidth={1}/>
                        <span>Log out</span>
                    </button>
                </div>
            </aside>
        </div>
    );
}

export default AdminSidebar;
