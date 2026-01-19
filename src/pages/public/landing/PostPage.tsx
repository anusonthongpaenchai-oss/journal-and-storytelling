import PostPageDesktop from "./post/PostPageDesktop";
import PostPageMobile from "./post/PostPageMobile";

function PostPage() {
    return (
        <main aria-label="Post page">
            <PostPageDesktop />
            <PostPageMobile />
        </main>
    )
}

export default PostPage;


