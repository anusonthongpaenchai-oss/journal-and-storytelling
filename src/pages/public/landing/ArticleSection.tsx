import { useEffect, useState } from "react";
import { SearchControlsDesktop, SearchControlsMobile } from "./SearchControls";
import { BlogCardDesktop, BlogCardMobile } from "@/components/layout/BlogCard";
import { SectionLinkButton } from "@/components/ui/SectionLink";
import { CircularProgress } from "@chakra-ui/react";
import { formatDate } from "@/utils/formatDate";
import { usePostAutocomplete } from "@/hooks/usePostAutocomplete";
import { useNavigate } from "react-router-dom";
import { useAllPosts } from "@/context/AllPostContext";
import { getCategories } from "@/services/categoryApi";

/* ================= Component ================= */

export default function ArticleSection() {
  const { posts, isLoading, fetchPosts, hasMore, page, resetPosts } = useAllPosts();
  const [selectedCategory, setSelectedCategory] = useState<string>("Highlight");
  const [allCategories, setAllCategories] = useState<string[]>(["Highlight"]);
  const { query, setQuery, suggestions } = usePostAutocomplete(posts);
  const navigate = useNavigate();

  useEffect(() => {
    resetPosts();
    fetchPosts({
      page: 1,
      category: selectedCategory === "Highlight" ? undefined : selectedCategory,
    });
  }, [selectedCategory]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await getCategories();
        setAllCategories(["Highlight", ...categories.map((category) => category.name)]);
      } catch (error) {
        console.error("Fetch categories failed:", error);
      }
    };

    loadCategories();
  }, []);


  const visiblePosts = posts ?? [];

  return (
    <>
      {/* ================= Desktop ================= */}
      <section
        className="
          hidden md:flex flex-col
          gap-[48px]
        "
      >
        {/* Controls */}
        <SearchControlsDesktop
          categories={allCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          query={query}
          onQueryChange={setQuery}
          suggestions={suggestions}
          onSelectPost={(id) => navigate(`/post/${id}`)}
        />

        {/* Content */}
        {isLoading ? (
          <div
            className="
              flex flex-col
              items-center
              gap-[12px]
              py-[48px]
            "
          >
            <CircularProgress isIndeterminate size="50px" color="gray.700" />
            <span className="text-headline-4">Loading...</span>
          </div>
        ) : (
          <>
            {/* Article Grid */}
            <div
              className="
                grid
                grid-cols-2
                gap-[20px]
              "
            >
              {visiblePosts.map((post) => (
                <BlogCardDesktop
                  key={post.id}
                  id={post.id}
                  image={post.image || '/default-image.jpg'}
                  category={post.category}
                  title={post.title}
                  description={post.description}
                  author={post.author}
                  authorAvatar={post.authorProfilePic}
                  likes={post.likes_count ?? 0}
                  date={formatDate(post.date)}
                />
              ))}
            </div>

            {/* CTA */}
            {hasMore && (
              <SectionLinkButton
                label="View more"
                showLoading={isLoading}
                onClick={() =>
                  fetchPosts({
                    page: page + 1,
                    category:
                      selectedCategory === "Highlight" ? undefined : selectedCategory,
                  })
                }
              />
            )}
          </>
        )}
      </section>

      {/* ================= Mobile ================= */}
      <section
        className="
          flex flex-col
          md:hidden
        "
      >
        {/* Controls */}
        <SearchControlsMobile
          categories={allCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          query={query}
          onQueryChange={setQuery}
          suggestions={suggestions}
          onSelectPost={(id) => navigate(`/post/${id}`)}
        />

        {/* Content */}
        {isLoading ? (
          <div
            className="
              flex flex-col
              items-center
              gap-[12px]
              py-[48px]
            "
          >
            <CircularProgress isIndeterminate size="50px" color="gray.700" />
            <span className="text-headline-4">Loading...</span>
          </div>
        ) : (
          <div
            className="
              flex flex-col
              gap-[48px]
              px-[16px] pt-[24px] pb-[80px]
            "
          >
            {visiblePosts.map((blog) => (
              <BlogCardMobile
                key={blog.id}
                id={blog.id}
                image={blog.image || '/default-image.jpg'}
                category={blog.category}
                title={blog.title}
                description={blog.description}
                author={blog.author}
                authorAvatar={blog.authorProfilePic}
                likes={blog.likes_count ?? 0}
                date={formatDate(blog.date)}
              />
            ))}

            {/* CTA */}
            {hasMore && (
              <SectionLinkButton
                label="View more"
                showLoading={isLoading}
                onClick={() =>
                  fetchPosts({
                    page: page + 1,
                    category:
                      selectedCategory === "Highlight" ? undefined : selectedCategory,
                  })
                }
              />
            )}
          </div>
        )}
      </section>
    </>
  );
}
