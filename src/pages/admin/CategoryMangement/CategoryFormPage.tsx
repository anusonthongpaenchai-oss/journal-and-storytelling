import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import AdminHeader from "@/components/Admin/AdminHeader";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthenticationContext";

import { createCategory, getCategoryById, updateCategory } from "./categoryApi";

type CategoryFormPageProps = {
    mode: "create" | "edit";
};

const INITIAL_FORM = {
    name: "",
};

export default function CategoryFormPage({ mode }: CategoryFormPageProps) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(mode === "edit");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (mode !== "edit" || !id) {
            return;
        }

        const loadCategory = async () => {
            try {
                const category = await getCategoryById(id);
                setFormData({ name: category.name ?? "" });
            } catch (error) {
                console.error("Fetch category failed:", error);
                navigate("/admin/category-management", { replace: true });
            } finally {
                setIsLoading(false);
            }
        };

        loadCategory();
    }, [id, mode, navigate]);

    const handleSave = async () => {
        const trimmedName = formData.name.trim();
        if (!trimmedName) {
            setErrorMessage("Category name is required.");
            return;
        }

        setIsSaving(true);
        setErrorMessage("");

        try {
            if (mode === "edit" && id) {
                await updateCategory(id, trimmedName);
                navigate("/admin/category-management", {
                    state: {
                        alert: {
                            title: "Update category",
                            description: "Category has been successfully updated.",
                        },
                    },
                });
                return;
            }

            await createCategory(trimmedName);
            navigate("/admin/category-management", {
                state: {
                    alert: {
                        title: "Create category",
                        description: "Category has been successfully created.",
                    },
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.message || "Failed to save category.");
                console.error("Save category failed:", error.response?.status, error.response?.data);
            } else {
                setErrorMessage("Failed to save category.");
                console.error("Save category failed:", error);
            }
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-brown-100">
            <div className="flex flex-row">
                <AdminSidebar onLogout={logout} end="/admin/category-management" />

                <main className="flex-1">
                    <AdminHeader
                        title={mode === "edit" ? "Edit category" : "Create category"}
                        button_1={true}
                        buttonLabel_1={isSaving ? "Saving..." : "Save"}
                        variant_1="primary"
                        onClick_1={handleSave}
                    />

                    <section className="flex min-h-[calc(100vh-97px)] flex-col gap-[24px] bg-white px-[60px] py-[40px]">
                        {isLoading ? (
                            <span className="text-body-1 text-brown-400">Loading...</span>
                        ) : (
                            <>
                                <div className="flex h-[76px] w-[480px] flex-col gap-[4px]">
                                    <Label className="text-body-1 text-brown-400">Category name</Label>
                                    <Input
                                        value={formData.name}
                                        onChange={(event) => {
                                            setFormData({ name: event.target.value });
                                            if (errorMessage) {
                                                setErrorMessage("");
                                            }
                                        }}
                                        className="bg-white"
                                        placeholder="Category name"
                                        disabled={isSaving}
                                    />
                                </div>

                                {errorMessage && (
                                    <p className="text-body-2 text-brand-red">{errorMessage}</p>
                                )}
                            </>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}
