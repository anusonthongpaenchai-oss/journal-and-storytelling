import HeroHighlight from "./HeroHighlight";

function HeroSection() {
  return (
      <div className="
      flex flex-col items-center
      md:gap-[80px] md:pt-[60px] md:pb-[120px] md:px-[120px]
      ">
        <HeroHighlight />
      </div>
  );
}

export default HeroSection;
