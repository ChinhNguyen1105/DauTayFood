import React from "react";
import { ShoppingCart, Eye, Star, TrendingUp } from "lucide-react";

const ButtonCart = ({ onClick, children = "Thêm vào giỏ hàng" }) => (
  <button
    onClick={onClick}
    className="bg-[#ff8c96] flex justify-center items-center flex-row gap-8 text-white font-bold sm:text-[1.1rem] text-sm sm:px-8 px-2 py-3 rounded-md shadow hover:bg-[#ff5c7a] transition duration-200"
  >
    <ShoppingCart size={18} />
    {children}
  </button>
);

export default ButtonCart;
