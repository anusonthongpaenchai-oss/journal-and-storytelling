import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImageIcon } from "lucide-react";

import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminHeader from "@/components/Admin/AdminHeader";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthenticationContext";
import { getCategories } from "@/services/categoryApi";

type CreatePostForm = {
    title: string;
    description: string;
    content: string;
    category: string;
    imagePreview: string;
};

const INITIAL_FORM: CreatePostForm = {
    title: "",
    description: "",
    content: "",
    category: "",
    imagePreview: "",
};

function CreatePostContent() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { logout, state } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<CreatePostForm>(INITIAL_FORM);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

    const authorName = useMemo(() => state.user?.name || state.user?.username || "", [state.user]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categories = await getCategories();
                setCategoryOptions(categories.map((category) => category.name));
            } catch (error) {
                console.error("Fetch categories failed:", error);
            }
        };

        loadCategories();
    }, []);

    const handleChange = (field: keyof CreatePostForm, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errorMessage) {
            setErrorMessage("");
        }
    };

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            setErrorMessage("Invalid file type. Please upload JPG or PNG.");
            return;
        }

        const maxSize = 15 * 1024 * 1024;
        if (file.size > maxSize) {
            setErrorMessage("File size too large. Max 15MB.");
            return;
        }

        setImageFile(file);
        setFormData((prev) => ({ ...prev, imagePreview: URL.createObjectURL(file) }));
        setErrorMessage("");
    };

    const validateForm = () => {
        if (!imageFile) return "Thumbnail image is required.";
        if (!formData.category) return "Category is required.";
        if (!formData.title.trim()) return "Title is required.";
        if (!formData.description.trim()) return "Introduction is required.";
        if (!formData.content.trim()) return "Content is required.";

        return "";
    };

    const handleCreate = async (statusId: 1 | 2) => {
        if (!API_BASE_URL) return;

        const validationMessage = validateForm();
        if (validationMessage) {
            setErrorMessage(validationMessage);
            return;
        }

        setIsSaving(true);
        setErrorMessage("");

        try {
            const payload = new FormData();
            payload.append("title", formData.title.trim());
            payload.append("category", formData.category);
            payload.append("description", formData.description.trim());
            payload.append("content", formData.content.trim());
            payload.append("status_id", String(statusId));

            if (imageFile) {
                payload.append("imageFile", imageFile);
            }

            await axios.post(`${API_BASE_URL}/posts`, payload);

            navigate("/admin/post-managements", {
                state: statusId === 1
                    ? {
                        alert: {
                            title: "Create article and saved as draft",
                            description: "You can publish article later",
                        },
                    }
                    : null,
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.message || "Failed to create article.");
                console.error("Create post failed:", error.response?.status, error.response?.data);
            } else {
                setErrorMessage("Failed to create article.");
                console.error("Create post failed:", error);
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-brown-200">
            <div className="flex flex-row">
                <AdminSidebar onLogout={logout} end="/admin/post-managements" />

                <main className="flex-1">
                    <AdminHeader
                        title="Create article"
                        button_1={true}
                        buttonLabel_1="Cancel"
                        variant_1="secondary"
                        onClick_1={() => navigate("/admin/post-managements")}
                        button_2={false}
                        buttonLabel_2=""
                        variant_2="secondary"
                        onClick_2={() => {}}
                    />

                    <section className="flex flex-col gap-[24px] bg-white px-[60px] py-[40px]">
                        <div className="flex flex-col gap-[16px]">
                            <Label className="text-body-1 text-brown-400">Thumbnail image</Label>
                            <div className="flex flex-row items-end gap-[24px]">
                                <div className="flex h-[260px] w-[460px] items-center justify-center overflow-hidden rounded-[16px] bg-brown-200">
                                    {formData.imagePreview ? (
                                        <img
                                            src={formData.imagePreview}
                                            alt="Thumbnail preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <ImageIcon className="h-[48px] w-[48px] text-brown-400 opacity-50" />
                                    )}
                                </div>

                                <Button
                                    label="Upload thumbnail image"
                                    variant="secondary"
                                    width="w-auto"
                                    onClick={() => fileInputRef.current?.click()}
                                />

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[4px] h-[76px] w-[480px]">
                            <Label className="text-body-1 text-brown-400">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => handleChange("category", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categoryOptions.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex h-[76px] w-[480px] flex-col gap-[4px]">
                            <Label className="text-body-1 text-brown-400">Author name</Label>
                            <Input
                                value={authorName}
                                readOnly
                                className="bg-brown-100 text-brown-500"
                                placeholder="Admin name"
                            />
                        </div>

                        <div className="flex h-[76px] flex-col gap-[4px]">
                            <Label className="text-body-1 text-brown-400">Title</Label>
                            <Input
                                value={formData.title}
                                onChange={(event) => handleChange("title", event.target.value)}
                                className="bg-white"
                                placeholder="Article title"
                            />
                        </div>

                        <div className="flex flex-col gap-[4px]">
                            <Label className="text-body-1 text-brown-400">
                                Introduction (max 120 letters)
                            </Label>
                            <textarea
                                className="flex h-[171px] min-h-[120px] w-full rounded-[8px] border border-brown-300 bg-white px-[16px] py-[12px] text-body-1 text-brown-600 placeholder:text-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-500"
                                placeholder="Introduction"
                                value={formData.description}
                                onChange={(event) => handleChange("description", event.target.value)}
                                maxLength={120}
                            />
                        </div>

                        <div className="flex flex-col gap-[4px]">
                            <Label className="text-body-1 text-brown-400">Content</Label>
                            <textarea
                                className="flex min-h-[400px] w-full rounded-[8px] border border-brown-300 bg-white px-[16px] py-[12px] text-body-1 text-brown-600 placeholder:text-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-500"
                                placeholder="Content"
                                value={formData.content}
                                onChange={(event) => handleChange("content", event.target.value)}
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-body-2 text-brand-red">{errorMessage}</p>
                        )}

                        <div className="flex justify-end gap-[8px]">
                            <Button
                                label={isSaving ? "Saving..." : "Save as draft"}
                                variant="secondary"
                                width="w-auto"
                                onClick={() => handleCreate(1)}
                                disabled={isSaving}
                            />
                            <Button
                                label={isSaving ? "Publishing..." : "Save and publish"}
                                variant="primary"
                                width="w-auto"
                                onClick={() => handleCreate(2)}
                                disabled={isSaving}
                            />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default function CreatePostPage() {
    return <CreatePostContent />;
}
