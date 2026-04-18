import PostPageDesktop from "./PostPageDesktop";
import PostPageMobile from "./PostPageMobile";
import { PostProvider } from "@/context/PostContext";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { ProfileNavbarContainer } from "@/components/profile/ProfileNavbarContainer";
import { useAuth } from "@/context/AuthenticationContext";

// Page component
// Responsibility: compose post page layout and provide post context
function PostPage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated
        ? (<ProfileNavbarContainer />)
        : (<PublicNavbar />)
      }
      <PostProvider>
        <main aria-label="Post page">
          <PostPageDesktop />
          <PostPageMobile />
        </main>
      </PostProvider>
    </>
  );
}

export default PostPage;
