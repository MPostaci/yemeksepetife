import { Minus, Plus, Trash } from "lucide-react";
import useCartStore from "../stores/useCartStore";

interface CartItem {
    productId: number;
    productName: string;
    productPrice: number;
    productDescription: string;
    quantity: number;
    productImage: string;
  }

interface CartItemProps {
    cartItems: CartItem[];
}

const CartItem: React.FC<CartItemProps> = ({ cartItems }) => {
    const { updateQuantity, removeFromCart } = useCartStore();

    return cartItems.map((item) => {
        return (
            <div className="rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <div className="shrink-0 md:order-1">
                        <img
                            className="h-20 md:h-32 rounded object-cover"
                            src={item.productImage}
                        />
                    </div>
                    <label className="sr-only">Adet Seciniz:</label>

                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center gap-2">
                            <button
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                                    border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
                                    focus:ring-indigo-500"
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            >
                                <Minus className="text-gray-300" />
                            </button>
                            <p className="text-white">{item.quantity}</p>
                            <button
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                                    border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
                                focus:ring-2 focus:ring-indigo-500"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                                <Plus className="text-gray-300" />
                            </button>
                        </div>

                        <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-indigo-400">
                                {(item.productPrice * item.quantity).toFixed(2)}₺
                            </p>
                        </div>
                    </div>
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <p className="text-base font-medium text-white hover:text-indigo-400 hover:underline">
                            {item.productName}
                        </p>
                        <p className="text-sm text-gray-400">
                            {item.productDescription}
                        </p>

                        <div className="flex items-center gap-4">
                            <button
                                className="inline-flex items-center text-sm font-medium text-red-400
                                    hover:text-red-300 hover:underline"
                                onClick={() => removeFromCart(item.productId)}
                            >
                                <Trash />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
};
export default CartItem;
