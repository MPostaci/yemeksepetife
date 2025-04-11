import { useEffect, useState } from "react";
import { useOrderStore } from "../stores/useOrderStore";
import { useRestaurantStore } from "../stores/useRestaurantStore";

import RestaurantOrderListItem from "./RestaurantOrderListItem";

const RestaurantOrderList = () => {
    const { orders, getUsersRestaurantsOrders } = useOrderStore();
    const { restaurants, getUsersRestaurants } = useRestaurantStore();

    useEffect(() => {
        console.log("Orders:", orders);
    }, [orders]);

    useEffect(() => {
        getUsersRestaurantsOrders();
        getUsersRestaurants();
    }, [getUsersRestaurantsOrders, getUsersRestaurants]);

    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
    const handleToggle = (orderId: number) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    const [selectedRestaurant, setSelectedRestaurant] = useState<{
        restaurantId?: string;
    }>({});

    console.log(selectedRestaurant.restaurantId);

    return (
        <div className="">
            <select
                id="restaurant"
                name="restaurant"
                onChange={(e) =>
                    setSelectedRestaurant({ restaurantId: e.target.value })
                }
                className="mt-1 block w-fit bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
            px-3 text-white focus:outline-none focus:ring-2
            focus:ring-purple-500 focus:border-purple-500 place-self-end"
                required
            >
                <option value="">Bir restoran seciniz</option>
                {restaurants?.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                        {restaurant.name}
                    </option>
                ))}
            </select>
            <div className="border border-gray-700 rounded-sm px-2 my-2 bg-gray-700">
                {selectedRestaurant.restaurantId !== "" &&
                    orders
                        ?.filter(
                            (order) =>
                                order.restaurantId ===
                                Number(selectedRestaurant.restaurantId)
                        )
                        .map((order) => (
                            <RestaurantOrderListItem
                                key={order.orderId}
                                order={order}
                                expandedOrderId={expandedOrderId}
                                handleToggle={() => handleToggle(order.orderId)}
                            />
                        ))}
            </div>
        </div>
    );
};

export default RestaurantOrderList;
