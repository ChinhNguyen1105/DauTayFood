import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const TablePagination = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    // Generate page numbers to display
    const getPageNumbers = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const pages = [];

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            pages.push(i);
        }

        // Add first page if not included
        if (pages[0] > 2) {
            pages.unshift('...');
        }
        if (pages[0] > 1) {
            pages.unshift(1);
        }

        // Add last page if not included
        if (pages[pages.length - 1] < totalPages - 1) {
            pages.push('...');
        }
        if (pages[pages.length - 1] < totalPages) {
            pages.push(totalPages);
        }

        return pages;
    };

    const renderPageButton = (pageNum) => {
        const isCurrentPage = currentPage === pageNum;

        if (pageNum === '...') {
            return (
                <span key={`ellipsis-${pageNum}`} className="px-3 py-2">
                    {pageNum}
                </span>
            );
        }

        return (
            <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`px-3 py-2 rounded-md ${isCurrentPage
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
            >
                {pageNum}
            </button>
        );
    };

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            {/* Mobile view */}
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    Trước
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    Sau
                </button>
            </div>

            {/* Desktop view */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Hiển thị <span className="font-medium">{startItem}</span> đến{' '}
                        <span className="font-medium">{endItem}</span> trong{' '}
                        <span className="font-medium">{totalItems}</span> kết quả
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        {/* First page */}
                        <button
                            onClick={() => onPageChange(1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <span className="sr-only">Trang đầu</span>
                            <ChevronsLeft size={16} />
                        </button>

                        {/* Previous page */}
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <span className="sr-only">Trang trước</span>
                            <ChevronLeft size={16} />
                        </button>

                        {/* Page numbers */}
                        {getPageNumbers().map(pageNum => renderPageButton(pageNum))}

                        {/* Next page */}
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <span className="sr-only">Trang sau</span>
                            <ChevronRight size={16} />
                        </button>

                        {/* Last page */}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                            <span className="sr-only">Trang cuối</span>
                            <ChevronsRight size={16} />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

TablePagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired
};

export default TablePagination;