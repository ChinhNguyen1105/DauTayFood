import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css"; // import Tailwind

// User site
import UserApp from "./UserApp";
import UserAppProviders from "./Userprovider";

// Admin site
import AdminAppProviders from "./AdminProvider";
import AdminApp from './AdminApp';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* Admin routes */}
                <Route
                    path="/admin/*"
                    element={
                        <AdminAppProviders>
                            <AdminApp />
                        </AdminAppProviders>
                    }
                />

                {/* User routes */}
                <Route
                    path="/*"
                    element={
                        <UserAppProviders>
                            <UserApp />
                        </UserAppProviders>
                    }
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
