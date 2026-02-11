import { useNavigate } from "react-router-dom";

import PublicNavbar from "@/components/layout/PublicNavbar";
import ContentSection from "./ContentSection";
import Footer from "@/components/layout/Footer";

import { AllPostProvider } from "@/context/AllPostContext";

function LandingPage() {
  const navigate = useNavigate();

  // ===== Navigation Handlers =====
  // Responsibility: route users to auth pages while preserving origin
  function handleLogin() {
    navigate("/login", { state: { from: "post" } });
  }

  function handleSignUp() {
    navigate("/signup", { state: { from: "post" } });
  }

  return (
    <>
      <PublicNavbar
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
      <AllPostProvider>
        <ContentSection />
      </AllPostProvider>
      <Footer />
    </>
  );
}

export default LandingPage;
