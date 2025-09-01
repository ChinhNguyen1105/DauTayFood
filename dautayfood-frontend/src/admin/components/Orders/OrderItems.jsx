{/* Order items */ }
<div>
    <h3 className="text-lg font-medium text-gray-900 mb-3">Sản phẩm đã đặt</h3>
    <div className="space-y-2">
        {selectedOrder.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                </div>
                <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(item.price)}</p>
                    <p className="text-sm text-gray-500">
                        Tổng: {formatCurrency(item.price * item.quantity)}
                    </p>
                </div>
            </div>
        ))}
    </div>
</div>