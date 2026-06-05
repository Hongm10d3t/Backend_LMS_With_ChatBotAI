# PTIT EDU - Backend

Backend của hệ thống học tập trực tuyến **PTIT EDU**, được xây dựng nhằm hỗ trợ quản lý học tập, tổ chức thi trực tuyến và tương tác giữa giảng viên với sinh viên trong môi trường đào tạo.

## Giới thiệu

PTIT EDU là hệ thống quản lý học tập trực tuyến dành cho sinh viên và giảng viên. Backend cung cấp các API phục vụ cho việc:

* Quản lý người dùng và phân quyền
* Quản lý học kỳ và lớp học
* Quản lý tài liệu học tập
* Xây dựng ngân hàng câu hỏi
* Tạo và tổ chức thi trực tuyến
* Quản lý kết quả làm bài
* Hệ thống thông báo
* Chat trong lớp học
* Chatbot AI hỗ trợ người dùng

---

## Công nghệ sử dụng

* Node.js
* Express.js
* MongoDB
* Mongoose
* Express Session
* Express FileUpload
* OpenAI API
* JWT
* EJS

---

## Chức năng chính

### Quản lý người dùng

Hệ thống hỗ trợ ba vai trò:

* **Admin**
* **Teacher**
* **Student**

Mỗi vai trò được cấp các quyền truy cập khác nhau thông qua cơ chế xác thực và phân quyền.

### Quản lý học kỳ và lớp học

* Tạo và quản lý học kỳ
* Tạo lớp học thuộc từng học kỳ
* Phân công giảng viên
* Thêm sinh viên vào lớp

### Quản lý tài liệu học tập

Giảng viên có thể:

* Tải lên tài liệu học tập
* Quản lý danh sách tài liệu
* Chia sẻ tài liệu cho sinh viên trong lớp

### Ngân hàng câu hỏi và đề thi

* Tạo ngân hàng câu hỏi
* Import câu hỏi từ file CSV
* Tạo đề thi ngẫu nhiên
* Quản lý đề thi theo từng lớp học

### Thi trực tuyến

Sinh viên có thể:

* Bắt đầu bài thi
* Lưu đáp án trong quá trình làm bài
* Nộp bài thi
* Xem lịch sử làm bài

Giảng viên có thể:

* Theo dõi kết quả làm bài
* Xem chi tiết từng lần thi của sinh viên

### Hệ thống thông báo

* Thông báo toàn hệ thống
* Thông báo theo lớp học
* Quản lý danh sách thông báo

### Chat lớp học

Cho phép:

* Giảng viên gửi tin nhắn
* Sinh viên trao đổi trong lớp học
* Hỗ trợ gửi hình ảnh

### Chatbot AI

Tích hợp OpenAI để hỗ trợ:

* Hướng dẫn sử dụng hệ thống
* Giải đáp các thao tác thường gặp
* Hỗ trợ học tập
* Trả lời dựa trên tài liệu đã cung cấp
* Phân tích tài liệu và hình ảnh người dùng gửi lên (phiên bản mở rộng)

---

## Cấu trúc dữ liệu chính

Các model chính của hệ thống:

```text
User
Term
Course
Material
QuestionBank
Exam
ExamAttempt
Announcement
Message
```

---

## Cài đặt

### Clone project

```bash
git clone <repository-url>
cd Backend
```

### Cài đặt thư viện

```bash
npm install
```

### Cấu hình môi trường

Tạo file `.env`:

```env
PORT=8888

MONGODB_URI=your_mongodb_connection

SESSION_SECRET=your_session_secret

OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5.4-mini
OPENAI_VECTOR_STORE_ID=your_vector_store_id
```

---

## Chạy ứng dụng

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Mặc định server chạy tại:

```text
http://localhost:8888
```

---

## Cấu trúc thư mục

```text
src
├── config
├── controllers
│   ├── api
│   └── web
├── middleware
├── models
├── public
├── routes
│   ├── api
│   └── web
├── services
├── views
└── server.js
```

---

## API

Hệ thống được tổ chức theo mô hình RESTful API.

Các nhóm API chính:

```text
Authentication
Admin Management
Teacher Management
Student Management
Material Management
Question Bank Management
Exam Management
Announcement Management
Class Chat
AI Chatbot
```

---

## Yêu cầu hệ thống

* Node.js >= 18
* MongoDB
* OpenAI API Key (đối với chatbot AI)

---

## Định hướng phát triển

* Hỗ trợ nhiều loại tài liệu học tập hơn
* Cải thiện chatbot AI theo ngữ cảnh người dùng
* Tích hợp phân tích học tập bằng AI
* Hỗ trợ lưu lịch sử hội thoại AI
* Tăng cường khả năng thống kê và báo cáo

---

## Tác giả

Dự án được phát triển phục vụ mục đích học tập, nghiên cứu và thực hành xây dựng hệ thống học tập trực tuyến.
