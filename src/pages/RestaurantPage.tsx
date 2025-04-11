import { motion } from "framer-motion"
import { CircleArrowDown, PlusCircle, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import CreateProductForm from "../components/CreateProductForm";
import ProductList from "../components/ProductList";
import RestaurantOrderList from "../components/RestaurantOrderList";

const tabs = [
	{ id: "create", label: "Ürün Ekle", icon: PlusCircle },
	{ id: "products", label: "Ürünler", icon: ShoppingBasket },
    { id: "list-orders", label: "Siparisler", icon: CircleArrowDown},
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("list-orders");

  return (
    <div className="min-h-screen relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16">
            <motion.h1
                    className="text-4xl font-bold mb-8 text-indigo-400 text-center"
                    initial={{ opacity: 0, y: -20}}
                    animate={{ opacity: 1, y: 0}}
                    transition={{ duration: 0.8}}
            >
                Restoran Paneli
            </motion.h1>

            <div className="flex justify-center mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                            activeTab === tab.id
                                ? "bg-purple-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                    >
                        <tab.icon className="mr-2 h-5 w-5" />
                        {tab.label}
                    </button>
                ))}
            </div>
            {activeTab === "create" && <CreateProductForm />}
            {activeTab === "products" && <ProductList />}
            {activeTab === "list-orders" && <RestaurantOrderList />}
        </div>
    </div>
  )
}

export default AdminPage