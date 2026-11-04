# Portfolio Nguyễn Ngọc Hải

Website portfolio tĩnh bằng HTML5, CSS3 và JavaScript thuần. Trang giới thiệu cá nhân, kỹ năng, dự án, hồ sơ kỹ thuật và thông tin liên hệ; không yêu cầu cài dependency hoặc bước build.

## Chạy website

1. Mở `index.html` bằng trình duyệt; hoặc chạy máy chủ tĩnh tại thư mục dự án:

   ```powershell
   py -m http.server 8000
   ```

2. Truy cập `http://localhost:8000`.

## Cấu trúc

- `index.html` — nội dung, ngữ nghĩa và dữ liệu ảnh dự án.
- `style.css` — thiết kế, lưới responsive, trạng thái focus và chuyển động.
- `script.js` — kiểm tra biểu mẫu liên hệ, tạo liên kết email và hiệu ứng xuất hiện.

## Sử dụng và giới hạn

- Dùng menu đầu trang để chuyển tới từng phần; trên màn hình nhỏ, menu có thể cuộn ngang.
- Biểu mẫu kiểm tra tên, email và độ dài tin nhắn rồi mở ứng dụng email mặc định qua `mailto:`. Người dùng phải tự nhấn **Gửi** trong ứng dụng đó; trang không gửi hay lưu dữ liệu.
- Website không có đăng nhập, tài khoản hoặc backend. Không nhập thông tin nhạy cảm vào biểu mẫu.
- Ảnh dự án được nhúng trực tiếp trong HTML để thuận tiện chạy độc lập. Tách ảnh, nén và phục vụ ảnh responsive là hướng cải tiến nếu bộ ảnh tăng.
- Google Fonts cần kết nối mạng; phông chữ dự phòng được khai báo để trang vẫn đọc được khi ngoại tuyến.

## Kiểm thử responsive

Có thể lặp lại bằng công cụ responsive của trình duyệt hoặc Playwright:

1. Đặt viewport lần lượt `360 × 800`, `768 × 1024` và `1280 × 900`, tải lại trang ở mỗi kích thước.
2. Kiểm tra menu, thứ tự các khối, thẻ dự án và biểu mẫu; xác nhận không có tràn ngang toàn trang (`document.documentElement.scrollWidth <= window.innerWidth`).
3. Gửi biểu mẫu trống/email sai để xác nhận trường lỗi được chỉ ra; gửi dữ liệu hợp lệ để xác nhận trang mở ứng dụng email và hướng dẫn người dùng gửi thủ công.
4. Kiểm tra điều hướng bàn phím, trạng thái focus và giảm chuyển động (`prefers-reduced-motion`).

Kết quả lần kiểm tra ngày 04/11/2026 bằng Playwright trong trình duyệt tích hợp: cả ba kích thước đều không tràn ngang; menu hiển thị và mọi liên kết điều hướng có đích; menu cuộn ngang tại 360 px; ảnh tải được và không ghi nhận lỗi JavaScript trong console. Biểu mẫu trống và email sai bị từ chối đúng trường; các trường có nhãn, ảnh có văn bản thay thế. Cần chạy lại trên trình duyệt/máy đích trước khi nộp; việc mở email hợp lệ cần xác nhận thủ công vì phụ thuộc ứng dụng bên ngoài.

## Quyết định kỹ thuật

- Grid cho bố cục nhiều cột, Flexbox cho điều hướng và nhóm thành phần; tại breakpoint 760 px, các vùng chính xếp thành một cột.
- CSS/HTML/JavaScript thuần thay cho framework để giữ website nhỏ, dễ mở trực tiếp và không cần build. Đánh đổi: chưa có hệ thống component, kiểm thử tự động hay dữ liệu động.
- `mailto:` phù hợp với portfolio tĩnh và không cần gửi dữ liệu qua máy chủ; đổi lại, cần ứng dụng email được cấu hình và người dùng xác nhận gửi.

## Liêm chính học thuật và nguồn tham khảo

Trang công khai việc dùng ChatGPT để hỗ trợ học tập và gỡ lỗi. Trước khi nộp, người thực hiện cần bổ sung nhật ký sử dụng thực tế (công cụ, mục đích, phần đã rà soát), tự kiểm tra mã và ghi nhận nguồn cho nội dung/hình ảnh của mình; không dùng khai báo này thay cho minh chứng hoặc xác nhận những việc chưa thực hiện.

- [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design)
- [MDN: HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3C: WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
