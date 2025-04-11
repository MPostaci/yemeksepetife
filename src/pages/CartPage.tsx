import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../stores/useCartStore";
import CartItem from "../components/CartItem";
import { useEffect, useState } from "react";
import OrderSummary from "../components/OrderSummary";

const CartPage = () => {
    const { cart, getCartItems } = useCartStore();

    const storeQuantity =
        cart?.items.length || 0;
    
      const [quantity, setQuantity] = useState<number>(storeQuantity);
    
      useEffect(() => {
        setQuantity(storeQuantity);
      }, [storeQuantity]);

    useEffect (() => {
        getCartItems();
    },[getCartItems])

  return (
    <div className="py-8 md:py-16">
        <div className="mx-auto px-4 2xl:px-0">
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                <motion.div
                    className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {quantity == 0 ? (
                        <EmptyCartUI />
                    ) : (
                        <div className="space-y-6">
                            <h3 className="text-start text-3xl sm:text-4xl font-bold text-indigo-400 mb-4 ml-10">
                                {cart?.restaurantName}
                            </h3>
                            {(cart?.items.length ?? 0) > 0 && <CartItem cartItems={cart?.items ?? []} />}

                        </div>
                    )}
                </motion.div>
                {quantity != 0 && (
						<motion.div
							className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<OrderSummary />
						</motion.div>
					)}
            </div>
        </div>
    </div>
  )
}

export default CartPage

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