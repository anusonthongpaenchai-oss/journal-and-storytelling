import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@chakra-ui/react";
import ArticleSection from "@/pages/public/landing/ArticleSection";

export const PostContextValue = React.createContext({})

type Post = {
    id: string;
    image: string;
    category: string;
    title: string;
    description: string;
    content: string;
    author: string;
    date: string;
    likes: number;
};


export function PostContext() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<Post | null>(null);

    const getPost = async () => {
        try {
            if (isLoading) return;

            setIsLoading(true);

            const result = await axios.get(
                "https://blog-post-project-api.vercel.app/posts"
            );

            setPosts(result.data.posts);
        } catch (err) {
            alert(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    if (!posts) {
        return (
            <div
                className="
                hidden
                md:flex flex-col
                items-center
                gap-[12px]
                py-[48px]
            "
            >
                <CircularProgress isIndeterminate size="50px" color="gray.700" />
                <span className="text-headline-4">Loading...</span>
            </div>
        )
    };

    return (
        <PostContextValue.Provider value={{ posts }}>
            <ArticleSection/>
        </PostContextValue.Provider>
    )
} 