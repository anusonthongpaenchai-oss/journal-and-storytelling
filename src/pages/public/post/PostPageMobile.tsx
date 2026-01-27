import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

import { usePost } from "@/context/PostContext";

function PostPageMobile() {
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { post, isLoading, fetchPost } = usePost();

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
  useEffect(() => {
    fetchPost(id);
  }, [fetchPost, id]);

  if (isLoading || !post) {
    return (
      <div className="flex flex-col items-center gap-[12px] py-[48px] md:hidden">
        <CircularProgress isIndeterminate size="50px" color="gray.700" />
        <span className="text-headline-4">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:hidden">
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

      {/* ================= Content ================= */}
      <main>
        <img src={post.image} alt={post.title} />

        <section className="flex flex-col gap-[24px] px-[16px] pt-[24px] pb-[40px]">
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

            <h3 className="text-headline-3">{post.title}</h3>
          </header>

          {/* Article */}
          <section className="flex flex-col gap-[16px]">
            <p>{post.description}</p>

            <div className="markdown">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </section>

          <AuthorCard
            avatar="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            name={post.author}
            bio="I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.

                When i’m not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes."
            width="w-[343px]"
          />
        </section>

        {/* ================= Action Footer ================= */}
        <section className="flex flex-col gap-[24px] p-[16px] bg-brown-200">
          <div className="w-full">
            <Button
              label={post.likes}
              icon={<Smile />}
              variant="secondary"
              onClick={requireAuth}
            />
          </div>

          <div className="flex items-center gap-[8px]">
            <Button
              label="Copy link"
              variant="secondary"
              icon={<Copy />}
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

        {isAlert && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <Alert
              title="Copied!"
              description="This article has been copied to your clipboard."
              timeout={3000}
              onClose={() => setIsAlert(false)}
            />
          </div>
        )}

        {/* ================= Comments ================= */}
        <section className="flex flex-col gap-[44px] px-[16px] pt-[24px] pb-[40px]">
          <CommentBox gap="gap-[12px]" onSubmit={requireAuth} />

          <div className="flex flex-col gap-[24px]">
            <CommentItem
              avatar="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/zzye4nxfm3pmh81z7hni.jpg"
              author="Jacob Lash"
              date="12 September 2024 at 18:30"
              content="I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting."
            />

            <div className="border border-brown-300" />

            <CommentItem
              avatar="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e0haxst38li4g8i0vpsr.jpg"
              author="Ahri"
              date="12 September 2024 at 18:30"
              content="Such a great read! I've always wondered why my cat slow blinks at me—now I know it’s her way of showing trust!"
            />

            <div className="border border-brown-300" />

            <CommentItem
              avatar="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/koydfh6jpmzhtxvwein3.jpg"
              author="Mimi mama"
              date="12 September 2024 at 18:30"
              content="This article perfectly captures why cats make such amazing pets. I had no idea their purring could help with healing. Fascinating stuff!"
            />
          </div>
        </section>
      </main>

      {showAuthGate && (
        <AuthGateModal onClose={() => setShowAuthGate(false)} />
      )}

      <Footer />
    </div>
  );
}

export default PostPageMobile;
