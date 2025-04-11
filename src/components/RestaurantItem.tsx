import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Restaurant{
    id: number,
    name: string,
    image: string,
}

interface RestaurantItemProps {
    restaurants: Restaurant[] | null;
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({restaurants}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    //go to restaurant

    useEffect (() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else if (window.innerHeight < 1280) setItemsPerPage(3);
            else setItemsPerPage(4);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    };

    const isStartDisabled = currentIndex === 0;
    const isEndDisabled = currentIndex >= (restaurants?.length ?? 0) - itemsPerPage;
  return (
    <div className="py-12">
        <div className="container mx-auto px-4">
            <h2 className="text-center text-5xl sm:text-6xl font-bold text-indigo-400 mb-4">Restoranlar</h2>
            <div className="relative">
                <div className="overflow-hidden">
                    <div className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translate(-${currentIndex * (100/ itemsPerPage)}%)`}}
                    >
                        {restaurants?.map((restaurant) => (
                        
                            <div key={restaurant.id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2">
                                <Link to={`/restaurants/${restaurant.id}`}>
                                <div className="bg-white backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-purple-500/30">
                                    <div className="overflow-hidden">
                                        <img
                                            src={restaurant.image}
                                            alt={restaurant.name}
                                            className = "w-full h-24 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                        />
                                        <h3 className="text-lg font-semibold mb-2 text-indigo-900">{restaurant.name}</h3>
                                    </div>
                                </div>
                                </Link>

                            </div>
                                      
                            
                        ))}
                    </div>
                </div>

                <button
						onClick={prevSlide}
						disabled={isStartDisabled}
						className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
							isStartDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
						}`}
					>
						<ChevronLeft className='w-6 h-6' />
					</button>

					<button
						onClick={nextSlide}
						disabled={isEndDisabled}
						className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
							isEndDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
						}`}
					>
						<ChevronRight className='w-6 h-6' />
					</button>
            </div>
        </div>
    </div>
    
  );

};

export default RestaurantItem;