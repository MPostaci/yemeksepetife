import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

interface CartItem {
    productId: number;
    productName: string;
    productPrice: number;
    productDescription: string;
    quantity: number;
    productImage: string;
  }

interface Cart {
    cartId: number;
    restaurantId: number;
    restaurantName: string;
    items: CartItem[];
}

interface CartStore{
    loading: boolean,
    total: number,
    cart: Cart | null,
    getCartItems: () => Promise<void>,
    updateQuantity: (productId: number, quantity: number) => Promise<void>,
    removeFromCart: (productId: number) => Promise<void>,
    calculateTotals: () => Promise<number>,
    clearCart: () => Promise<void>;
}


export const useCartStore = create<CartStore>((set, get) => ({
    loading: false,
    total: 0,
    cart: null,

    getCartItems: async () => {
        set({loading: true});
        try {
            var result = await axios.get<Cart>("/carts/getcartbyuserid");
            set({ cart: result.data, loading: false});
        } catch (error) {
            toast.error("Failed to get cart items");
            console.error("Failed to get cart items", error);
            set({loading: false});
        }
    },

    updateQuantity: async (productId: number, quantity: number) => {
        set({loading: true})
        if(quantity === 0){
            get().removeFromCart(productId);
            return;
        }

        try {
            await axios.post(`/carts/additemtocart/?productId=${productId}&quantity=${quantity}`);
            set((prevState) => ({
                loading: false,
                cart: prevState.cart
                  ? {
                      ...prevState.cart,
                      items: prevState.cart.items.map((item) =>
                        item.productId === productId ? { ...item, quantity } : item
                      ),
                    }
                  : null,
              }));
        } catch (error) {
            toast.error("Failed to update quantity");
            console.error("Failed to update quantity", error);
            set({ loading: false });
        }
    },
    removeFromCart: async (productId: number) => {
        set({loading: true});
        try {
            await axios.post(`/carts/removeitemfromcart/${productId}`);
            set((prevState) => ({
                loading: false,
                cart: prevState.cart
                    ? {
                        ...prevState.cart,
                        items: prevState.cart.items.filter((item) => item.productId !== productId),
                    }
                    : null,
            }));
        } catch (error) {
            toast.error("Failed to update quantity");
            console.error("Failed to update quantity", error);
            set({ loading: false });
        }
    },

    calculateTotals: async () => {
        const { cart } = get();

        const subTotal = cart?.items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0); 
        
        return subTotal ?? 0;
    },
    clearCart: async () => {
        try {
            await axios.post("/carts/clearcart");
        } catch (error) {
            toast.error("Failed to clear cart");
            console.error("Failed to clear cart", error);
        }
    }
}))

export default useCartStore