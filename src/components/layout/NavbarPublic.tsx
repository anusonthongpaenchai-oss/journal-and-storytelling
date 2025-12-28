import { LoginButton, SignUpButton } from "../ui/Button";
import { HamburgerPublic } from "../ui/HamburgerButton";
import logo from "@/assets/common/logo.png";

function DesktopNav() {
  return (
    <nav
      className="
        hidden sticky
        top-0 left-0 z-50
        md:flex  flex-row
        justify-between items-center
        px-[120px] py-[16px]
        w-auto
        bg-brown-100
        border-b border-brown-300
      "
    >
      {/* Logo */}
      <img src={logo} alt="Logo" width="48px" />

      {/* Login, SignUp */}
      <div
        className="
          flex flex-row justify-between 
          gap-[8px]
          w-[276px]
        "
      >
        <LoginButton />
        <SignUpButton />
      </div>
    </nav>
  );
}

function MobileNav() {
  return (
    <nav
      className="
        md:hidden sticky
        top-0 left-0 z-50
        flex flex-row
        justify-between items-center
        px-[24px] py-[12px]
        w-full
        bg-brown-100 
        border-b border-brown-300
    "
    >
      {/* Logo */}
      <img src={logo} alt="Logo" width="24px" />

      {/* Hamburger */}
      <HamburgerPublic />
    </nav>
  );
}

function NavbarPublic() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}

export default NavbarPublic;
