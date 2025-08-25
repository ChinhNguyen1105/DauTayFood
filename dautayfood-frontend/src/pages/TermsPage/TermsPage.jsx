import React from "react";

function TermsPage() {
    return (
        <div className="p-6 md:px-40 md:pt-24 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-8 text-center">📜 Điều khoản & Chính sách</h1>

            {/* 1. Giới thiệu chung */}
            <section id="intro" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">1. Giới thiệu chung</h2>
                <p className="leading-relaxed">
                    Chào mừng bạn đến với <b>Dâu Tây Food</b> – nền tảng chuyên cung cấp các món ăn vặt hấp dẫn,
                    tiện lợi và giao hàng tận nơi. Trang web này được quản lý bởi đội ngũ <b>Dâu Tây Food</b> nhằm
                    mang đến trải nghiệm mua sắm trực tuyến nhanh chóng, an toàn và đáng tin cậy.
                    <br /><br />
                    Khi truy cập và sử dụng website, bạn mặc nhiên đồng ý với các điều khoản được quy định dưới đây.
                    Nếu bạn không đồng ý, vui lòng ngừng sử dụng dịch vụ của chúng tôi.
                </p>
            </section>

            {/* 2. Quy định về người dùng */}
            <section id="user" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">2. 👤 Quy định về người dùng</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Người dùng phải cung cấp thông tin chính xác, đầy đủ khi đăng ký hoặc đặt hàng.</li>
                    <li>Không sử dụng dịch vụ của chúng tôi cho mục đích gian lận, vi phạm pháp luật.</li>
                    <li>Mọi hành vi lợi dụng website gây hại sẽ bị từ chối cung cấp dịch vụ.</li>
                </ul>
            </section>

            {/* 3. Đặt hàng và thanh toán */}
            <section id="payment" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">3. 🍱 Đặt hàng và thanh toán</h2>
                <p className="mb-2">
                    Người dùng có thể đặt hàng trực tuyến qua website hoặc kênh hỗ trợ chính thức. Đơn hàng chỉ có hiệu lực khi được xác nhận.
                </p>
                <b>Phương thức thanh toán hỗ trợ:</b>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Thanh toán khi nhận hàng (COD).</li>
                    <li>Chuyển khoản ngân hàng.</li>
                    <li>Các ví điện tử được chấp nhận.</li>
                </ul>
            </section>

            {/* 4. Giao hàng */}
            <section id="delivery" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">4. 🚚 Giao hàng</h2>
                <p>
                    Dâu Tây Food giao hàng trong khu vực nội thành HCM và một số tỉnh lân cận. Thời gian giao hàng phụ thuộc vào vị trí và số lượng đơn.
                </p>
                <p className="mt-2">
                    Chúng tôi cam kết giao hàng nhanh chóng, nhưng không chịu trách nhiệm khi có sự cố bất khả kháng như thiên tai, dịch bệnh, giao thông cản trở.
                </p>
            </section>

            {/* 5. Đổi trả & Hoàn tiền */}
            <section id="refund" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">5. 🔄 Đổi/Trả hàng & Hoàn tiền</h2>
                <p>
                    Sản phẩm chỉ được đổi trả trong vòng <b>24 giờ</b> kể từ khi nhận hàng nếu:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Sản phẩm bị hỏng, hư hại trong quá trình vận chuyển.</li>
                    <li>Không đúng sản phẩm đã đặt.</li>
                </ul>
                <p className="mt-2">Hoàn tiền được thực hiện theo phương thức bạn đã thanh toán.</p>
            </section>

            {/* 6. Chính sách bảo mật */}
            <section id="privacy" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">6. 🔐 Chính sách bảo mật</h2>
                <p className="mb-4">
                    Dâu Tây Food cam kết bảo vệ tuyệt đối quyền riêng tư và thông tin cá nhân của khách hàng khi sử dụng website.
                    Chính sách bảo mật này quy định cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
                </p>

                <h3 className="text-xl font-semibold mb-2">6.1. Thu thập thông tin cá nhân</h3>
                <ul className="list-disc pl-6 mb-4">
                    <li>Họ và tên</li>
                    <li>Số điện thoại</li>
                    <li>Địa chỉ giao hàng</li>
                    <li>Email (nếu có)</li>
                    <li>Thông tin thanh toán (nếu thanh toán online)</li>
                </ul>
                <p>Tất cả thông tin được cung cấp hoàn toàn tự nguyện, và bạn có quyền từ chối cung cấp một số thông tin không bắt buộc.</p>

                <h3 className="text-xl font-semibold mt-4 mb-2">6.2. Mục đích sử dụng thông tin</h3>
                <ul className="list-disc pl-6 mb-4">
                    <li>Xử lý đơn hàng, giao hàng và chăm sóc sau bán.</li>
                    <li>Gửi thông báo về đơn hàng hoặc ưu đãi liên quan (nếu bạn đồng ý).</li>
                    <li>Cải thiện chất lượng dịch vụ và trải nghiệm người dùng.</li>
                    <li>Liên hệ khi có vấn đề phát sinh liên quan đến đơn hàng.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-2">6.3. Bảo mật và lưu trữ dữ liệu</h3>
                <p className="mb-4">
                    Thông tin cá nhân của bạn được lưu trữ trên hệ thống có bảo mật cao, chỉ nhân viên có thẩm quyền mới được truy cập.
                    Dâu Tây Food không chia sẻ, mua bán hoặc cho thuê thông tin cá nhân cho bên thứ ba, trừ khi có yêu cầu của pháp luật hoặc sự đồng ý của bạn.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">6.4. Quyền của người dùng</h3>
                <p className="mb-4">
                    Bạn có thể yêu cầu kiểm tra, cập nhật hoặc xóa thông tin cá nhân bất kỳ lúc nào bằng cách liên hệ với bộ phận hỗ trợ khách hàng.
                    Bạn có quyền từ chối nhận email marketing hoặc thông báo quảng cáo bất kỳ lúc nào.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">6.5. Thay đổi chính sách bảo mật</h3>
                <p>
                    Dâu Tây Food có thể cập nhật chính sách này để phù hợp với quy định pháp luật và nhu cầu dịch vụ.
                    Mọi thay đổi sẽ được thông báo rõ ràng trên website.
                    <br /><br />
                    📌 <b>Lưu ý:</b> Chúng tôi luôn đặt yếu tố bảo mật lên hàng đầu, nhưng bạn cũng cần bảo vệ thiết bị cá nhân
                    và tránh chia sẻ thông tin tài khoản để đảm bảo an toàn tuyệt đối.
                </p>
            </section>

            {/* 7. Hủy đơn hàng */}
            <section id="cancel" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">7. ❌ Hủy đơn hàng</h2>
                <p className="mb-4">
                    Dâu Tây Food hiểu rằng đôi khi khách hàng có thể thay đổi ý định sau khi đặt hàng.
                    Chúng tôi cho phép hủy đơn hàng trong những trường hợp nhất định, với các điều kiện rõ ràng như sau:
                </p>

                <h3 className="text-xl font-semibold mb-2">7.1. Thời điểm được phép hủy</h3>
                <ul className="list-disc pl-6 mb-4">
                    <li>Đơn hàng chưa được xác nhận hoặc đang chờ xử lý.</li>
                    <li>Đơn hàng chưa bắt đầu chế biến hoặc đóng gói.</li>
                </ul>
                <p>📌 Cách hủy: Gọi hotline hoặc nhắn tin fanpage/zalo, cung cấp mã đơn hàng và lý do hủy.</p>

                <h3 className="text-xl font-semibold mt-4 mb-2">7.2. Trường hợp không thể hủy</h3>
                <ul className="list-disc pl-6 mb-4">
                    <li>Món ăn đã được chế biến hoặc đang được giao.</li>
                    <li>Đơn đã thanh toán trước hoàn tất mà khách không có lý do hợp lệ.</li>
                    <li>Khách hàng thường xuyên đặt rồi hủy gây ảnh hưởng hệ thống.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4 mb-2">7.3. Hủy do lỗi từ hệ thống</h3>
                <p className="mb-2">
                    Trong trường hợp đơn hàng bị lỗi từ phía Dâu Tây Food như giao trễ lâu, món hết hàng nhưng vẫn hiển thị trên web,
                    chúng tôi sẽ chủ động hủy và hoàn tiền 100% nếu khách đã thanh toán trước.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">7.4. Hoàn tiền sau khi hủy đơn</h3>
                <p>
                    Nếu đơn hợp lệ để hủy và đã thanh toán: Hoàn tiền trong vòng 3–5 ngày làm việc.
                    Không hoàn tiền COD khi chưa phát sinh.
                    <br /><br />
                    📌 <b>Lưu ý:</b> Hủy càng sớm càng tốt để tránh lãng phí nguyên liệu và công sức chế biến.
                </p>
            </section>

            {/* 8. Giải quyết tranh chấp */}
            <section id="dispute" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">8. ⚖️ Giải quyết tranh chấp</h2>
                <p className="mb-4">
                    Dâu Tây Food luôn nỗ lực mang đến trải nghiệm tốt nhất. Nếu phát sinh mâu thuẫn, chúng tôi cam kết giải quyết công bằng và minh bạch.
                </p>

                <h3 className="text-xl font-semibold mb-2">8.1. Nguyên tắc</h3>
                <ul className="list-disc pl-6 mb-4">
                    <li>Ưu tiên thương lượng, hòa giải.</li>
                    <li>Tôn trọng quyền lợi khách hàng và tuân thủ pháp luật.</li>
                    <li>Mọi khiếu nại cần có căn cứ rõ ràng.</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2">8.2. Quy trình xử lý khiếu nại</h3>
                <p>
                    Liên hệ qua hotline, Zalo, Fanpage hoặc email. Cung cấp mã đơn hàng, thời gian và bằng chứng. Chúng tôi phản hồi trong 24h.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">8.3. Trường hợp không thỏa thuận</h3>
                <p>
                    Nếu không đạt thỏa thuận, tranh chấp được đưa lên cơ quan có thẩm quyền theo pháp luật Việt Nam.
                </p>
            </section>

            {/* 9. Thay đổi điều khoản */}
            <section id="update" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">9. 📢 Thay đổi điều khoản</h2>
                <p className="mb-4">
                    Dâu Tây Food có quyền cập nhật điều khoản để phù hợp với hoạt động và luật pháp. Các điều khoản mới có hiệu lực ngay khi đăng tải.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Người dùng có trách nhiệm theo dõi điều khoản cập nhật.</li>
                    <li>Các thay đổi công khai có giá trị pháp lý như hợp đồng điện tử.</li>
                </ul>
            </section>

            {/* 10. Thông tin liên hệ */}
            <section id="contact" className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">10. 📞 Thông tin liên hệ</h2>
                <p><b>Địa chỉ:</b> Dâu Tây Food</p>
                <p><b>Hotline:</b> 0123 456 789 (8:00 – 22:00 hàng ngày)</p>
                <p><b>Zalo/Fanpage:</b> Dâu Tây Food</p>
                <p><b>Email:</b> hotro@dautayfood.vn</p>
                <p><b>Website:</b> https://www.dautayfood.vn</p>
            </section>
        </div>
    );
}

export default TermsPage;
