import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import RestaurantPage from "./pages/RestaurantPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import useCartStore from "./stores/useCartStore";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
    const { user } = useUserStore();
    const checkAuth = useUserStore((state) => state.checkAuth);
    const checkingAuth = useUserStore((state) => state.checkingAuth);
    const { getCartItems } = useCartStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect (() => {
        if( !user ) return;
        getCartItems();
      }, [ getCartItems, user ]);

    if (checkingAuth) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gray-900 relative overflow-hidden">
            <div className="relative z-50 pt-20"></div>

            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to='/' />} />
                <Route path="/login" element={!user ? <LoginPage /> : <Navigate to='/' />} />
                <Route path="/admin-dashboard" element={user?.role === "Admin" ? <AdminPage /> : <Navigate to='/login' />} />
                <Route path="/restaurant-dashboard" element={user?.role === "Restaurant" ? <RestaurantPage /> : <Navigate to='/login' />} />
                <Route path="/cart" element={user ? <CartPage /> : <Navigate to='/login' />} />
                <Route path="/category/:category" element={ <CategoryPage /> } />
                <Route path="/orderhistory" element={user ? <OrderHistoryPage /> : <Navigate to='/login' />} />
                <Route path="/restaurants/:restaurantId" element={ <RestaurantMenuPage /> } />
                <Route path="/purchase-success" element={ <PurchaseSuccessPage />} />
            </Routes>
        </div>
    );
}

export default App;
