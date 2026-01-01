import { useState } from "react";
import { LoginButton, SignUpButton } from "./Button";

export function HamburgerPublic() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Wrapper */}
      {/* - Controls open/close state for mobile sidebar navigation */}
      <div>
        {/* Hamburger Button */}
        {/* - Triggers sidebar open */}
        <button
          onClick={() => setOpen(true)}
          className="
              w-[24px] h-[24px]
            "
        >
          ☰
        </button>

        {/* Backdrop Overlay */}
        {/* - Closes sidebar when clicking outside */}
        <div
          className={`
              fixed inset-0
              bg-white/0
              transition-opacity
              ${open ? "opacity-100 visible" : "opacity-0 invisible"}
            `}
          onClick={() => setOpen(false)}
        />

        {/* Sidebar */}
        {/* - Mobile navigation actions */}
        <aside
          className={`
              fixed
              flex flex-col items-center
              top-[49px] left-0
              px-[24px] py-[40px] gap-[24px]
              w-full h-[200px]
              bg-white
              shadow-md
              ${open ? "translate-x-0" : "-translate-x-full"}
            `}
        >
          <LoginButton />
          <SignUpButton />
        </aside>
      </div>
    </>
  );
}
