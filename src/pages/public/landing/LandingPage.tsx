import PublicNavbar from "@/components/layout/PublicNavbar";
import { ProfileNavbarContainer } from "@/components/profile/ProfileNavbarContainer";
import ContentSection from "./ContentSection";
import Footer from "@/components/layout/Footer";

import { AllPostProvider } from "@/context/AllPostContext";
import { useAuth } from "@/context/AuthenticationContext";

function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <ProfileNavbarContainer />
      ) : (
        <PublicNavbar/>
      )}
      <AllPostProvider>
        <ContentSection />
      </AllPostProvider>
      <Footer />
    </>
  );
}

export default LandingPage;
