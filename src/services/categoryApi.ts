import axios from "axios";

export type Category = {
    id: number;
    name: string;
    posts_count?: number;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    console.warn("VITE_API_BASE_URL is not defined. Please check your .env configuration.");
}

export async function getCategories(keyword = "") {
    const response = await axios.get(`${API_BASE_URL}/categories`, {
        params: {
            keyword: keyword || undefined,
        },
    });

    return response.data.categories as Category[];
}

export async function getCategoryById(id: string) {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
    return response.data as Category;
}

export async function createCategory(name: string) {
    const response = await axios.post(`${API_BASE_URL}/categories`, { name });
    return response.data.category as Category;
}

export async function updateCategory(id: string, name: string) {
    const response = await axios.put(`${API_BASE_URL}/categories/${id}`, { name });
    return response.data.category as Category;
}

export async function deleteCategory(id: string) {
    await axios.delete(`${API_BASE_URL}/categories/${id}`);
}
