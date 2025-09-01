import React from "react";

const Pagination = ({
    currentPage,
    totalPages,
    itemsPerPage = 10,
    totalItems = 0,
    onPageChange,
}) => {
    return (
        <div className="bg-white/70 backdrop-blur-md px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow-sm mt-4">
            {/* Mobile view */}
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    Trước
                </button>
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    Sau
                </button>
            </div>

            {/* Desktop view */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                {/* Info text */}
                <div>
                    <p className="text-sm text-gray-700">
                        Hiển thị{" "}
                        <span className="font-medium">
                            {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
                        </span>{" "}
                        đến{" "}
                        <span className="font-medium">
                            {Math.min(currentPage * itemsPerPage, totalItems)}
                        </span>{" "}
                        trong <span className="font-medium">{totalItems}</span> sản phẩm
                    </p>
                </div>

                {/* Pagination buttons */}
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {/* Previous */}
                        <button
                            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Trước
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${pageNum === currentPage
                                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600 font-semibold"
                                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                    }`}
                            >
                                {pageNum}
                            </button>
                        ))}

                        {/* Next */}
                        <button
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Sau
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
