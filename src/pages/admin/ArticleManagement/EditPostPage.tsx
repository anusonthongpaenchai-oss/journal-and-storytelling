import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthenticationContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef, type ChangeEvent } from "react";
import { usePost, PostProvider } from "@/context/PostContext";
import { useAllPosts, AllPostProvider } from "@/context/AllPostContext";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LoadingScreen } from "@/components/ui/LodingScreen";
import { ImageIcon, Trash2 } from "lucide-react";
import { AuthGateModal } from "@/components/layout/AuthGateModal";
import { getCategories } from "@/services/categoryApi";

type PostData = {
    id: string;
    title: string;
    // description is Introduction in UI
    description: string;
    content: string;
    category: string;
    // author is just a string in UI
    author: string;
    status_id: 1 | 2;
    // Use string for image preview
    image?: string;
};

function EditPostContent() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { post, isLoading, fetchPost, updatePost } = usePost(); // Use context
    const { deletePost } = useAllPosts(); // Use AllPostContext for delete

    const [isSaving, setIsSaving] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [postCategories, setPostCategories] = useState<string[]>([]);
    const [formData, setFormData] = useState<PostData>({
        id: "",
        title: "",
        description: "",
        content: "",
        category: "",
        author: "",
        status_id: 1,
        image: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categories = await getCategories();
                setPostCategories(categories.map((category) => category.name));
            } catch (error) {
                console.error("Fetch categories failed:", error);
            }
        };

        loadCategories();
    }, []);

    useEffect(() => {
        if (id) {
            fetchPost(id);
        }
    }, [id, fetchPost]);

    useEffect(() => {
        if (post) {
            setFormData({
                id: String(post.id),
                title: post.title || "",
                description: post.description || "",
                content: post.content || "",
                category: post.category || "",
                author: post.author || "",
                status_id:
                    post.status_id === 1 || post.status_id === 2
                        ? post.status_id
                        : post.status === "publish"
                            ? 2
                            : 1,
                image: post.image || "",
            });
        }
    }, [post]);

    const handleChange = (field: keyof PostData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            alert("Invalid file type. Please upload JPG or PNG.");
            return;
        }

        const maxSize = 15 * 1024 * 1024;
        if (file.size > maxSize) {
            alert("File size too large. Max 15MB.");
            return;
        }

        setImageFile(file);
        setFormData((prev) => ({
            ...prev,
            image: URL.createObjectURL(file),
        }));
    }

    const handleSave = async (statusId: 1 | 2) => {
        if (!id) return;
        setIsSaving(true);
        try {
            let payload: Partial<PostData> | FormData;

            if (imageFile) {
                const formDataPayload = new FormData();
                formDataPayload.append("title", formData.title);
                formDataPayload.append("description", formData.description);
                formDataPayload.append("content", formData.content);
                formDataPayload.append("category", formData.category);
                formDataPayload.append("status_id", String(statusId));
                formDataPayload.append("imageFile", imageFile);
                payload = formDataPayload;
            } else {
                payload = {
                    title: formData.title,
                    description: formData.description,
                    content: formData.content,
                    category: formData.category,
                    image: formData.image,
                    status_id: statusId,
                };
            }

            await updatePost(id, payload as any);
            navigate("/admin/post-managements", {
                state: {
                    alert: {
                        title: statusId === 1 ? "Article saved as draft" : "Article published",
                        description: statusId === 1
                            ? "You can publish article later"
                            : "Your article is now live",
                    },
                },
            });
        } catch (error) {
            console.error("Failed to save post", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        setIsDeleting(true);
        try {
            await deletePost(id);
            setIsDeleteModalOpen(false);
            navigate("/admin/post-managements");
        } catch (error) {
            console.error("Failed to delete post", error);
            alert("Failed to delete post");
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen bg-brown-200">
            <div className="flex flex-row">
                <AdminSidebar onLogout={logout} end="/admin/post-managements" />

                <main className="flex-1">
                    <AdminHeader
                        title="Edit article"
                        button_1={true}
                        buttonLabel_1="Cancel"
                        variant_1="secondary"
                        onClick_1={() => navigate("/admin/post-managements")}
                        button_2={false}
                        buttonLabel_2=""
                        variant_2="secondary"
                        onClick_2={() => {}}
                    />

                    <section className="flex flex-col px-[60px] py-[40px] gap-[40px] bg-white h-full">
                        {/* Thumbnail Image */}
                        <div className="flex flex-col gap-[16px]">
                            <Label className="text-body-1 text-brown-400">
                                Thumbnail image
                            </Label>
                            <div className="flex flex-row gap-[24px] items-end">
                                <div className="w-[460px] h-[260px] bg-brown-200 rounded-[16px] flex items-center justify-center overflow-hidden">
                                    {formData.image ? (
                                        <img
                                            src={formData.image}
                                            alt="Thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon className="w-[48px] h-[48px] text-brown-400 opacity-50" />
                                    )}
                                </div>
                                <Button
                                    label="Upload thumbnail image"
                                    variant="secondary"
                                    onClick={() => fileInputRef.current?.click()}
                                    width="w-auto"
                                />
                                {/* Hidden input for real implementation later */}
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-[4px] w-[480px] h-[76px]">
                            <Label className="text-body-1 text-brown-400">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(val) => handleChange("category", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {postCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Author Name */}
                        <div className="flex flex-col gap-[4px] w-[480px] h-[76px] opacity-40">
                            <Label className="text-body-1 text-brown-400">Author name</Label>
                            <Input
                                value={formData.author}
                                onChange={(e) => handleChange("author", e.target.value)}
                                className="bg-white"
                                disabled
                            />
                        </div>

                        {/* Title */}
                        <div className="flex flex-col gap-[4px] h-[76px]">
                            <Label className="text-body-1 text-brown-400">Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                className="bg-white"
                            />
                        </div>

                        {/* Introduction */}
                        <div className="flex flex-col gap-[4px]">
                            <Label className="text-body-1 text-brown-400">
                                Introduction (max 120 letters)
                            </Label>
                            <textarea
                                className="flex w-full min-h-[120px] rounded-[8px] border border-brown-300 bg-white px-[16px] py-[12px] text-body-1 text-brown-600 h-[171px] placeholder:text-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-500"
                                placeholder="Introduction"
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                maxLength={120}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-[4px]">
                            <Label className="text-body-1 text-brown-400">Content</Label>
                            <textarea
                                className="flex w-full min-h-[400px] rounded-[8px] border border-brown-300 bg-white px-[16px] py-[12px] text-body-1 text-brown-600 placeholder:text-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-500"
                                placeholder="Content"
                                value={formData.content}
                                onChange={(e) => handleChange("content", e.target.value)}
                            />
                        </div>

                        {/* Delete Button */}
                        <div className="flex justify-start">
                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="flex items-center gap-[6px] text-body-1 font-bold text-brown-600 underline hover:text-brown-800 focus:outline-none"
                            >
                                <Trash2 size={24} strokeWidth={1} />
                                Delete article
                            </button>
                        </div>

                        <div className="flex justify-end gap-[8px]">
                            <Button
                                label={isSaving ? "Saving..." : "Save as draft"}
                                variant="secondary"
                                width="w-auto"
                                onClick={() => handleSave(1)}
                                disabled={isSaving}
                            />
                            <Button
                                label={isSaving ? "Publishing..." : "Save and publish"}
                                variant="primary"
                                width="w-auto"
                                onClick={() => handleSave(2)}
                                disabled={isSaving}
                            />
                        </div>
                    </section>

                </main>
            </div>

            {isDeleteModalOpen && (
                <AuthGateModal
                    onClose={() => setIsDeleteModalOpen(false)}
                    title="Delete article"
                    description="Do you want to delete this article?"
                    primaryLabel="Delete"
                    secondaryLabel="Cancel"
                    onPrimaryClick={handleDelete}
                    isPrimaryLoading={isDeleting}
                />
            )}
        </div>
    );
}

function EditPostPage() {
    return (
        <AllPostProvider>
            <PostProvider>
                <EditPostContent />
            </PostProvider>
        </AllPostProvider>
    );
}

export default EditPostPage;
