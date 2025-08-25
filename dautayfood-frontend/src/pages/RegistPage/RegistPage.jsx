// RegistPage.jsx
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import ScrollToTop from "../../ScrollToTop";

const RegistPage = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-100">
            <ScrollToTop />

            {/* Nội dung chính */}
            <main className="flex-1 relative flex items-center justify-center px-4 py-8">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
                        alt="Background"
                        className="w-full h-full object-cover brightness-75"
                    />
                </div>

                {/* Form */}
                <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-md shadow-xl rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Đăng ký tài khoản
                    </h2>

                    {/* Form đăng ký */}
                    <form className="flex flex-col gap-4 ">
                        <input
                            type="text"
                            placeholder="Email hoặc số điện thoại"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <input
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        />

                        <button
                            type="submit"
                            className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition"
                        >
                            Xác nhận
                        </button>
                    </form>

                    {/* Hoặc */}
                    <div className="flex items-center gap-2 my-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="text-gray-500 text-sm">Hoặc</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* Đăng ký nhanh */}
                    <div className="flex items-center justify-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition flex-1 justify-center">
                            <FaGoogle className="text-red-500" />
                            Google
                        </button>
                        <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition flex-1 justify-center">
                            <FaFacebookF className="text-blue-600" />
                            Facebook
                        </button>
                    </div>

                    {/* Đã có tài khoản */}
                    <div className="text-center mt-6 text-sm text-gray-600">
                        Đã có tài khoản?{" "}
                        <a href="/login" className="text-red-500 hover:underline font-medium">
                            Đăng nhập
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RegistPage;
