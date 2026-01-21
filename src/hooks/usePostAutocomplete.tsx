import { useState } from "react";

type Post = {
  id: string;
  title: string;
};

export function usePostAutocomplete(posts: Post[]) {
  const [query, setQuery] = useState("");

  const suggestions = !query.trim()
    ? []
    : posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );

  return {
    query,
    setQuery,
    suggestions,
  };
}
