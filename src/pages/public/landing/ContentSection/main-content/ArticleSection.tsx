import { SearchControlsDesktop, SearchControlsMobile } from "./SearchControls";
import { BlogCardDesktop, BlogCardMobile } from "@/components/layout/BlogCard";
import { BLOGS } from "@/lib/mocks/blogs";
import { SectionLinkButton } from "@/components/ui/SectionLink";

function ArticleSectionDesktop() {
  return (
    <section
      className="
        hidden md:flex flex-col
        gap-[48px]
      "
    >
      {/* Desktop Article Section */}
      {/* - Desktop-only container for article controls, article grid, and CTA */}

      {/* Search & Filter Controls (Desktop) */}
      <SearchControlsDesktop />

      {/* Article Grid */}
      {/* - Two-column grid layout for desktop cards */}
      <div
        className="
          hidden md:grid
          grid-cols-2
          gap-[20px]
        "
      >
        {BLOGS.map((blog) => (
          <BlogCardDesktop
            key={blog.id}
            id={blog.id}
            image={blog.image}
            category={blog.category}
            title={blog.title}
            description={blog.description}
            author={blog.author}
            authorAvatar={blog.authorAvatar}
            date={blog.date}
            likes={blog.likes}
          />
        ))}
      </div>

      {/* CTA */}
      {/* - Navigates to full article list */}
      <SectionLinkButton label="View more" href="#" />
    </section>
  );
}

function ArticleSectionMobile() {
  return (
    <section
      className="
        flex flex-col
        md:hidden
      "
    >
      {/* Mobile Article Section */}
      {/* - Mobile-only container for controls, article list, and CTA */}

      {/* Search & Filter Controls (Mobile) */}
      <SearchControlsMobile />

      {/* Article List */}
      {/* - Vertical stacked list for mobile cards */}
      <div
        className="
          flex flex-col
          gap-[48px]
          px-[16px] pt-[24px] pb-[80px]
        "
      >
        {BLOGS.map((blog) => (
          <BlogCardMobile
            key={blog.id}
            id={blog.id}
            image={blog.image}
            category={blog.category}
            title={blog.title}
            description={blog.description}
            author={blog.author}
            authorAvatar={blog.authorAvatar}
            date={blog.date}
            likes={blog.likes}
          />
        ))}

        {/* CTA */}
        {/* - Loads or navigates to more articles */}
        <SectionLinkButton label="View more" href="#" />
      </div>
    </section>
  );
}

function ArticleSection() {
  return (
    <>
      {/* Article Section Wrapper */}
      {/* - Composes desktop and mobile variants */}
      {/* - Visibility handled via responsive utilities in each section */}
      <ArticleSectionDesktop />
      <ArticleSectionMobile />
    </>
  );
}

export default ArticleSection;