import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookCheck } from "lucide-react";
import { Order } from "../types/Order";
import useProductStore from "../stores/useProductStore";
import { useOrderStore } from "../stores/useOrderStore";

type Props = {
    order: Order;
    expandedOrderId: number | null;
    handleToggle: (orderId: number) => void;
};

export const RestaurantOrderListItem: React.FC<Props> = ({
    order,
    expandedOrderId,
    handleToggle,
}) => {
    const { products, getProducts } = useProductStore();
    const { changeOrderStatus } = useOrderStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const [isDisabled, setIsDisabled] = useState(false);

    const handleClick = () => {
        setIsDisabled(true);

        changeOrderStatus(order.orderId, order.statusHistory[order.statusHistory.length - 1].orderStatusId + 1);

        setTimeout(() => {
            setIsDisabled(false);
        }, 3000);
    };

    return (
        <div
            key={order.orderId}
            onClick={() => handleToggle(order.orderId)}
            className="cursor-pointer border border-gray-700 bg-gray-800 rounded-lg py-4 my-2"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-200">
                    Siparis #{order.orderId}
                </h2>
                <p className="text-sm text-gray-300 sm:pr-5">
                    Siparis Tarihi: {new Date(order.orderDate).toLocaleString()}
                </p>
            </div>
            <div className="flex justify-between items-center">
                <p className="font-medium text-white">
                    Toplam Tutar: {order.totalAmount}₺
                </p>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                    }}
                    disabled={isDisabled}
                    className="cursor-pointer text-blue-800 text-sm sm:pr-5 items-center"
                >
                    <div className=" border bg-indigo-400 hover:bg-indigo-300 rounded-lg px-4 py-2 w-52">
                        {(() => {
                            const latestStatus =
                                order.statusHistory[
                                    order.statusHistory.length - 1
                                ].orderStatusId;
                            if (latestStatus === 1) {
                                return (
                                    <div className="flex flex-col items-center">
                                        <BookCheck />
                                        <span>
                                            Siparis Hazirlanmaya Baslaniyor
                                        </span>
                                    </div>
                                );
                            } else if (latestStatus === 2) {
                                return (
                                    <div className="flex flex-col items-center">
                                        <BookCheck />
                                        <span>
                                            Siparis Kuryeye Teslim Edildi
                                        </span>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="flex flex-col items-center">
                                        <BookCheck />
                                        <span>Siparis Gonderildi</span>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                </button>
            </div>
            <AnimatePresence>
                {expandedOrderId === order.orderId && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                        }}
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
};

export default RestaurantOrderListItem;
