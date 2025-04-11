import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { useRestaurantStore } from "../stores/useRestaurantStore"; // adjust the path as needed

const RestaurantList: React.FC = () => {
  const { restaurants, getRestaurants, deleteRestaurant } = useRestaurantStore();

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  return (
    <motion.div
			className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className=' min-w-full divide-y divide-gray-700'>
				<thead className='bg-gray-700'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Restoran
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Adres
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Telefon
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Sil
						</th>
					</tr>
				</thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {restaurants?.map((restaurant) => (
                        <tr key={restaurant.id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap place-items-start">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        src={restaurant.image}
                                        alt={restaurant.name}
                                    />
                                </div>
                                <div className="">
                                    <div className="text-sm font-medium text-white">{restaurant.name}</div>
                                </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>{restaurant.address}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>{restaurant.phone}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteRestaurant(restaurant.id)}
									className='text-red-400 hover:text-red-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    // <div style={{ padding: "1rem" }}>
    //   <h1>Restaurants</h1>
    //   {restaurants ? (
    //     <ul>
    //       {restaurants.map((restaurant: Restaurant) => (
    //         <li key={restaurant.id} style={{ marginBottom: "1rem" }}>
    //           <h2>{restaurant.name}</h2>
    //           <p>{restaurant.address}</p>
    //           <p>{restaurant.phone ?? "No phone available"}</p>
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>Loading restaurants...</p>
    //   )}
    // </div>
  );
};

export default RestaurantList;
