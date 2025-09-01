import { Routes, Route } from "react-router-dom";


// Pages (admin)
import DashBoard from './admin/pages/DashBoard';
import Layout from './admin/pages/Layout';
import Products from "./admin/pages/Products";
import Orders from './admin/pages/Orders';
import Users from './admin/pages/Users';
import Settings from './admin/pages/Settings';

function AdminApp() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<DashBoard />} />
                <Route path="product" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}

export default AdminApp;
