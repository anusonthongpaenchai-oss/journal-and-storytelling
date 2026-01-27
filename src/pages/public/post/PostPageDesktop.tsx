import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Facebook, Linkedin, Twitter, Smile, Copy } from "lucide-react";
import { CircularProgress } from "@chakra-ui/react";

import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import { AuthorCard } from "@/components/layout/AuthorCard";
import { AuthGateModal } from "@/components/layout/AuthGateModal";

import { Button } from "@/components/ui/Button";
import { SocialIconButton } from "@/components/ui/SocialIconButton";

import { CommentBox } from "./comment/CommentBox";
import { CommentItem } from "./comment/CommentItem";

import { Alert } from "@/components/feedback/Alert";
import { formatDate } from "@/utils/FormatDate";

type Post = {
  id: string | number;
  image: string;
  category: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  likes: number;
};

function PostPageDesktop() {
  const [post, setPost] = useState<Post | null>(null);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  function requireAuth() {
    setShowAuthGate(true);
  }

  // ===== Clipboard Action =====
  // Responsibility: copy current article URL for sharing
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsAlert(true);
    } catch {
      alert("Copy failed");
    }
  };

  // ===== Data Fetching =====
  // Responsibility: retrieve article data by route param
  const getPost = async () => {
    try {
      const result = await axios.get(
        `https://blog-post-project-api.vercel.app/posts/${id}`
      );
      setPost(result.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!post) {
    return (
      <div
        className="
          hidden
          flex-col items-center
          gap-[12px]
          py-[48px]
          md:flex
        "
      >
        <CircularProgress isIndeterminate size="50px" color="gray.700" />
        <span className="text-headline-4">Loading...</span>
      </div>
    );
  }

  return (
    <div className="hidden flex-col md:flex">
      <PublicNavbar
        onLogin={() =>
          navigate("/login", {
            state: { from: "post" },
          })
        }
        onSignUp={() =>
          navigate("/signup", {
            state: { from: "post" },
          })
        }
      />

      {/* ================= Main ================= */}
      <main className="flex-1">
        <div className="flex flex-col gap-[48px] px-[120px] pt-[60px] pb-[120px]">
          {/* Hero Image */}
          <img
            src={post.image}
            alt={post.title}
            className="
              w-full
              aspect-[16/9]
              object-cover
              lg:mt-[24px]
              lg:rounded-2xl
            "
          />

          {/* ================= Content + Sidebar ================= */}
          <div className="flex gap-[48px]">
            {/* ================= Content ================= */}
            <section className="flex flex-col gap-[32px] lg:col-span-8">
              {/* Header */}
              <header className="flex flex-col gap-[16px]">
                <div className="flex items-center gap-[16px]">
                  <span
                    className="
                      px-[12px] py-[4px]
                      bg-brand-green-soft
                      text-body-2 text-brand-green
                      rounded-full
                    "
                  >
                    {post.category}
                  </span>

                  <span className="text-body-2 text-brown-400">
                    {formatDate(post.date)}
                  </span>
                </div>

                <h1 className="text-headline-2 lg:text-headline-1">
                  {post.title}
                </h1>
              </header>

              {/* Article */}
              <section className="flex flex-col gap-[24px]">
                <p className="text-body-1">{post.description}</p>

                <div className="markdown">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
              </section>

              {/* ================= Action Footer ================= */}
              <section
                className="
                  flex
                  items-center justify-between
                  gap-[12px]
                  px-[16px] py-[24px]
                  bg-brown-200
                  rounded-[16px]
                "
              >
                <div className="w-[135px]">
                  <Button
                    label={post.likes}
                    icon={<Smile />}
                    variant="secondary"
                    onClick={requireAuth}
                  />
                </div>

                <div className="flex items-center">
                  <Button
                    label="Copy link"
                    variant="secondary"
                    icon={<Copy />}
                    width="w-[185px]"
                    onClick={handleCopyLink}
                  />

                  <SocialIconButton
                    icon={<Facebook className="w-[48px]" />}
                    href={`https://www.facebook.com/share.php?u=https://blog-post-project-api.vercel.app/posts/${id}`}
                  />

                  <SocialIconButton
                    icon={<Linkedin className="w-[48px]" />}
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://blog-post-project-api.vercel.app/posts/${id}`}
                  />

                  <SocialIconButton
                    icon={<Twitter className="w-[48px]" />}
                    href={`https://www.twitter.com/share?&url=https://blog-post-project-api.vercel.app/posts/${id}`}
                  />
                </div>
              </section>

              {/* Alert */}
              {isAlert && (
                <div className="fixed bottom-6 right-6 z-50">
                  <Alert
                    title="Copied!"
                    description="This article has been copied to your clipboard."
                    timeout={3000}
                    onClose={() => setIsAlert(false)}
                  />
                </div>
              )}

              {/* ================= Comments ================= */}
              <section className="flex flex-col gap-[40px]">
                <CommentBox onSubmit={requireAuth} />

                <div className="flex flex-col gap-[24px]">
                  <CommentItem
                    avatar="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/zzye4nxfm3pmh81z7hni.jpg"
                    author="Jacob Lash"
                    date="12 September 2024 at 18:30"
                    content="I loved this article! It really explains why my cat is so independent yet loving."
                  />

                  <div className="border border-brown-300" />

                  <CommentItem
                    avatar="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e0haxst38li4g8i0vpsr.jpg"
                    author="Ahri"
                    date="12 September 2024 at 18:30"
                    content="Such a great read! I've always wondered why my cat slow blinks at me."
                  />

                  <div className="border border-brown-300" />

                  <CommentItem
                    avatar="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/koydfh6jpmzhtxvwein3.jpg"
                    author="Mimi mama"
                    date="12 September 2024 at 18:30"
                    content="This article perfectly captures why cats make such amazing pets."
                  />
                </div>
              </section>
            </section>

            {/* ================= Sidebar ================= */}
            <aside
              className="
                flex
                flex-col
                gap-[24px]
                h-fit
                md:sticky md:top-[96px]
              "
            >
              <AuthorCard
                avatar="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                name={post.author}
                bio="I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.

When i’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes."
              />
            </aside>
          </div>
        </div>
      </main>

      {showAuthGate && (
        <AuthGateModal onClose={() => setShowAuthGate(false)} />
      )}

      <Footer />
    </div>
  );
}

export default PostPageDesktop;
