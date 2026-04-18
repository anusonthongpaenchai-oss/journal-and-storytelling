

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import AdminHeader from "@/components/Admin/AdminHeader";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import { Alert } from "@/components/feedback/Alert";
import { AuthGateModal } from "@/components/layout/AuthGateModal";
import { useAuth } from "@/context/AuthenticationContext";

import { deleteCategory, getCategories, type Category } from "./categoryApi";

export default function CategoryManagementPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [categories, setCategories] = useState<Category[]>([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [successAlert, setSuccessAlert] = useState<null | { title: string; description: string }>(null);

    useEffect(() => {
        const loadCategories = async () => {
            setIsLoading(true);
            setErrorMessage("");

            try {
                const data = await getCategories(searchKeyword);
                setCategories(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setErrorMessage(error.response?.data?.message || "Failed to fetch categories.");
                    console.error("Fetch categories failed:", error.response?.status, error.response?.data);
                } else {
                    setErrorMessage("Failed to fetch categories.");
                    console.error("Fetch categories failed:", error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadCategories();
    }, [searchKeyword]);

    useEffect(() => {
        const alertState = location.state as { alert?: { title: string; description: string } } | null;

        if (!alertState?.alert) {
            return;
        }

        setSuccessAlert(alertState.alert);
        navigate(location.pathname, { replace: true, state: null });
    }, [location.pathname, location.state, navigate]);

    const handleDeleteCategory = async () => {
        if (!categoryToDelete) {
            return;
        }

        setIsDeleting(true);
        setErrorMessage("");

        try {
            await deleteCategory(String(categoryToDelete.id));
            setCategories((prev) => prev.filter((category) => category.id !== categoryToDelete.id));
            setCategoryToDelete(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.message || "Failed to delete category.");
                console.error("Delete category failed:", error.response?.status, error.response?.data);
            } else {
                setErrorMessage("Failed to delete category.");
                console.error("Delete category failed:", error);
            }
            setCategoryToDelete(null);
        } finally {
            setIsDeleting(false);
        }
    };

    const visibleCategories = useMemo(() => categories, [categories]);

    return (
        <div className="min-h-screen bg-brown-100">
            <div className="flex flex-row">
                <AdminSidebar onLogout={logout} end="/admin/category-management" />

                <main className="flex-1">
                    <AdminHeader
                        title="Category management"
                        button_1={true}
                        buttonLabel_1="Create category"
                        icon_1={<Plus width="24px" />}
                        variant_1="primary"
                        onClick_1={() => navigate("/admin/category-management/create")}
                    />

                    <section className="flex flex-col gap-[12px] px-[60px] pb-[60px] pt-[40px]">
                        <div className="flex h-[48px] w-[360px]">
                            <label className="flex flex-1 items-center gap-[4px] rounded-[10px] border border-brown-400 bg-white px-[14px]">
                                <Search size={16} className="text-brown-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full text-body-2 text-brown-500 placeholder:text-brown-400 focus:outline-none"
                                    value={searchKeyword}
                                    onChange={(event) => setSearchKeyword(event.target.value)}
                                />
                            </label>
                        </div>

                        {errorMessage && (
                            <p className="text-body-2 text-brand-red">{errorMessage}</p>
                        )}

                        {isLoading ? (
                            <div className="py-8 text-center">
                                <span className="text-brown-400">Loading...</span>
                            </div>
                        ) : visibleCategories.length > 0 ? (
                            <div className="overflow-x-auto rounded-[8px] border border-brown-300 bg-brown-100">
                                <table className="w-full">
                                    <thead>
                                        <tr className="h-[48px] border-b border-brown-300 text-left">
                                            <th className="px-[24px] py-[12px] text-body-2 text-brown-400">
                                                Category
                                            </th>
                                            <th className="w-[96px] px-[24px] py-[12px]" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {visibleCategories.map((category, index) => (
                                            <tr
                                                key={category.id}
                                                className={`${index % 2 !== 0 ? "bg-brown-200" : "bg-white"} border-b border-brown-300 last:border-b-0`}
                                            >
                                                <td className="h-[64px] px-[24px] py-[12px] align-middle text-body-1 text-brown-600">
                                                    {category.name}
                                                </td>
                                                <td className="h-[64px] px-[24px] py-[20px] align-middle">
                                                    <div className="flex items-center justify-end gap-[20px] text-brown-400">
                                                        <button
                                                            type="button"
                                                            onClick={() => navigate(`/admin/category-management/edit/${category.id}`)}
                                                            className="hover:text-brown-600"
                                                            aria-label={`Edit ${category.name}`}
                                                        >
                                                            <Pencil size={24} strokeWidth={1} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setCategoryToDelete(category)}
                                                            className="hover:text-brand-red"
                                                            aria-label={`Delete ${category.name}`}
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
                            <div className="py-8 text-center">
                                <span className="text-brown-400">Not found</span>
                            </div>
                        )}
                    </section>
                </main>
            </div>

            {categoryToDelete && (
                <AuthGateModal
                    onClose={() => setCategoryToDelete(null)}
                    title="Delete category"
                    description="Do you want to delete this category?"
                    secondaryLabel="Cancel"
                    primaryLabel="Delete"
                    isPrimaryLoading={isDeleting}
                    onPrimaryClick={handleDeleteCategory}
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
