import {
    Plus,
    Pencil,
    Search,
    Trash2,
} from "lucide-react";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AuthGateModal } from "@/components/layout/AuthGateModal";
import { Alert } from "@/components/feedback/Alert";

import { useAuth } from "@/context/AuthenticationContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAllPosts, AllPostProvider } from "@/context/AllPostContext";
import { PostProvider } from "@/context/PostContext";
import { getCategories } from "@/services/categoryApi";

const STATUS_STYLES: Record<string, string> = {
    draft: "text-brand-orange",
    publish: "text-brand-green",
};

function PostManagement() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { posts, isLoading, fetchPosts, deletePost, hasMore, page, totalPages, resetPosts } = useAllPosts();
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
    const [isDeletingPost, setIsDeletingPost] = useState(false);
    const [successAlert, setSuccessAlert] = useState<null | { title: string; description: string }>(null);

    useEffect(() => {
        resetPosts();
        fetchPosts({
            page: 1,
            keyword: searchKeyword,
            category: selectedCategory,
            status: selectedStatus,
        });
    }, [searchKeyword, selectedCategory, selectedStatus]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categories = await getCategories();
                setAllCategories(categories.map((category) => category.name));
            } catch (error) {
                console.error("Fetch categories failed:", error);
            }
        };

        loadCategories();
    }, []);

    useEffect(() => {
        const alertState = location.state as { alert?: { title: string; description: string } } | null;

        if (!alertState?.alert) {
            return;
        }

        setSuccessAlert(alertState.alert);
        navigate(location.pathname, { replace: true, state: null });
    }, [location.pathname, location.state, navigate]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value === "all" ? "" : value);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value === "all" ? "" : value);
    };

    const loadPage = (targetPage: number) => {
        if (targetPage < 1 || targetPage > totalPages || isLoading) return;

        resetPosts();
        fetchPosts({
            page: targetPage,
            keyword: searchKeyword,
            category: selectedCategory,
            status: selectedStatus,
        });
    };

    const visiblePosts = posts.filter((post) => {
        if (!selectedStatus) return true;
        return post.status?.toLowerCase() === selectedStatus.toLowerCase();
    });

    const renderStatus = (status?: string | null) => {
        const normalizedStatus = status?.trim().toLowerCase();

        if (!normalizedStatus) {
            return <span className="text-brown-400">-</span>;
        }

        return (
            <span className={`whitespace-nowrap ${STATUS_STYLES[normalizedStatus] ?? "text-brown-400"}`}>
                &#8226; {normalizedStatus}
            </span>
        );
    };

    const handleDeletePost = async (postId: string) => {
        try {
            setIsDeletingPost(true);
            await deletePost(postId);

            const nextPage = visiblePosts.length === 1 && page > 1 ? page - 1 : page;
            resetPosts();
            await fetchPosts({
                page: nextPage,
                keyword: searchKeyword,
                category: selectedCategory,
                status: selectedStatus,
            });
        } catch (error) {
            console.error("Delete post error:", error);
        } finally {
            setIsDeletingPost(false);
        }
    };


    return (
        <div className="min-h-screen bg-brown-100">
            <div className="flex flex-row">
                <AdminSidebar onLogout={logout} end="/admin/post-managements" />

                <main className="flex-1">
                    <AdminHeader
                        title="Article management"
                        button_1={true}
                        buttonLabel_1="Create article"
                        icon_1={<Plus width="24px" />}
                        variant_1="primary"
                        onClick_1={() => navigate("/admin/post-managements/create-post")} />

                    <section className="flex flex-col px-[60px] pt-[40px] pb-[60px] gap-[12px]">
                        <div className="flex flex-row justify-between gap-[12px]">
                            <div className="flex w-[360px] h-[48px]">
                                <label className="flex flex-1 items-center gap-[4px] rounded-[10px] border border-brown-400 bg-white px-[14px]">
                                    <Search size={16} className="text-brown-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full text-body-2 text-brown-500 placeholder:text-brown-400 focus:outline-none"
                                        value={searchKeyword}
                                        onChange={handleSearch}
                                    />
                                </label>
                            </div>

                            <div className="flex flex-row gap-[16px]">
                                <Select onValueChange={handleStatusChange}>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">Status</SelectItem>
                                            <SelectItem value="publish">Published</SelectItem>
                                            <SelectItem value="draft">Draft</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                <Select onValueChange={handleCategoryChange}>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="all">Categories</SelectItem>
                                            {allCategories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-8">
                                <span className="text-brown-400">Loading...</span>
                            </div>
                        ) : visiblePosts.length > 0 ? (
                            <div className="overflow-x-auto rounded-[8px] border border-brown-300 bg-brown-100">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-brown-300 text-left h-[48px] ">
                                            <th className="px-[24px] py-[12px] text-body-2 text-brown-400 w-[640px]">
                                                Article title
                                            </th>
                                            <th className="w-[120px] px-[24px] py-[12px] text-body-2 text-brown-400">
                                                Category
                                            </th>
                                            <th className="w-[120px] px-[24px] py-[12px] text-body-2 text-brown-400">
                                                Status
                                            </th>
                                            <th className="w-[96px] px-[24px] py-[12px]" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visiblePosts.map((post, index) => (
                                            <tr
                                                key={post.id}
                                                className={`${index % 2 !== 0 ? "bg-brown-200" : "bg-white"} border-b border-brown-300
                                                last:border-b-0`}
                                            >
                                                <td className="truncate px-[24px] py-[12px] h-[64px] align-middle text-body-1 text-brown-600">
                                                    {post.title}
                                                </td>
                                                <td className="px-[24px] py-[20px] h-[64px] 
                                                w-[120px] align-middle text-body-1 text-brown-600">
                                                    {post.category}
                                                </td>
                                                <td className="px-[24px] py-[20px] h-[64px] w-[160px] align-middle text-body-1">
                                                    {renderStatus(post.status)}
                                                </td>
                                                <td className="px-[24px] py-[20px] h-[64px] align-middle">
                                                    <div className="flex items-center justify-end gap-[20px] text-brown-400">
                                                        <button
                                                            type="button"
                                                            onClick={() => navigate(`/admin/post-managements/edit-post/${post.id}`)}
                                                            className="hover:text-brown-600"
                                                            aria-label={`Edit ${post.title}`}
                                                        >
                                                            <Pencil size={24} strokeWidth={1} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setPostIdToDelete(post.id)}
                                                            className="hover:text-brand-red"
                                                            aria-label={`Delete ${post.title}`}
                                                        >
                                                            <Trash2 size={24} strokeWidth={1} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <span className="text-brown-400">Not found</span>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <nav
                                aria-label="Pagination"
                                className="flex justify-end"
                            >
                                <div className="flex items-center gap-[8px]">
                                    {page > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => loadPage(page - 1)}
                                            disabled={isLoading}
                                            className="flex h-[36px] items-center justify-center px-[14px] text-body-2 text-brown-400 rounded-[10px] border border-brown-300 bg-white hover:bg-brown-100"
                                        >
                                            Previous
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        aria-current="page"
                                        onClick={() => loadPage(page)}
                                        className="flex h-[36px] w-[36px] items-center justify-center text-body-2 text-brown-600 rounded-[10px] bg-brand-green-soft"
                                    >
                                        {page}
                                    </button>
                                    {page < totalPages && (
                                        <button
                                            type="button"
                                            onClick={() => loadPage(page + 1)}
                                            disabled={isLoading}
                                            className="flex h-[36px] w-[36px] items-center justify-center text-body-2 text-brown-400 rounded-[10px] border border-brown-300 bg-white hover:bg-brown-100"
                                        >
                                            {page + 1}
                                        </button>
                                    )}
                                    {hasMore && (
                                        <button
                                            type="button"
                                            onClick={() => loadPage(page + 1)}
                                            disabled={isLoading}
                                            className="flex h-[36px] items-center justify-center px-[14px] text-body-2 text-brown-600 rounded-[10px] border border-brown-300 bg-white hover:bg-brown-100"
                                        >
                                            Next
                                        </button>
                                    )}
                                </div>
                            </nav>
                        )}
                    </section>
                </main>
            </div>
            {postIdToDelete && (
                <AuthGateModal
                    onClose={() => setPostIdToDelete(null)}
                    title="Delete article"
                    description="Do you want to delete this article?"
                    secondaryLabel="Cancel"
                    primaryLabel="Delete"
                    isPrimaryLoading={isDeletingPost}
                    onPrimaryClick={async () => {
                        await handleDeletePost(postIdToDelete);
                        setPostIdToDelete(null);
                    }}
                />
            )}
            {successAlert && (
                <div className="sticky bottom-2 z-50 px-2 md:fixed md:bottom-6 md:right-6 md:w-[580px]">
                    <Alert
                        title={successAlert.title}
                        description={successAlert.description}
                        variant="primary"
                        timeout={3000}
                        onClose={() => setSuccessAlert(null)}
                    />
                </div>
            )}
        </div>
    );
}

function PostManagementPage() {
    return (
        <AllPostProvider>
            <PostProvider>
                <PostManagement />
            </PostProvider>
        </AllPostProvider>
    );
}

export default PostManagementPage;
