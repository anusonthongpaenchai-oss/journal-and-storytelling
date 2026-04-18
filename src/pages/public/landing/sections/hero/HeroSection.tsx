import { HeroTextBlock } from "./HeroTextBlock";
import { HeroImage } from "./HeroImage";
import { HeroAuthorBlock } from "./HeroAuthorBlock";

function DesktopHeroSection() {
  return (
    <section
      className="
        hidden md:flex flex-row
        items-center justify-between
        gap-[60px]
      "
    >
      {/* Desktop Hero Section */}
      {/* - Three-column hero layout for desktop view */}

      {/* Hero Text */}
      <HeroTextBlock variant="desktop" />

      {/* Hero Image */}
      <HeroImage width="w-[386px]" height="h-[529px]" />

      {/* Hero Author */}
      <HeroAuthorBlock />
    </section>
  );
}

function MobileHeroSection() {
  return (
    <section
      className="
        flex flex-col
        md:hidden
        items-center
        gap-[40px]
        px-[16px] py-[40px]
      "
    >
      {/* Mobile Hero Section */}
      {/* - Stacked hero layout optimized for mobile view */}

      {/* Hero Text */}
      <HeroTextBlock variant="mobile" />

      {/* Hero Image */}
      <HeroImage width="w-[343px]" height="h-[470px]" />

      {/* Hero Author */}
      <HeroAuthorBlock />
    </section>
  );
}

function HeroSection() {
  return (
    <>
      {/* Hero Section Wrapper */}
      {/* - Composes desktop and mobile hero variants */}
      {/* - Responsive visibility handled inside each section */}
      <DesktopHeroSection />
      <MobileHeroSection />
    </>
  );
}

export default HeroSection;
