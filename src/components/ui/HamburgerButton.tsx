import { useState } from "react";
import { LoginButton, SignUpButton } from "./Button";

export function HamburgerPublic() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div>
                <button 
                    onClick={() => setOpen(true)}
                    className="
                    w-[24px] h-[24px]
                    "
                >
                    ☰
                </button>

                <div 
                    className={`fixed inset-0 bg-white/0 transition-opacity ${
                        open ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                    onClick={() => setOpen(false)}
                />

                {/* SileBar */}
                <aside
                    className= {`
                    fixed
                    flex flex-col items-center
                    px-[24px] py-[40px] gap-[24px]
                    top-[49px] left-0
                    w-full h-[200px]
                    bg-white
                    shadow-md
                    ${open ? "translate-x-0" : "-translate-x-full"}`
                }>
                    <LoginButton/>
                    <SignUpButton/>
                </aside>
            </div>
        </>
    );
}
