# 🎥 TikTok UI Clone — Front-end React

Đây là dự án **Front-end** được xây dựng bằng **ReactJS**, mô phỏng lại giao diện và các tính năng cốt lõi của ứng dụng TikTok. Ứng dụng tập trung vào trải nghiệm mượt mà, tối ưu hiệu suất và khả năng mở rộng.

---

## Các tính năng nổi bật

### 1. Trang Cá nhân (Profile)

- **Hiển thị động theo username** lấy từ URL.
- **Phân quyền giao diện**:
  - Trang cá nhân của mình → Hiển thị nút _Sửa hồ sơ_.
  - Trang người khác → Hiển thị _Theo dõi / Nhắn tin_.
- **Chuyển hướng thông minh**:
  - Truy cập `/profile` → tự chuyển về profile user đang đăng nhập.
- **Chỉnh sửa thông tin**:
  - Sửa avatar, bio, username, thông tin cá nhân.
  - Modal đẹp, cập nhật giao diện ngay sau khi lưu.
- **Đếm số follower / following / lượt thích**.

---

### 2. Tương tác Video

- **Video Grid**: Hiển thị lưới video dạng TikTok.
- **Video Detail Modal**:
  - Phóng to video toàn màn hình.
  - Hiển thị like, comment, share, thời gian đăng.
  - Chuyển video tiếp theo / trước đó bằng điều hướng hoặc phím.
- **Tối ưu hiệu suất**:
  - Lazy load video & ảnh thumbnail.
  - Chỉ tải video thật khi mở modal.
- **Auto-play / Auto-pause** khi cuộn.
- **Hiệu ứng mượt mà** với animation.

---

### 3. Tương tác xã hội

- **Theo dõi / Bỏ theo dõi** với cập nhật UI ngay lập tức.
- **Nhắn tin trực tiếp (Direct Message)**:
  - Tự động kiểm tra nếu đã có cuộc trò chuyện.
  - Tự tạo conversation nếu chưa có.
  - Chuyển hướng đến trang chat ngay lập tức.
- **Chặn người dùng** (Block User) → Ẩn các hành động liên quan.

---

### 4. Tính năng nâng cao

- **Redux Toolkit** quản lý trạng thái người dùng, bài viết, thông báo.
- **Infinite Scroll (cuộn vô hạn)** cho feed & video list.
- **Prefetch API** để giảm độ trễ khi mở video / profile.
- **Socket.IO client** (nếu backend hỗ trợ realtime):
  - Nhận thông báo thời gian thực.
  - Tin nhắn realtime trong Chat UI.
- **Dark Mode** (nếu bạn muốn thêm, mình có thể viết luôn).

---

## Công nghệ sử dụng

### Ngôn ngữ

- JavaScript (ES6+)

### Framework & Thư viện chính

- **ReactJS**
- **React Router DOM**
- **Redux Toolkit** + **React-Redux**
- **Vite** (tốc độ cực nhanh, HMR)
- **Axios** (call API)

### Styling

- SCSS Modules
- Classnames (bind style)
- Responsive layout (flex/grid)

### Kiến trúc dự án

- **Component-based architecture**
- **Service Layer** để tách logic API
- **Hooks tùy chỉnh** để tái sử dụng logic UI
- **Redux store chia slice rõ ràng**: `auth`, `profile`, `post`, `chat`, `notification`

## 🚀 Hướng dẫn cài đặt và chạy dự án

### 1. Clone repository

- git clone https://github.com/HuyDo04tiktok-ui

### 2. Cài đặt dependencies

- npm install

### 3. Tạo file cấu hình .env

- VITE_BASE_URL_ME=http://localhost:8080
- VITE_DEFAULT_AVATAR=/path/to/default/avatar.png

### 4. Chạy dự án (dev mode)

- npm run dev
