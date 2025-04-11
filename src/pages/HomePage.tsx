import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useRestaurantStore } from "../stores/useRestaurantStore"
import RestaurantItem from "../components/RestaurantItem";
import { useCategoryStore } from "../stores/useCategoryStore"

const Homepage = () => {
  const { restaurants, getRestaurants } = useRestaurantStore();
  const { categories, getCategories } = useCategoryStore();

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-indigo-400 mb-4">
          Kategorilere Göz At
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          İstediğin mutfağı seç aradığın lezzeti bul
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(categories?.length ?? 0) > 0 && <CategoryItem categories={categories ?? []} />}

        </div>
      </div>
      
        {(restaurants?.length ?? 0) > 0 && <RestaurantItem restaurants={restaurants} />}
    </div>
    

  )
}

export default Homepage