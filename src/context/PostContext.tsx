import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

/* ================= Types ================= */

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

type PostContextValue = {
  post: Post | null;
  isLoading: boolean;
  fetchPost: (id: string | number | undefined) => Promise<void>;
};

/* ================= Context ================= */

// Context for post detail state and fetch logic
const PostContext = createContext<PostContextValue | undefined>(undefined);

/* ================= Provider ================= */

export function PostProvider({ children }: { children: ReactNode }) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPost = useCallback(
    async (id: string | number | undefined) => {
      if (!id) return;

      setIsLoading(true);

      try {
        const result = await axios.get(
          `https://blog-post-project-api.vercel.app/posts/${id}`
        );
        setPost(result.data);
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <PostContext.Provider value={{ post, isLoading, fetchPost }}>
      {children}
    </PostContext.Provider>
  );
}

/* ================= Hook ================= */

export function usePost() {
  const ctx = useContext(PostContext);

  if (!ctx) {
    throw new Error("usePost must be used within a PostProvider");
  }

  return ctx;
}
