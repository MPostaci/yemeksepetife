import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCart: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useUserStore();
  const { cart, updateQuantity } = useCartStore();

  const storeQuantity =
    cart?.items.find((item) => item.productId === product.productId)
      ?.quantity || 0;

  const [quantity, setQuantity] = useState<number>(storeQuantity);

  useEffect(() => {
    setQuantity(storeQuantity);
  }, [storeQuantity]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    const newQuantity = 1;
    setQuantity(newQuantity);
    updateQuantity(product.productId, newQuantity);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product.productId, newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateQuantity(product.productId, newQuantity);
  };

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
      <div className="relative mx-3 mt-3 flex h-30 overflow-hidden rounded-xl">
        <img
          className="object-cover w-full"
          src={product.image}
          alt="product image"
        />
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-indigo-400">
              {product.price}₺
            </span>
          </p>
        </div>
        {quantity !== 0 ? (
          <div className="flex items-center justify-between md:order-3 md:justify-center">
            <div className="flex items-center gap-2">
              <button
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border
                  border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
                  focus:ring-indigo-500"
                onClick={handleDecrease}
              >
                <Minus className="text-gray-300" />
              </button>
              <p className="text-white text-2xl">{quantity}</p>
              <button
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border
                  border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
                  focus:ring-2 focus:ring-indigo-500"
                onClick={handleIncrease}
              >
                <Plus className="text-gray-300" />
              </button>
            </div>
          </div>
        ) : (
          <button
            className="flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium
              text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 md:justify-center"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={22} className="mr-2" />
            Sepete Ekle
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCart;
