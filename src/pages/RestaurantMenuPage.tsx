import { useEffect } from "react";
import { useCategoryStore } from "../stores/useCategoryStore";
import useProductStore from "../stores/useProductStore";
import { useRestaurantStore } from "../stores/useRestaurantStore";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import ProductCart from "../components/ProductCart";

const RestaurantMenuPage = () => {
    const { categories, getCategories } = useCategoryStore();
    const { products, getProducts } = useProductStore();
    const { restaurants, getRestaurants } = useRestaurantStore();

    useEffect(() => {
        getCategories();
        getProducts();
        getRestaurants();
    }, [getCategories, getProducts, getRestaurants]);

    const { restaurantId = "" } = useParams();

    const productsOfRestaurant = products?.filter(
        (product) => product.restaurantId == Number(restaurantId)
    );
    const restaurantsProductsCategories = categories?.filter((category) =>
        productsOfRestaurant?.some(
            (product) => category.categoryId === product.categoryId
        )
    );
    console.log(productsOfRestaurant?.length);
    console.log(restaurantsProductsCategories?.length);
    return (
        <div className="min-h-screen">
            <div className="relative z-10 max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.h1
                    className="text-center text-4xl sm:text-5xl font-bold text-indigo-400 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {
                        restaurants?.find(
                            (restaurant) =>
                                restaurant.id === Number(restaurantId)
                        )?.name
                    }
                </motion.h1>
                {products?.length === 0 ? (
                    <h2 className="text-3xl font-semibold text-gray-300 text-center">
                        Kayıtlı Ürün Bulunamadı
                    </h2>
                ) : (
                    restaurantsProductsCategories?.map((category) => {
                        return (
                            <motion.div
                                key={category.categoryName}
                                className="mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-semibold text-indigo-400 mb-4">
                                    {category.categoryName}
                                </h2>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                                    {productsOfRestaurant
                                        ?.filter(
                                            (product) =>
                                                product.categoryId ===
                                                category.categoryId
                                        )
                                        .map((product) => (
                                            <ProductCart
                                                key={product.productId}
                                                product={product}
                                            />
                                        ))}
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default RestaurantMenuPage;
