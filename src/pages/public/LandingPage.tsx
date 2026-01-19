import NavbarPublic from "@/components/layout/NavbarPublic";
import ContentSection from "./landing/ContentSection";
import Footer from "@/components/layout/Footer";

function LandingPage() {
  return (
      <div>
        <NavbarPublic />
        <ContentSection />
        <Footer/>
      </div>
  );
}

export default LandingPage;