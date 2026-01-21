import NavbarPublic from "./NavbarPublic";
import Footer from "./Footer";
import { CircleAlert } from "lucide-react";
import {Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div
            className="
        flex flex-col
        min-h-screen
      "
        >
            {/* Navbar */}
            <NavbarPublic />

            {/* Main Content */}
            <main
                className="
          flex flex-1
          items-center justify-center
        "
            >
                <div
                    className="
            flex flex-col
            items-center
            gap-[16px]
            text-center
          "
                >
                    {/* Icon */}
                    <CircleAlert className="w-[70px] h-[70px] text-brown-600" />

                    {/* Text */}
                    <h1 className="text-headline-4 text-brown-600">
                        Page Not Found
                    </h1>

                    {/* Button */}
                    <Button label="Go to Home" variant="primary" onClick={() => navigate('/')} />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
