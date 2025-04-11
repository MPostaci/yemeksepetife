import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { useCategoryStore } from "../stores/useCategoryStore"; // adjust the path as needed
import { useEffect } from "react";

const RestaurantListPage: React.FC = () => {
  const { categories, getCategories, deleteCategory } = useCategoryStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

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
							Kategori
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Açıklama
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
                    {categories?.map((category) => (
                        <tr key={category.categoryId} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap place-items-start">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        src={category.image}
                                        alt={category.categoryName}
                                    />
                                </div>
                                <div className="">
                                    <div className="text-sm font-medium text-white">{category.categoryName}</div>
                                </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>
								<div className='text-sm text-gray-300'>{category.description}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteCategory(category.categoryId)}
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

export default RestaurantListPage;
