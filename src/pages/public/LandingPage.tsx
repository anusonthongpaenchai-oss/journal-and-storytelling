import NavbarPublic from "@/components/layout/NavbarPublic";
import ContentSection from "./landing/ContentSection";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate()
  return (
    <>
      <NavbarPublic onLogin={() =>
                navigate("/login", {
                    state: { from: "post" },
                })
            }
                onSignUp={() =>
                    navigate("/signup", {
                        state: { from: "post" },
                    })
                } />
        <ContentSection />
        <Footer/>
    </>    
  );
}

export default LandingPage;