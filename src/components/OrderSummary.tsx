import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import { useOrderStore } from "../stores/useOrderStore";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
    const { cart, clearCart } = useCartStore();
	const { createOrder } = useOrderStore();
    const subTotal = cart?.items.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
    );

    const navigate = useNavigate();
    const handlePayment = async () => {
        try {
            await createOrder();
            clearCart();
            navigate("/purchase-success")
            console.log("Order created successfully!");
        } catch (error) {
            console.error("Failed to create order:", error);
        }
    };
    return (
        <motion.div
            className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <p className="text-xl font-semibold text-emerald-400">
                Sipariş Özeti
            </p>

            <div className="space-y-4">
                <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-300">
                            Toplam Tutar
                        </dt>
                        <dd className="text-base font-medium text-white">
                            {subTotal}₺
                        </dd>
                    </dl>
                </div>
                {/* Credit card info tab */}

                <motion.button
                    className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePayment}
                >
                    Ödemeyi Tamamla
                </motion.button>

                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-400">
                        or
                    </span>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
                    >
                        Alışverişe Devam Et
                        <MoveRight size={16} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderSummary;
