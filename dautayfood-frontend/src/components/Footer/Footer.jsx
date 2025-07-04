import './Footer.css';
import { FaFacebookMessenger, FaInstagram } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-social">
                    <span>Hoặc liên hệ qua: </span>
                    <a href="https://m.me/" target="_blank" rel="noopener noreferrer"><FaFacebookMessenger className="footer-icon" style={{ color: '#0078FF' }} size={30} /></a>
                    <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram className="footer-icon" style={{ color: '#E4405F' }} size={30} /></a>
                    <a href="https://zalo.me/" target="_blank" rel="noopener noreferrer"><SiZalo className="footer-icon" style={{ color: '#0180C7' }} size={30} /></a>
                </div>
                <div className="footer-phone">Số điện thoại: <b>0971-391-833</b></div>
            </div>
            <div className="footer-main">

                <div className="footer-links">
                    <ul>
                        <li>Câu hỏi thường gặp</li>
                        <li>Chính sách bảo mật</li>
                        <li>Điều khoản sử dụng</li>
                    </ul>
                    <ul>
                        <li>Chính sách thanh toán</li>
                        <li>Khuyến mãi</li>
                        <li>Chính sách giao hàng</li>
                    </ul>
                    <ul>
                        <li>Quy định người dùng</li>
                        <li>Chính sách đổi trả</li>
                        <li>Thông tin liên hệ</li>
                    </ul>
                </div>

            </div>
            <div className="footer-info">
                <div>Email: HotroDauTayFood.vn</div>
                <div>Địa chỉ: Số 123, Đường Ăn Vặt, Phường Ngon Lành, Quận Tân Vị, TP. HCM</div>
            </div>
            <div className="footer-bottom">
                © 2025 Chính Nguyễn. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;