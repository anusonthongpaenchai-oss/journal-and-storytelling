import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Facebook, Linkedin, Twitter, Smile, Copy } from "lucide-react";
import { CircularProgress } from "@chakra-ui/react";
import axios from "axios";

import Footer from "@/components/layout/Footer";
import { AuthorCard } from "@/components/layout/AuthorCard";
import { AuthGateModal } from "@/components/layout/AuthGateModal";

import { Button } from "@/components/ui/Button";
import { SocialIconButton } from "@/components/ui/SocialIconButton";

import { CommentBox } from "./comment/CommentBox";
import { CommentItem } from "./comment/CommentItem";

import { Alert } from "@/components/feedback/Alert";
import { formatDate } from "@/utils/formatDate";
import { formatCommentDateTime } from "@/utils/formatCommentDateTime";

import { usePost } from "@/context/PostContext";
import { useAuth } from "@/context/AuthenticationContext";

type Comment = {
  id: number;
  postId: number;
  userId: number | null;
  commentText: string;
  createdAt: string;
  username: string | null;
  name: string | null;
  profilePic: string | null;
};

const DEFAULT_COMMENT_AVATAR =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function getLikeStorageKey(postId?: string) {
  return postId ? `post-liked:${postId}` : "";
}

function PostPageDesktop() {
  const { isAuthenticated, state } = useAuth();
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [hasLikeInteracted, setHasLikeInteracted] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommentInvalid, setIsCommentInvalid] = useState(false);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [commentRefreshKey, setCommentRefreshKey] = useState(0);

  const { id } = useParams();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { post, isLoading, fetchPost } = usePost();

  function requireAuth(action?: () => void | Promise<void>) {
    const hasToken = Boolean(localStorage.getItem("token"));
    const canProceed = isAuthenticated || hasToken;

    if (!canProceed) {
      setShowAuthGate(true);
      return;
    }

    action?.();
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

  const handleLike = async () => {
    if (!post?.id || isLikeLoading) return;
    const likeStorageKey = getLikeStorageKey(id);

    try {
      setIsLikeLoading(true);

      if (isLiked) {
        const likeDecrementPatchUrl =
          `${API_BASE_URL}/posts/${post.id}/likes-count/decrement`;

        await axios.patch(likeDecrementPatchUrl);
        setLikesCount((prev) => Math.max(prev - 1, 0));
        setIsLiked(false);
        setHasLikeInteracted(true);
        if (likeStorageKey) {
          localStorage.setItem(likeStorageKey, "false");
        }
      } else {
        const nextLikeCount = likesCount + 1;
        const likePatchUrl = `${API_BASE_URL}/posts/${post.id}/likes-count`;

        await axios.patch(likePatchUrl, {
          likes_count: nextLikeCount,
        });
        setLikesCount(nextLikeCount);
        setIsLiked(true);
        setHasLikeInteracted(true);
        if (likeStorageKey) {
          localStorage.setItem(likeStorageKey, "true");
        }
      }
    } catch (error) {
      console.error("Like update failed:", error);
      alert("Failed to update like");
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleCommentChange = (value: string) => {
    setCommentText(value);

    if (isCommentInvalid && value.trim() && value.trim().length <= 100) {
      setIsCommentInvalid(false);
    }
  };

  const handleCommentSubmit = async () => {
    const trimmedComment = commentText.trim();
    const isCommentValid =
      trimmedComment.length > 0 &&
      trimmedComment.length <= 100;

    if (!isCommentValid) {
      setIsCommentInvalid(true);
      return;
    }

    requireAuth(async () => {
      if (!post?.id || isCommentSubmitting) return;
      const userId = state.user?.id;
      const postId = Number(post.id);

      if (!userId || Number.isNaN(postId)) {
        alert("Unable to submit comment. Please login again.");
        return;
      }

      const commentPostUrl = `${API_BASE_URL}/comments`;

      try {
        setIsCommentSubmitting(true);

        await axios.post(commentPostUrl, {
          post_id: postId,
          user_id: userId,
          comment_text: trimmedComment,
        });

        setCommentText("");
        setIsCommentInvalid(false);
        setCommentRefreshKey((prev) => prev + 1);
      } catch (error) {
        console.error("Comment submit failed:", error);
        alert("Failed to send comment");
      } finally {
        setIsCommentSubmitting(false);
      }
    });
  };

  // ===== Data Fetching =====
  // Responsibility: retrieve article data by route param
  useEffect(() => {
    fetchPost(id);
  }, [fetchPost, id]);

  useEffect(() => {
    if (!hasLikeInteracted) {
      setLikesCount(post?.likes_count ?? 0);
    }
  }, [post?.likes_count, hasLikeInteracted]);

  useEffect(() => {
    const likeStorageKey = getLikeStorageKey(id);
    const storedLike =
      likeStorageKey ? localStorage.getItem(likeStorageKey) : null;
    const legacyLikeCountStorageKey = id ? `post-liked-count:${id}` : "";

    if (storedLike === "true") {
      setIsLiked(true);
      setHasLikeInteracted(false);
    } else if (storedLike === "false") {
      setIsLiked(false);
      setHasLikeInteracted(false);
    } else {
      setIsLiked(false);
      setHasLikeInteracted(false);
    }

    // Clean up old cached like-count to avoid stale values after refresh.
    if (legacyLikeCountStorageKey) {
      localStorage.removeItem(legacyLikeCountStorageKey);
    }
  }, [id]);

  useEffect(() => {
    const postId = Number(post?.id);
    if (!post?.id || Number.isNaN(postId)) {
      setComments([]);
      return;
    }

    let isMounted = true;

    const fetchComments = async () => {
      try {
        setIsCommentsLoading(true);

        const commentGetUrl = `${API_BASE_URL}/comments/post/${postId}`;
        const { data } =
          await axios.get<{ comments?: Comment[] }>(commentGetUrl);

        if (!isMounted) return;
        setComments((data.comments ?? []).slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        if (isMounted) setComments([]);
      } finally {
        if (isMounted) setIsCommentsLoading(false);
      }
    };

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [API_BASE_URL, post?.id, commentRefreshKey]);

  if (isLoading || !post) {
    return (
      <div className="hidden flex-col items-center gap-[12px] py-[48px] md:flex">
        <CircularProgress isIndeterminate size="50px" color="gray.700" />
        <span className="text-headline-4">Loading...</span>
      </div>
    );
  }

  return (
    <div className="hidden flex-col md:flex">
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
                    label={
                      <span className={isLiked ? "text-yellow-400" : ""}>
                        {likesCount}
                      </span>
                    }
                    icon={
                      <Smile className={isLiked ? "text-yellow-400" : ""} />
                    }
                    variant="secondary"
                    onClick={() => requireAuth(handleLike)}
                    disabled={isLikeLoading}
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
                <CommentBox
                  value={commentText}
                  onChange={handleCommentChange}
                  onSubmit={handleCommentSubmit}
                  isInvalid={isCommentInvalid}
                  isSubmitting={isCommentSubmitting}
                />

                <div className="flex flex-col gap-[24px]">
                  {isCommentsLoading ? (
                    <span className="text-body-2 text-brown-400">
                      Loading comments...
                    </span>
                  ) : comments.length === 0 ? (
                    <span className="text-body-2 text-brown-400">
                      No comments yet.
                    </span>
                  ) : (
                    comments.map((comment, index) => (
                      <div key={comment.id} className="flex flex-col gap-[24px]">
                        <CommentItem
                          avatar={comment.profilePic || DEFAULT_COMMENT_AVATAR}
                          author={comment.name || comment.username || "Anonymous"}
                          date={formatCommentDateTime(comment.createdAt)}
                          content={comment.commentText}
                        />

                        {index < comments.length - 1 && (
                          <div className="border border-brown-300" />
                        )}
                      </div>
                    ))
                  )}
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
