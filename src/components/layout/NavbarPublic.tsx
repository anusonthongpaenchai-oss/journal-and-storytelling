import { Button } from "../ui/Button";
import { HamburgerPublic } from "../ui/HamburgerButton";
import logo from "@/assets/common/logo.png";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function DesktopNav() {

  const navigate = useNavigate()

  return (
    <nav
      className="
    hidden md:flex flex-row
    sticky top-0 left-0 z-50
    justify-between items-center
    px-[120px] py-[16px]
    w-auto
    bg-brown-100
    border-b border-brown-300
  "
    >
      {/* Desktop Navigation Bar */}
      {/* - Sticky top navigation for desktop view */}
      {/* - Contains logo and authentication actions */}

      {/* Logo Section */}
      <Link to={'/'}>
        <img src={logo} alt="Logo" width="48px" />
      </Link>

      {/* Auth Actions */}
      {/* - Login and Sign Up buttons grouped together */}
      <div
        className="
      flex flex-row
      justify-between
      gap-[8px]
      w-[276px]
    "
      >
        <Button label='Log in' variant="secondary" onClick={() => navigate('/')} />
        <Button label='Sign up' variant="primary" onClick={() => navigate('/')}/>
      </div>
    </nav>
  );
}

function MobileNav() {
  return (
    <nav
      className="
    flex flex-row
    md:hidden
    sticky top-0 left-0 z-50
    justify-between items-center
    px-[24px] py-[12px]
    w-full
    bg-brown-100
    border-b border-brown-300
  "
    >
      {/* Mobile Navigation Bar */}
      {/* - Sticky top navigation for mobile view */}
      {/* - Contains logo and hamburger menu */}

      {/* Logo */}
      <Link to={'/'}>
        <img src={logo} alt="Logo" width="24px" />
      </Link>

      {/* Hamburger Menu Trigger */}
      <HamburgerPublic />
    </nav>
  );
}

function NavbarPublic() {
  return (
    <>
      {/* Primary Navigation Wrapper */}
      {/* - Renders desktop and mobile navigation variants */}
      {/* - Visibility is controlled internally by responsive utilities */}

      {/* Desktop Navigation */}
      <DesktopNav />

      {/* Mobile Navigation */}
      <MobileNav />
    </>
  );
}

export default NavbarPublic;
