import HeroSection from "./sections/hero/HeroSection";
import ArticleSection from "./ArticleSection";

function ContentSection() {
  return (
    <div className="
      flex flex-col
      md:gap-[80px] md:pt-[60px] md:pb-[120px] md:px-[120px]
      ">
      <HeroSection />
      <ArticleSection />
    </div>
  );
}

export default ContentSection;
