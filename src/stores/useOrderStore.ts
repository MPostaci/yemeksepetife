
import toast from "react-hot-toast";
import { create } from "zustand"
import axios from "../lib/axios";
import { Order } from "../types/Order";

interface OrderStore{
    orders: Order[] | null;
    loading: boolean;
    getOrders: () => Promise<Order[] | void>;
    getUsersRestaurantsOrders: () => Promise<Order[] | void>;
    createOrder: () => Promise<void>;
    changeOrderStatus: (orderId: number, statusId: number) => Promise<void>;
}


export const useOrderStore = create<OrderStore>((set, get) => ({
    orders: null,
    loading: false,

    getOrders: async () => {
        set({ loading: true});
        try {
            const res = await axios.get("/orders/getordersbyuserid");
            set({ orders: res.data.data , loading: false});
            return res.data;
        } catch (error) {
            toast.error("Failed to get orders");
            console.error("Failed to get orders", error);
        }
    },

    getUsersRestaurantsOrders: async () => {
        try {
            const res = await axios.get("orders/getusersrestaurantsorders");
            set({ orders: res.data})
        } catch (error) {
            toast.error("Failed to user's restaurants' orders");
            console.error("Failed to user's restaurants' orders", error);
        }
    },

    createOrder: async () =>{
        try {
            await axios.post("/orders/createorder");
        } catch (error) {
            toast.error("Failed to create order");
            console.error("Failed to create order", error);
        }
    },
    changeOrderStatus: async ( orderId: number, statusId: number ) => {
        try {
            await axios.post(`/orders/changeorderstatus?orderId=${orderId}&statusId=${statusId}`);
        } catch (error) {
            toast.error("Failed to change order status");
            console.error("Failed to change order status", error);
        }
    },
}))
