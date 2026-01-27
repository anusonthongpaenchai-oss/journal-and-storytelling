import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "./Button";

type PublicNavActions = {
  onLogin?: () => void;
  onSignUp?: () => void;
};

export function PublicNavDrawer({ onLogin, onSignUp }: PublicNavActions) {
  const [open, setOpen] = useState(false);

  return (
    <div>
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
          flex flex-col items-center
          gap-[24px]
          px-[24px] py-[40px]
          w-full h-[200px]
          bg-white
          shadow-md
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Button label="Log in" variant="secondary" onClick={onLogin} />
        <Button label="Sign up" variant="primary" onClick={onSignUp} />
      </aside>
    </div>
  );
}
