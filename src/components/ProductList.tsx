import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Trash } from "lucide-react";
import { useProductStore } from "../stores/useProductStore"; // adjust the path as needed
import { useCategoryStore } from "../stores/useCategoryStore";
import { useRestaurantStore } from "../stores/useRestaurantStore";

const ProductListPage: React.FC = () => {
    const {
        products,
        getProductsByRestaurantId,
        deleteProduct,
        toggleFeaturedProduct,
    } = useProductStore();
    const { categories, getCategories } = useCategoryStore();
    const { restaurants, getUsersRestaurants} = useRestaurantStore();

    useEffect(() => {
        getProductsByRestaurantId();
    }, [getProductsByRestaurantId]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    useEffect(() => {
        getUsersRestaurants();
    }, [getUsersRestaurants]);

    return (
        <motion.div
            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <table className=" min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Ürün
                        </th>
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
                            Kategori
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Fiyat
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Açıklama
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            Sil
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                            One Cikarilan
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {products?.map((product) => (
                        <tr
                            key={product.productId}
                            className="hover:bg-gray-700"
                        >
                            <td className="px-6 py-4 whitespace-nowrap place-items-start">
                                <div className="flex-shrink-0 h-10 w-10">
                                    <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="">
                                    <div className="text-sm font-medium text-white">
                                        {product.name}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300">
                                    {restaurants?.find((restaurant) => 
                                    restaurant.id == product.restaurantId
                                    )?.name || "Restoran ismi"}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300">
                                    {categories?.find(
                                        (category) =>
                                            category.categoryId ===
                                            product.categoryId
                                    )?.categoryName || "Kategori ismi"}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300">
                                    {product.price}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-300">
                                    {product.description}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    onClick={() =>
                                        deleteProduct(product.productId)
                                    }
                                    className="text-red-400 hover:text-red-300"
                                >
                                    <Trash className="h-5 w-5" />
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() =>
                                        toggleFeaturedProduct(product.productId)
                                    }
                                    className={`p-1 rounded-full ${
                                        product.isFeatured
                                            ? "bg-yellow-400 text-gray-900"
                                            : "bg-gray-600 text-gray-300"
                                    } hover:bg-yellow-500 transition-colors duration-200`}
                                >
                                    <Star className="h-5 w-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};

export default ProductListPage;
