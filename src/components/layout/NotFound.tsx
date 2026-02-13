import { useNavigate } from "react-router-dom";
import { CircleAlert } from "lucide-react";

import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";
import { Button } from "../ui/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />

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
          <CircleAlert className="w-[70px] h-[70px] text-brown-600" />

          <h1 className="text-headline-4 text-brown-600">
            Page Not Found
          </h1>

          <Button
            label="Go to Home"
            variant="primary"
            onClick={() => navigate("/")}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
