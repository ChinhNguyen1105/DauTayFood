import { useContext } from "react";
import CartContext from "../context/CartContext";

const useCart = () => {
    const ctx = useContext(CartContext);
    console.log("useCart context:", ctx);
    return ctx;
};

export default useCart;
