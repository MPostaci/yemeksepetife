import { useEffect } from "react";
import { useCategoryStore } from "../stores/useCategoryStore";
import useProductStore from "../stores/useProductStore";
import { useRestaurantStore } from "../stores/useRestaurantStore";
import { motion } from "framer-motion";
import ProductCart from "./ProductCart";
import { useParams } from "react-router-dom";

const RestaurantItemList = () => {
    const { categories, getCategories } = useCategoryStore();
    const { products, getProducts} = useProductStore();
    const { restaurants, getRestaurants} = useRestaurantStore()

    useEffect(() => {
      getCategories();
      getProducts();
      getRestaurants();
    }, [getCategories, getProducts, getRestaurants]);

    const { id: paramRestaurantId } = useParams<{ id: string }>();

    const categoriesWithProducts = categories?.filter((category) =>
      products?.some((product) => product.categoryId === category.categoryId)
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
                    {restaurants?.find((restaurant) => restaurant.id === Number(paramRestaurantId))?.name}
                </motion.h1>
                {products?.length === 0 ? (
                    <h2 className="text-3xl font-semibold text-gray-300 text-center">
                        Kayıtlı Ürün Bulunamadı
                    </h2>
                ) : (
                  categoriesWithProducts?.map((category) => {
                        const categoryProducts = products?.filter(
                            (product) => product.categoryId === category.categoryId
                        );
                        return (
                            <motion.div
                                key={category.categoryId}
                                className="mb-12"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-semibold text-indigo-400 mb-4">
                                    {category.categoryName}
                                </h2>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                                    {categoryProducts?.map((product) => (
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

export default RestaurantItemList;
