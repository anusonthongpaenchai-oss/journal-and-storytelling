import PostPageDesktop from "./PostPageDesktop";
import PostPageMobile from "./PostPageMobile";

function PostPage() {
    return (
        <main aria-label="Post page">
            <PostPageDesktop />
            <PostPageMobile />
        </main>
    )
}

export default PostPage;


