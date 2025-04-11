import { useEffect } from "react";
import useProductStore from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { useCategoryStore } from "../stores/useCategoryStore";
import slugify from "slugify";
import { motion } from "framer-motion";
import ProductCart from "../components/ProductCart";
import { useRestaurantStore } from "../stores/useRestaurantStore";

const CategoryPage = () => {
    const { products, getProductsByCategoryId } = useProductStore();
    const { categories, getCategories } = useCategoryStore();
    const { restaurants, getRestaurants } = useRestaurantStore();
    const { category: categoryParam } = useParams();

    useEffect(() => {
        getCategories();
        getRestaurants();
    }, [getCategories, getRestaurants]);

    const matchingCategory = categories?.find(
        (cat) =>
            slugify(cat.categoryName, { lower: true, strict: true }) === categoryParam
    );

    useEffect(() => {
        if (matchingCategory) {
            getProductsByCategoryId(matchingCategory.categoryId);
        }
    }, [getProductsByCategoryId, matchingCategory]);

    // Only include restaurants that have products for the current category
    const restaurantsWithProducts = restaurants?.filter((restaurant) =>
        products?.some((product) => product.restaurantId === restaurant.id)
    );

    return (
        <div className="min-h-screen">
            <div className="relative z-10 max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.h1
                    className="text-center text-4xl sm:text-5xl font-bold text-indigo-400 mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {matchingCategory?.categoryName}
                </motion.h1>
                {products?.length === 0 || !restaurantsWithProducts?.length ? (
                    <h2 className="text-3xl font-semibold text-gray-300 text-center">
                        Kayıtlı Ürün Bulunamadı
                    </h2>
                ) : (
                    restaurantsWithProducts.map((restaurant) => {
                        const restaurantProducts = products?.filter(
                            (product) => product.restaurantId === restaurant.id
                        );
                        return (
                            <motion.div
                                key={restaurant.id}
                                className="mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-semibold text-indigo-400 mb-4">
                                    {restaurant.name}
                                </h2>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                                    {restaurantProducts?.map((product) => (
                                        <ProductCart key={product.productId} product={product} />
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

export default CategoryPage;
