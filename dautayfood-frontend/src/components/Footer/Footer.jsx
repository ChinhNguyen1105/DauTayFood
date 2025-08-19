import { FaFacebookMessenger, FaInstagram } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="w-full text-white font-sans bg-gradient-to-b from-[#b3b3b3] to-[#4b4b4b]">
            <div className="flex flex-col gap-4 px-6 md:px-20 pt-6">
                {/* Social + Phone */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4 text-lg">
                        <span>Hoặc liên hệ qua: </span>
                        <a href="https://m.me/" target="_blank" rel="noopener noreferrer">
                            <FaFacebookMessenger size={30} className="hover:scale-110 transition-transform text-[#0078FF]" />
                        </a>
                        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} className="hover:scale-110 transition-transform text-[#E4405F]" />
                        </a>
                        <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer">
                            <SiZalo size={30} className="hover:scale-110 transition-transform text-[#0180C7]" />
                        </a>
                    </div>
                    <div className="text-lg">
                        Số điện thoại: <b>0971-391-833</b>
                    </div>
                </div>

                {/* Footer Links */}
                <div className="border-t border-white/20 pt-4 flex flex-col md:flex-row justify-center md:gap-32 text-base text-white">
                    <ul className="mb-4 md:mb-0 min-w-[160px]">
                        <li className="mb-2">Câu hỏi thường gặp</li>
                        <li className="mb-2">Chính sách bảo mật</li>
                        <li className="mb-2">Điều khoản sử dụng</li>
                    </ul>
                    <ul className="mb-4 md:mb-0 min-w-[160px]">
                        <li className="mb-2">Chính sách thanh toán</li>
                        <li className="mb-2">Khuyến mãi</li>
                        <li className="mb-2">Chính sách giao hàng</li>
                    </ul>
                    <ul className="min-w-[160px]">
                        <li className="mb-2">Quy định người dùng</li>
                        <li className="mb-2">Chính sách đổi trả</li>
                        <li className="mb-2">Thông tin liên hệ</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-2 text-left text-base mt-4">
                    <div>Email: HotroDauTayFood.vn</div>
                    <div>Địa chỉ: Số 123, Đường Ăn Vặt, Phường Ngon Lành, Quận Tân Vị, TP. HCM</div>
                </div>
            </div>

            {/* Bottom */}
            <div className="text-center text-sm opacity-90 mt-4 border-t border-white/20 py-3 px-6 md:px-20">
                © 2025 Chính Nguyễn. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
