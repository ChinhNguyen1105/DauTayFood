// hooks/useSelectedProduct.js
import { useState } from "react";

export default function useSelectedProduct() {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpen = (product) => setSelectedProduct(product);
    const handleClose = () => setSelectedProduct(null);

    return { selectedProduct, handleOpen, handleClose };
}
