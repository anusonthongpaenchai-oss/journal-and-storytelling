import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

/* ================= Types ================= */

type Post = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  status?: string | null;
  author: string;
  author_id?: string | null;
  authorProfilePic?: string | null;
  date: string;
  image?: string;
  likes_count?: number;
}

type FetchPostOptions = {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
  status?: string;
};

type AllPostContextValue = {
  posts: Post[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  hasMore: boolean;
  fetchPosts: (options?: FetchPostOptions) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  resetPosts: () => void;
};

/* ================= Context ================= */

const AllPostContext = createContext<AllPostContextValue | undefined>(undefined);

/* ================= Provider ================= */

export function AllPostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const PAGE_SIZE = 6;


  if (!API_BASE_URL) {
    console.warn("VITE_API_BASE_URL is not defined. Please check your .env configuration.");
  }

  const fetchPosts = useCallback(
    async (options?: FetchPostOptions) => {
      if (isLoading) return;

      const nextPage = options?.page ?? page;
      const limit = options?.limit ?? PAGE_SIZE;

      setIsLoading(true);

      try {
        const result = await axios.get(`${API_BASE_URL}/posts`, {
          params: {
            page: nextPage,
            limit,
            category: options?.category,
            keyword: options?.keyword,
            status: options?.status,
          },
        });

        const {
          posts: newPosts,
          currentPage,
          totalPages,
        } = result.data;

        setPosts((prev) =>
          nextPage === 1 ? newPosts : [...prev, ...newPosts]
        );

        setPage(currentPage);
        setTotalPages(totalPages ?? 1);
        setHasMore(currentPage < totalPages);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch posts");
      } finally {
        setIsLoading(false);
      }
    },
    [API_BASE_URL, page, isLoading]
  );


  const resetPosts = () => {
    setPosts([]);
    setPage(1);
    setTotalPages(1);
    setHasMore(true);
  };

  const deletePost = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
      throw err;
    }
  };

  return (
    <AllPostContext.Provider
      value={{
        posts,
        isLoading,
        page,
        totalPages,
        hasMore,
        fetchPosts,
        deletePost,
        resetPosts,
      }}
    >
      {children}
    </AllPostContext.Provider>
  );
}

export function useAllPosts() {
  const ctx = useContext(AllPostContext);

  if (!ctx) {
    throw new Error("useAllPosts must be used within an AllPostProvider");
  }

  return ctx;
}
