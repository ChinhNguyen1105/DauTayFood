import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import SideBar from "./components/ui/SideBar/SideBar";

// Pages (client)
import Home from "./pages/Home/Home";
import RegistPage from "./pages/RegistPage/RegistPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AboutUsPage from "./pages/AboutPage/AboutPage";
import CartPage from "./pages/CartPage/CardPage";
import CheckOut from "./pages/CheckOut/CheckOut";
import PayVietQRPage from "./pages/BankingQR/BankingQR";
import SettingsPage from "./pages/SettingPage/SettingPage";
import TermsPage from "./pages/TermsPage/TermsPage";

// Layout wrapper cho client
function ClientLayout({ children }) {
    return (
        <>
            <SideBar />
            <Header />
            <main className="min-h-[80vh]">{children}</main>
            <Footer />
        </>
    );
}

function App() {
    return (
        <>
            {/* Toaster */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 2000,
                    style: { background: "#363636", color: "#fff" },
                    success: { style: { background: "#00b09b" } },
                }}
            />

            <Routes>
                <Route path="/" element={<ClientLayout><Home /></ClientLayout>} />
                <Route path="/regist" element={<ClientLayout><RegistPage /></ClientLayout>} />
                <Route path="/login" element={<ClientLayout><LoginPage /></ClientLayout>} />
                <Route path="/menu" element={<ClientLayout><MenuPage /></ClientLayout>} />
                <Route path="/profile" element={<ClientLayout><ProfilePage /></ClientLayout>} />
                <Route path="/about-us" element={<ClientLayout><AboutUsPage /></ClientLayout>} />
                <Route path="/cart" element={<ClientLayout><CartPage /></ClientLayout>} />
                <Route path="/checkout" element={<ClientLayout><CheckOut /></ClientLayout>} />
                <Route path="/pay-vietqr" element={<ClientLayout><PayVietQRPage /></ClientLayout>} />
                <Route path="/settings" element={<ClientLayout><SettingsPage /></ClientLayout>} />
                <Route path="/terms" element={<ClientLayout><TermsPage /></ClientLayout>} />
            </Routes>
        </>
    );
}

export default App;
