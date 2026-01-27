import PostPageDesktop from "./PostPageDesktop";
import PostPageMobile from "./PostPageMobile";
import { PostProvider } from "@/context/PostContext";

// Page component
// Responsibility: compose post page layout and provide post context
function PostPage() {
  return (
    <PostProvider>
      <main aria-label="Post page">
        <PostPageDesktop />
        <PostPageMobile />
      </main>
    </PostProvider>
  );
}

export default PostPage;
