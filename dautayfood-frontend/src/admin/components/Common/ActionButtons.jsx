{/* Action buttons */ }
<div className="flex space-x-3 pt-4">
    {selectedOrder.status === 'pending' && (
        <>
            <button
                onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
            >
                <CheckCircle className="w-4 h-4 mr-2" />
                Hoàn thành
            </button>
            <button
                onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
            >
                <XCircle className="w-4 h-4 mr-2" />
                Hủy đơn
            </button>
        </>
    )}
</div>