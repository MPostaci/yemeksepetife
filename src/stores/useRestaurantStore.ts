import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export interface Restaurant {
    id: number;
    name: string;
    address: string;
    phone: string | null;
    image: string;
}

export interface RestaurantUser {
    id: number,
    userId: number,
    restaurantId: number,
}

// interface AddRestaurantParams{
//   name: string;
//   address: string;
//   phone: string | null;
//   imageFile: File | null,
// }

interface RestaurantStore {
    loading: boolean;
    restaurants: Restaurant[] | null;
    restaurantUsers: RestaurantUser[] | null;
    getRestaurants: () => Promise<Restaurant[] | void>;
    getUsersRestaurants: () => Promise<Restaurant[] | void>;
    getRestaurantUsers: () => Promise<RestaurantUser[] | void>
    addRestaurant: (formData: FormData) => Promise<void>;
    deleteRestaurant: (id: number) => Promise<void>;
    addRestaurantUser: (userId: number, restaurantId: number) => Promise<void>;
    updateRestaurantUser: (userId: number, restaurantId: number) => Promise<void>;
}

export const useRestaurantStore = create<RestaurantStore>((set, get) => ({
    loading: false,
    restaurants: null,
    restaurantUsers: null,

    getRestaurants: async () => {
        set({ loading: true });
        try {
            const res = await axios.get("/restaurants/getall");
            set({ restaurants: res.data });
            set({ loading: false });
            console.log("Fetched restaurants:", res.data);
            return res.data;
        } catch (error) {
            toast.error("Failed to fetch restaurants");
            console.error("Error fetching restaurants:", error);
        }
    },

    getUsersRestaurants: async () => {
        try {
            const res = await axios.get("/restaurants/getusersrestaurants");
            set({ restaurants: res.data });
        } catch (error) {
            toast.error("Failed to fetch restaurants");
            console.error("Error fetching restaurants:", error);
        }
    },

    getRestaurantUsers: async () => {
        try {
            const res = await axios.get("/restaurants/getrestaurantusers");
            set({ restaurantUsers: res.data.data})
        } catch (error) {
            toast.error("Failed to fetch restaurant users");
            console.error("Error fetching restaurant users:", error);
        }
    },

    addRestaurant: async (formData: FormData) => {
        set({ loading: true });
        try {
            await axios.post("/restaurants/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            set({ loading: false });
            toast.success("Restoran eklendi");
        } catch (error) {
            toast.error("Failed to add restaurant");
            console.error("Failed to add restaurant", error);
        }
    },

    deleteRestaurant: async (id: number) => {
        set({ loading: true });
        try {
            await axios.post(`/restaurants/delete/${id}`);
            get().getRestaurants();
            set({ loading: false });
        } catch (error) {
            toast.error("Failed to delete restaurant");
            console.error("Failed to delete restaurant", error);
        }
    },

    addRestaurantUser: async (userId: number, restaurantId: number) => {
        try {
            await axios.post(`/restaurants/addrestaurantuser?userid=${userId}&restaurantId=${restaurantId}`)
        } catch (error) {
            
        }
    },
    updateRestaurantUser: async (userId: number, restaurantId: number) => {
        try {
            await axios.post(`/restaurants/updaterestaurantuser?userid=${userId}&restaurantId=${restaurantId}`)
        } catch (error) {
            
        }
    }
}));
