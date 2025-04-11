import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

interface Category{
    categoryId: number,
    categoryName: string,
    description: string,
    image: string,
}

interface CategoryStore {
    loading: boolean,
    categories: Category[] | null,
    getCategories: () => Promise<Category[] | void>
    addCategory: (formData: FormData) => Promise<void>
    deleteCategory: (categoryId: number) => Promise<void>
}
    
export const useCategoryStore = create<CategoryStore>((set, get) => ({
    loading: false,
    categories: null,

    getCategories: async () => {
        set({loading: true});
        try {
            const res = await axios.get("/categories/getall");
            set({ categories: res.data});
            set({loading: false});
            return res.data;
        } catch (error) {
            toast.error("Failed to fetch categories");
            console.error("Error fetching categories:", error);
        }
    },
    addCategory: async (formData: FormData) => {
        set({loading: true});
        try {
            await axios.post("/categories/add", formData ,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            get().getCategories();
            set({loading: false});
            toast.success("Kategori eklendi");
        } catch (error) {
            toast.error("Failed to add category");
            console.error("Failed to add category", error);
        }
    },
    deleteCategory: async (categoryId: number) => {
        set({loading: true});
        try {
            await axios.post(`categories/delete/${categoryId}`);
            get().getCategories();
            set({loading: false});
            toast.error("Urun basariyla eklendi");
        } catch (error) {
            toast.error("Failed to delete category");
            console.error("Failed to delete category", error);
        }
    }
}));