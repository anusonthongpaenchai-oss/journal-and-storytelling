import axios from "axios";
import { useEffect, useState } from "react";
import { SearchControlsDesktop, SearchControlsMobile } from "./SearchControls";
import { BlogCardDesktop, BlogCardMobile } from "@/components/layout/BlogCard";
import { SectionLinkButton } from "@/components/ui/SectionLink";
import { CircularProgress } from "@chakra-ui/react";
import { formatDate } from "@/utils/FormatDate";
import { usePostAutocomplete } from "@/hooks/usePostAutocomplete";
import { useNavigate } from "react-router-dom";

type Post = {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  likes: number;
};

/* ================= Component ================= */

export default function ArticleSection() {
  const PAGE_SIZE: number = 6;

  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Highlight");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { query, setQuery, suggestions } = usePostAutocomplete(posts ?? []);
  const navigate = useNavigate();

  const getPost = async () => {
    try {
      if (isLoading) return;

      setIsLoading(true);

      const result = await axios.get(
        "https://blog-post-project-api.vercel.app/posts"
      );

      setPosts(result.data.posts);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory]);

  if (!posts) {
    return (
        <div
            className="
            hidden
            md:flex flex-col
            items-center
            gap-[12px]
            py-[48px]
        "
        >
            <CircularProgress isIndeterminate size="50px" color="gray.700" />
            <span className="text-headline-4">Loading...</span>
        </div>
    )
};


  /* ================= Derived Data ================= */

  const categories: string[] = [
    "Highlight",
    ...Array.from(new Set(posts.map((post) => post.category))),
  ];

  const filteredPosts =
    selectedCategory === "Highlight"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

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
          categories={categories}
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
              {visiblePosts.map((blog) => (
                <BlogCardDesktop
                  key={blog.id}
                  id={blog.id}
                  image={blog.image}
                  category={blog.category}
                  title={blog.title}
                  description={blog.description}
                  author={blog.author}
                  authorAvatar="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                  likes={blog.likes}
                  date={formatDate(blog.date)}
                />
              ))}
            </div>

            {/* CTA */}
            {visibleCount < filteredPosts.length && (
              <SectionLinkButton
                label="View more"
                showLoading={false}
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
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
          categories={categories}
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
                image={blog.image}
                category={blog.category}
                title={blog.title}
                description={blog.description}
                author={blog.author}
                authorAvatar="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                likes={blog.likes}
                date={formatDate(blog.date)}
              />
            ))}

            {/* CTA */}
            {visibleCount < filteredPosts.length && (
              <SectionLinkButton
                label="View more"
                showLoading={false}
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              />
            )}
          </div>
        )}
      </section>
    </>
  );
}
