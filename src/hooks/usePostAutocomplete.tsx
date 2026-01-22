import { useMemo, useState } from "react";

type Post = {
  id: string;
  title: string;
};

export function usePostAutocomplete(posts: Post[]) {
  const [query, setQuery] = useState("");

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];

    return posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [posts, query]);

  return {
    query,
    setQuery,
    suggestions,
  };
}
