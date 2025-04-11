import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Order } from "../types/Order";
import { ArrowDown, ArrowUp } from "lucide-react";
import useProductStore from "../stores/useProductStore";

interface OrderItemProps {
    order: Order;
}

const statuses = [
    { id: 1, label: "Iletildi" },
    { id: 2, label: "Hazirlaniyor" },
    { id: 3, label: "Yolda" },
    { id: 4, label: "Teslim Edildi" },
    // { id: 5, label: "Onaylandi" },
    // { id: 5, label: "Reddedildi" },
];

export function OrderItem({ order }: OrderItemProps) {
    const { products, getProducts } = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const [expanded, setExpanded] = useState(false);

    const latestStatus = order.statusHistory[order.statusHistory.length - 1];
    const currentStatusId = latestStatus.orderStatusId || 1;

    const totalSteps = statuses.length;
    const currentStepIndex = statuses.findIndex(
        (s) => s.id === currentStatusId
    );

    const index = currentStepIndex === -1 ? 0 : currentStepIndex;

    const progressPercent = ((index + 1) / (totalSteps - 1)) * 100;

    const handleToggle = () => {
        setExpanded((prev) => !prev);
    };


    return (
        <div className="border dark:border-gray-700 rounded-lg py-4 my-2">
            <div className="flex justify-between items-center">
                <img
                    className="h-18 ml-2"
                    src={
                        products?.find(
                            (product) =>
                                product.productId ===
                                order.orderDetails[0].productId
                        )?.image
                    }
                    alt="Product Image"
                />
                <div>
                    <h2 className="text-lg font-semibold text-gray-200">
                        Siparis #{order.orderId}
                    </h2>
                    <p className="text-sm text-gray-300">
                        Siparis Tarihi:{" "}
                        {new Date(order.orderDate).toLocaleString()}
                    </p>
                </div>
                <p className="mt-1 font-medium text-white">
                    Toplam Tutar: {order.totalAmount}₺
                </p>
                <button
                    onClick={handleToggle}
                    className="text-blue-500 hover:underline text-sm pr-5 pt-5 pb-5 pl-5"
                >
                    {expanded ? <ArrowUp /> : <ArrowDown />}
                </button>
            </div>

            <div className="mt-3">
                <div className="relative w-full h-2 bg-gray-700 rounded">
                    <div
                        className="absolute top-0 left-0  h-2 bg-purple-400 rounded"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {statuses.map((status) => (
                        <span key={status.id}>{status.label}</span>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4"
                    >
                        <div className=" dark:bg-gray-800 rounded p-3">
                            <h3 className="text-sm font-bold mb-2 text-gray-300">
                                Siparis Detaylari
                            </h3>
                            <ul className="space-y-1 text-white">
                                {order.orderDetails.map((detail: any) => (
                                    <li
                                        key={detail.orderDetailId}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        {
                                            products?.find(
                                                (product) =>
                                                    product.productId ===
                                                    detail.productId
                                            )?.name
                                        }
                                        <span>
                                            x{detail.quantity} @ {detail.price}₺
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
