import { useEffect } from "react";
import { OrderItem } from "../components/OrderItem";
import { useOrderStore } from "../stores/useOrderStore";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const OrderHistoryPage = () => {
    const { orders, getOrders, loading } = useOrderStore();

    useEffect(() => {
      getOrders();
    }, [getOrders]);

    if(loading) {
      return < LoadingSpinner />
    }

    if(orders == null){
      <EmptyCartUI />
    }
    
    console.log("Orders from store:", orders);
    return (
      
        <div className="mx-auto max-w-2xl space-y-4">
          {orders == null ? (
            <EmptyCartUI />
          ) : (
            orders?.map((order) => (
                  <OrderItem key={order.orderId} order={order} />
              ))
            
          )}
        </div>
    );
};

export default OrderHistoryPage;

const EmptyCartUI = () => (
	<motion.div
		className='flex flex-col items-center justify-center space-y-4 py-16'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<ShoppingCart className='h-24 w-24 text-gray-300' />
		<h3 className='text-2xl font-semibold '>Sepetin Boş</h3>
		<p className='text-gray-400'>Görünüşe göre henüz sepetine bir şey eklememişsin.</p>
		<Link
			className='mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600'
			to='/'
		>
			Aradığın Lezzeti Bul
		</Link>
	</motion.div>
);