import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Lock, LogOut, UserPlus, LogIn, Album } from "lucide-react"; // Import your ShoppingCart icon component
import { useUserStore } from "../stores/useUserStore";
import useCartStore from "../stores/useCartStore";

const Navbar = () => {
    const { user, logout } = useUserStore();
    const { cart } = useCartStore();
    const isAdmin = user?.role === "Admin";
    const isRestaurant = user?.role === "Restaurant";

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Set the threshold for when the navbar should shrink (e.g., 50px)
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full bg-gray-950 z-50 transition-all duration-300 ${
                isScrolled ? "py-2" : "py-4"
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo and Tagline */}
                    <div className="flex flex-col">
                        <Link
                            to="/"
                            className="text-3xl bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text font-extrabold text-transparent"
                        >
                            Yiyeceksizsiniz
                        </Link>
                        {/* Conditionally render the tagline */}
                        {!isScrolled && (
                            <p className="bg-gradient-to-r from-pink-500 to-100% bg-clip-text text-sm font-bold text-transparent">
                                Açlığınız kaybolacak
                            </p>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center gap-4">
                    {user && (
                            <Link
                                to="/orderhistory"
                                className="relative group text-gray-300 hover:text-pink-400 transition-colors duration-300 ease-in-out"
                            >
                                <Album className="inline-block mr-1 group-hover:text-pink-400" />
                                <span className="hidden sm:inline">Siparişlerim</span>
                            </Link>
                        )}
                        {user && (
                            <Link
                                to="/cart"
                                className="relative group text-gray-300 hover:text-pink-400 transition-colors duration-300 ease-in-out"
                            >
                                <ShoppingCart className="inline-block mr-1 group-hover:text-pink-400" />
                                <span className="hidden sm:inline">Sepet</span>
                                <span className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-pink-400 transition duration-300 ease-in-out">
                                    {cart?.items.length}
                                </span>
                            </Link>
                        )}
                        {isAdmin && (
                            <Link
                                className="bg-pink-700 hover:bg-pink-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                                to={"/admin-dashboard"}
                            >
                                <Lock
                                    className="inline-block mr-1 mb-1"
                                    size={18}
                                />
                                <span className="hidden sm:inline">Panel</span>
                            </Link>
                        )}
                        {isRestaurant && (
                            <Link
                                className="bg-pink-700 hover:bg-pink-500 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                                to={"/restaurant-dashboard"}
                            >
                                <Lock
                                    className="inline-block mr-1 mb-1"
                                    size={18}
                                />
                                <span className="hidden sm:inline">Panel</span>
                            </Link>
                        )}
                        {user ? (
                            <button
                                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4
                rounded-md flex items-center transition duration-300 ease-in-out"
                                onClick={logout}
                            >
                                <LogOut size={18} />
                                <span className="hidden sm:inline ml-2">
                                    Çıkış Yap
                                </span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    className="bg-pink-700 hover:bg-pink-500 text-white px-4 py-2
                                    rounded-md flex items-center transition duration-300 ease-in-out"
                                >
                                    <UserPlus className="mr-2" size={18} />
                                    Kayıt Ol
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-pink-700 hover:bg-pink-500 text-white px-4 py-2
                                    rounded-md flex items-center transition duration-300 ease-in-out"
                                >
                                    <LogIn className="mr-2" size={18} />
                                    Giriş Yap
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
