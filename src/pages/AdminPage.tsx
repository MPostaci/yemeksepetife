import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, ShoppingBasket } from "lucide-react";

// Örnek alt sayfa bileşenleri
import CreateRestaurantForm from "../components/CreateRestaurantForm";
import RestaurantList from "../components/RestaurantList";
import CreateCategoryForm from "../components/CreateCategoryForm";
import CategoryList from "../components/CategoryList";
import SetRestaurantToUser from "../components/SetRestaurantToUser";

interface SubTab {
  id: string;
  label: string;
}

interface MainTab {
  id: string;
  label: string;
  icon: React.ComponentType;
  subTabs: SubTab[];
}

const mainTabs: MainTab[] = [
  {
    id: "restaurant",
    label: "Restoran Ayarları",
    icon: PlusCircle,
    subTabs: [
      { id: "addRestaurant", label: "Restoran Ekle" },
      { id: "listRestaurants", label: "Restoranlar" },
      { id: "setRestaurantToUser", label: "Restoran Ata"}
    ],
  },
  {
    id: "category",
    label: "Kategori Ayarları",
    icon: ShoppingBasket,
    subTabs: [
      { id: "addCategory", label: "Kategori Ekle" },
      { id: "categories", label: "Kategoriler" },
    ],
  },
];

const AdminPage: React.FC = () => {
  // Başlangıçta hiçbir sekme açık olmasın (null).
  // Eğer "restaurant" sekmesi ilk açıldığında aktif olsun isterseniz
  // `useState("restaurant")` yapabilirsiniz.
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);

  // Üst sekmeye tıklandığında toggle mantığı
  const handleMainTabClick = (tabId: string) => {
    if (activeTab === tabId) {
      // Aynı sekmeye tıklandıysa kapat
      setActiveTab(null);
      setActiveSubTab(null);
    } else {
      // Farklı bir sekmeye tıklandıysa onu aç
      setActiveTab(tabId);
      setActiveSubTab(null);
    }
  };

  // Alt sekmeye tıklandığında
  const handleSubTabClick = (subTabId: string) => {
    setActiveSubTab(subTabId);
  };

  // İçeriği render etme
  const renderContent = (): JSX.Element | null => {
    if (activeTab === "restaurant") {
      if (!activeSubTab) return null;

      if (activeSubTab === "addRestaurant") {
        return <CreateRestaurantForm />;
      }
      if (activeSubTab === "listRestaurants") {
        return <RestaurantList />;
      }
      if (activeSubTab === "setRestaurantToUser") {
        return <SetRestaurantToUser />
      }
    }

    if (activeTab === "category") {
      if (!activeSubTab) return null;

      if (activeSubTab === "addCategory") {
        return <CreateCategoryForm />;
      }
      if (activeSubTab === "categories") {
        return <CategoryList />;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-purple-400 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Paneli
        </motion.h1>

        {/* ÜST SEKMELER */}
        <div className="flex justify-center mb-2">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleMainTabClick(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ALT SEKMELER (sadece activeTab dolu ise göster) */}
        {activeTab && (
          <div className="flex justify-center mb-8 ">
            {mainTabs
              .find((t) => t.id === activeTab)
              ?.subTabs.map((subTab) => (
                <button
                  key={subTab.id}
                  onClick={() => handleSubTabClick(subTab.id)}
                  className={`px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                    activeSubTab === subTab.id
                      ? "bg-purple-500 text-white"
                      : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                  }`}
                >
                  {subTab.label}
                </button>
              ))}
          </div>
        )}

        {/* ANA İÇERİK ALANI */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminPage;
