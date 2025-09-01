// src/pages/admin/AdminLayout.jsx
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    Bell,
    ChevronLeft,
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    Menu,
    X,
} from "lucide-react";

const AdminLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Navigation items
    const navigationItems = [
        { path: "/admin/dashboard", name: "Dashboard", icon: LayoutDashboard },
        { path: "/admin/product", name: "Sản phẩm", icon: Package },
        { path: "/admin/orders", name: "Đơn hàng", icon: ShoppingCart, badge: "5" },
        { path: "/admin/users", name: "Người dùng", icon: Users },
        { path: "/admin/settings", name: "Cài đặt", icon: Settings },
    ];

    const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const isActiveRoute = (path) => location.pathname === path;

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Overlay mobile */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={toggleMobileMenu}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          ${sidebarCollapsed ? "w-16" : "w-64"}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50
          bg-white shadow-lg border-r border-gray-200
          transition-all duration-300 ease-in-out flex flex-col
        `}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    {!sidebarCollapsed && (
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                            <span className="font-bold text-lg text-gray-900">Admin Panel</span>
                        </div>
                    )}

                    <div className="flex items-center space-x-2">
                        {/* Desktop toggle */}
                        <button
                            onClick={toggleSidebar}
                            className="hidden lg:flex p-1.5 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            title={sidebarCollapsed ? "Mở rộng" : "Thu gọn"}
                        >
                            <ChevronLeft
                                className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {/* Mobile close */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            <X className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = isActiveRoute(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`
                  flex items-center rounded-lg transition-all duration-200
                  ${isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    }
                  ${sidebarCollapsed ? "justify-center px-2 py-3" : "px-3 py-2.5"}
                `}
                                title={sidebarCollapsed ? item.name : ""}
                            >
                                <Icon
                                    className={`${sidebarCollapsed ? "w-5 h-5" : "w-5 h-5 mr-3"
                                        } flex-shrink-0`}
                                />

                                {!sidebarCollapsed && (
                                    <>
                                        <span className="font-medium">{item.name}</span>
                                        {item.badge && (
                                            <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                {!sidebarCollapsed && (
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 font-medium text-sm">AD</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    Admin User
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    admin@example.com
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex justify-between items-center px-6 py-4">
                        <div className="flex items-center space-x-4">
                            {/* Mobile menu button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            >
                                <Menu className="w-5 h-5 text-gray-600" />
                            </button>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {
                                        navigationItems.find((item) =>
                                            isActiveRoute(item.path)
                                        )?.name || "Admin Area"
                                    }
                                </h1>
                                <p className="text-sm text-gray-500">Quản lý hệ thống</p>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center space-x-4">
                            {/* Search bar */}
                            <div className="hidden md:block">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
                                    />
                                    <svg
                                        className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="relative">
                                <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                                    <Bell className="w-5 h-5 text-gray-600" />
                                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        3
                                    </span>
                                </button>
                            </div>

                            {/* User menu */}
                            <div className="relative">
                                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">A</span>
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-sm font-medium text-gray-900">Admin</p>
                                        <p className="text-xs text-gray-500">Quản trị viên</p>
                                    </div>
                                    <svg
                                        className="hidden md:block w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m19 9-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
