import type { ReactNode } from "react";
import { User, RotateCw } from "lucide-react";
import { ProfileNavbarContainer } from "@/components/profile/ProfileNavbarContainer";
import PageTitle from "@/components/profile/PageTitle";
import SidebarButton from "@/components/layout/SidebarButton";
import { useAuth } from "@/context/AuthenticationContext";

const MENU_ITEMS = [
  {
    label: "Profile",
    to: "/setting/profile",
    icon: <User className="w-[24px] h-[24px]" />,
  },
  {
    label: "Reset password",
    to: "/setting/resetPassword",
    icon: <RotateCw className="w-[24px] h-[24px]" />,
  },
];

type ProfileTemplateProps = {
  component?: ReactNode;
};

function ProfileTemplate({ component }: ProfileTemplateProps) {
  const { state } = useAuth();
  const displayName = state.user?.name ?? state.user?.username ?? "User";
  const avatarUrl = state.user?.profilePic ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="flex flex-col">
      <ProfileNavbarContainer />

      <div className="flex flex-col md:items-center md:mt-[24px]">
        {/* ================= Mobile Menu ================= */}
        <div className="flex items-center md:hidden">
          {MENU_ITEMS.map((item) => (
            <SidebarButton
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </div>

        {/* ================= Page Title ================= */}
        <div className="flex gap-[24px] px-[16px] py-[24px]">
          <PageTitle
            avatarUrl={avatarUrl}
            alt={`Profile icon`}
            name={displayName}
          />
        </div>

        {/* ================= Layout ================= */}
        <div
          className="
            flex flex-col
            w-[375px]
            md:flex-row md:justify-center md:gap-[48px]
            md:w-[794px]
          "
        >
          {/* ================= Desktop Sidebar ================= */}
          <aside className="hidden md:flex flex-col">
            {MENU_ITEMS.map((item) => (
              <SidebarButton
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </aside>

          {/* ================= Main Content ================= */}
          <main>
            {component}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfileTemplate;
