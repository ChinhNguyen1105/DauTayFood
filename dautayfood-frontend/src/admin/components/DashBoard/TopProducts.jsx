import React, { useMemo } from 'react';
import { useProducts } from '../../contexts/ProductsContext';
import { useOrders } from '../../contexts/OrdersContext';

const TopProducts = () => {
    const { products } = useProducts();
    const { orders } = useOrders();

    const topProducts = useMemo(() => {
        // Create a map to store product sales quantities
        const salesMap = new Map();

        // Count product quantities from completed orders
        orders.forEach(order => {
            if (order.status === 'completed') {
                order.items.forEach(item => {
                    const currentQty = salesMap.get(item.productId) || 0;
                    salesMap.set(item.productId, currentQty + item.quantity);
                });
            }
        });

        // Combine with product details and sort
        const productSales = products.map(product => ({
            id: product.id,
            name: product.name,
            image: product.image,
            qty: salesMap.get(product.id) || 0
        }))
            .sort((a, b) => b.qty - a.qty)
            .slice(0, 5); // Get top 5 products

        return productSales;
    }, [products, orders]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Top sản phẩm bán chạy</h3>
            <div className="space-y-3">
                {topProducts.map((product, idx) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {idx + 1}
                            </div>
                            <div className="flex items-center space-x-3">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                />
                                <span className="font-medium text-gray-700">{product.name}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-lg font-bold text-blue-600">{product.qty}</span>
                            <p className="text-xs text-gray-500">đã bán</p>
                        </div>
                    </div>
                ))}

                {topProducts.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                        Chưa có dữ liệu bán hàng
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopProducts;