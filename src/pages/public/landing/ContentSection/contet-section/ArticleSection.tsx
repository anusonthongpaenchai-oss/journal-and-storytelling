import { SearchControlsDesktop, SearchControlsMobile } from "./SearchControls";

function ArticleSectionDesktop() {
  return (
    <div
      className="
            hidden
            md:flex flex-col
            gap-[48px]
            "
    >
      <SearchControlsDesktop />
    </div>
  );
}

function ArticleSectionMobile() {
  return (
    <div
      className="
        md:hidden
        flex flex-col"
    >
      <SearchControlsMobile />
    </div>
  );
}

function ArticleSection() {
  return (
    <>
      <ArticleSectionDesktop />
      <ArticleSectionMobile />
    </>
  );
}

export default ArticleSection;
