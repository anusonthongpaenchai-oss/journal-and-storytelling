import { Link } from "react-router-dom";

import { Button } from "../ui/Button";
import { PublicNavDrawer } from "../ui/PublicNavDrawer";
import logo from "@/assets/common/logo.png";
import { useNavigate } from "react-router-dom";


function PublicNavbar() {
  const navigate = useNavigate();
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

      <div className="hidden w-[276px] gap-[8px] md:flex">
        <Button label="Log in" variant="secondary" onClick={() => navigate("/login")} />
        <Button label="Sign up" variant="primary" onClick={() => navigate("/signup")} />
      </div>

      <div className="md:hidden">
        <PublicNavDrawer onLogin={() => navigate("/login")} onSignUp={() => navigate("/signup")} />
      </div>
    </nav>
  );
}

export default PublicNavbar;
