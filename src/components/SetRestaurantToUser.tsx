import { useEffect, useState } from "react";
import { useRestaurantStore } from "../stores/useRestaurantStore";
import { useUserStore } from "../stores/useUserStore";

const SetRestaurantToUser = () => {
    const {
        restaurants,
        restaurantUsers,
        getRestaurantUsers,
        getRestaurants,
        addRestaurantUser,
        updateRestaurantUser,
    } = useRestaurantStore();
    const { users, getUsersOfCertainRole } = useUserStore();
    useEffect(() => {
        getRestaurants();
        getUsersOfCertainRole("Restaurant");
        getRestaurantUsers();
    }, [getRestaurants, getUsersOfCertainRole, getRestaurantUsers]);

    const [selectedUsers, setSelectedUsers] = useState<{
        [key: number]: string;
    }>({});

    return (
        <div>
            <table className=" min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Restoran
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Kullanici
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Ata
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants?.map((restaurant) => {
                        // Find the currently assigned user for this restaurant
                        const assignedUserId = restaurantUsers?.find(
                            (ru) => ru.restaurantId === restaurant.id
                        )?.userId;

                        // If user has changed selection, use that; otherwise use the assignedUserId
                        const selectedUser =
                            selectedUsers[restaurant.id] ??
                            assignedUserId ??
                            "";

                        return (
                            <tr
                                key={restaurant.id}
                                className="hover:bg-gray-700"
                            >
                                <td className="px-6 py-4 whitespace-nowrap place-items-start">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={restaurant.image}
                                            alt={restaurant.name}
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">
                                            {restaurant.name}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">
                                        <select
                                            value={selectedUser}
                                            onChange={(e) =>
                                                setSelectedUsers((prev) => ({
                                                    ...prev,
                                                    [restaurant.id]:
                                                        e.target.value,
                                                }))
                                            }
                                            className="mt-1 block w-full bg-gray-700 border border-gray-600 
                       rounded-md shadow-sm py-2 px-3 text-white 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       focus:border-purple-500"
                                        >
                                            {/* Optional "placeholder" if no user is assigned */}
                                            <option value="" disabled>
                                                Select a user
                                            </option>

                                            {/* Render all users, or filter them as needed */}
                                            {users?.map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const userToAssign =
                                                selectedUsers[restaurant.id] ??
                                                assignedUserId;
                                            if (assignedUserId) {
                                                updateRestaurantUser(
                                                    Number(userToAssign),
                                                    restaurant.id
                                                );
                                            } else {
                                                addRestaurantUser(
                                                    Number(userToAssign),
                                                    restaurant.id
                                                );
                                            }
                                            // The user to assign is whatever is currently selected
                                            // or fallback to the original assigned user if unchanged
                                        }}
                                        className="w-full flex justify-center py-2 px-4 
                     border border-transparent rounded-md shadow-sm 
                     text-sm font-medium text-white bg-purple-600 
                     hover:bg-purple-700 focus:outline-none 
                     focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                    >
                                        Ata
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SetRestaurantToUser;
