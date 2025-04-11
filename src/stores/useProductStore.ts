import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

interface Product {
    productId: number,
    restaurantId: number,
    categoryId: number,
    name: string,
    price: number,
    description: string,
    image: string,
    isFeatured: boolean, 
}

interface ProductStore {
    loading: boolean,
    products: Product[] | null,
    getProducts: () => Promise<Product[] | void>,
    getProductsByRestaurantId: () => Promise<Product[] | void>,
    getProductsByCategoryId: (categoryId: number) => Promise<Product[] | void>,
    addProduct: (formData: FormData) => Promise<void>,
    deleteProduct: (productId: number) => Promise<void>,
    toggleFeaturedProduct: (productId: number) => Promise<void>,
}

export const useProductStore = create<ProductStore>((set, get) => ({
    loading: false,
    products: null,

    getProducts: async () => {
        set({loading: true});
        try {
            const res = await axios.get("/products/getall");
            set({ products: res.data});
            set({loading: false});
            return res.data;
        } catch (error) {
            set({loading: false});
            toast.error("Failed to fetch products");
            console.error("Error fetching products:", error);
        }
    },

    getProductsByRestaurantId: async () => {
        set({loading: true})
        try {
            const res = await axios.get("/products/getlistbyrestaurantid");
            set({ products: res.data});
            set({ loading: false });
        } catch (error) {
            set({loading: false});
            toast.error("Failed to fetch products");
            console.error("Error fetching products:", error);
        }
    },

    getProductsByCategoryId: async (categoryId: number) => {
        set({loading: true})
        try {
            const res = await axios.get(`/products/getlistbycategory?categoryid=${categoryId}`);
            set({ products: res.data, loading: false});
        } catch (error) {
            set({loading: false});
            toast.error("Failed to fetch products");
            console.error("Error fetching products:", error);
        }
    },

    addProduct: async (formData: FormData) => {
        set({loading: true});
        try {
            const res = await axios.post("/products/add", formData ,{
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            get().getProducts();
            set({ products: res.data});
            set({loading: false})
            toast.success("Urun eklendi")
        } catch (error) {
            set({loading: false});
            toast.error("Failed to add product");
            console.error("Failed to add product", error);
        }
    },

    deleteProduct: async (productId: number) => {
        set({loading: true});
        try {
            await axios.post(`/products/delete/${productId}`);
            get().getProducts();
            set({loading: false});
        } catch (error) {
            set({loading: false});
            toast.error("Failed to delete product");
            console.error("Failed to delete product", error);
        }
    },
    toggleFeaturedProduct: async (productId: number) => {
		set({ loading: true });
		try {
			await axios.post(`/products/togglefeaturedproduct/${productId}`);
            set({loading: false});
			// this will update the isFeatured prop of the product
			// set((prevProducts) => ({
			// 	products: prevProducts.products.map((product) =>
			// 		product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
			// 	),
			// 	loading: false,
			// }));
            get().getProductsByRestaurantId();
		} catch (error) {
			set({ loading: false });
            toast.error("Failed");
		}
	},
}))

export default useProductStore