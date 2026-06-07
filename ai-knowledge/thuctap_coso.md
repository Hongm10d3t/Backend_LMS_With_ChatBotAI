# Thực tập Cơ sở (PTIT)

## Giới thiệu môn học

Thực tập cơ sở là môn học giúp sinh viên vận dụng các kiến thức đã học để xây dựng một dự án công nghệ thông tin hoàn chỉnh.

Môn học tập trung vào:

* Khảo sát bài toán thực tế.
* Phân tích yêu cầu.
* Thiết kế hệ thống.
* Thiết kế cơ sở dữ liệu.
* Xây dựng sản phẩm.
* Viết báo cáo dự án.
* Thuyết trình và bảo vệ sản phẩm.

Mục tiêu của môn học không chỉ là tạo ra phần mềm mà còn giúp sinh viên hiểu quy trình phát triển một hệ thống từ ý tưởng đến triển khai.

---

# Cấu trúc dự án Thực tập cơ sở

Một dự án TTCS thường bao gồm:

## 1. Khảo sát và xác định bài toán

Sinh viên cần:

* Xác định lĩnh vực của dự án.
* Xác định đối tượng sử dụng.
* Xác định nhu cầu thực tế.

Ví dụ:

* Hệ thống quản lý phòng trọ.
* Hệ thống quản lý thư viện.
* Hệ thống học trực tuyến.
* Hệ thống bán hàng.

---

## 2. Tìm hiểu hệ thống tương tự

Mục tiêu:

* Nghiên cứu các hệ thống đã tồn tại.
* So sánh ưu điểm và nhược điểm.
* Rút ra các chức năng cần xây dựng.

Các nội dung cần trình bày:

* Tên hệ thống.
* Các tính năng chính.
* Đánh giá ưu điểm.
* Đánh giá nhược điểm.

---

# Chương 1. Kiến thức chung

## Quy trình nghiệp vụ

Quy trình nghiệp vụ mô tả cách hệ thống hoạt động trong thực tế.

Ví dụ:

Đăng ký phòng trọ:

```text
Sinh viên
→ Tìm kiếm phòng
→ Xem thông tin phòng
→ Liên hệ chủ trọ
→ Đăng ký thuê
```

## Các đối tượng tham gia

Các tác nhân thường gặp:

* Quản trị viên
* Người dùng
* Khách truy cập
* Nhân viên

## Chức năng hệ thống

Ví dụ:

* Đăng nhập
* Quản lý tài khoản
* Tìm kiếm dữ liệu
* Quản lý thông tin
* Thống kê

---

# Kiến trúc hệ thống

## Mô hình 3 lớp

### Frontend

Giao diện người dùng.

Ví dụ:

* React
* Angular
* Vue

### Backend

Xử lý nghiệp vụ.

Ví dụ:

* Node.js
* Spring Boot
* ASP.NET

### Database

Lưu trữ dữ liệu.

Ví dụ:

* MySQL
* PostgreSQL
* MongoDB

---

# Công nghệ thường sử dụng

## Frontend

* HTML
* CSS
* JavaScript
* React

## Backend

* Node.js
* Express.js

## Database

* MySQL
* MongoDB

## Công cụ hỗ trợ

* Git
* GitHub
* Postman
* Visual Studio Code

---

# Chương 2. Phân tích và thiết kế hệ thống

## Use Case Diagram

Use Case mô tả:

* Tác nhân tham gia hệ thống.
* Các chức năng mà tác nhân sử dụng.

Ví dụ:

Actor:

* Admin
* User

Use Cases:

* Đăng nhập
* Quản lý tài khoản
* Tìm kiếm
* Cập nhật dữ liệu

## Activity Diagram

Mô tả luồng xử lý của hệ thống.

## Sequence Diagram

Mô tả quá trình trao đổi giữa các đối tượng.

---

# Thiết kế cơ sở dữ liệu

## Các bước thực hiện

1. Xác định thực thể.
2. Xác định thuộc tính.
3. Xác định khóa chính.
4. Xác định khóa ngoại.
5. Xây dựng ERD.

## Một số khái niệm

### Entity

Đối tượng cần quản lý.

### Attribute

Thuộc tính của đối tượng.

### Relationship

Mối quan hệ giữa các thực thể.

---

# Thu thập dữ liệu

Nguồn dữ liệu có thể từ:

* Internet.
* Khảo sát thực tế.
* Dữ liệu doanh nghiệp.
* Dữ liệu do nhóm tự xây dựng.

Yêu cầu:

* Dữ liệu hợp lệ.
* Phù hợp với bài toán.
* Có đủ số lượng để kiểm thử hệ thống.

---

# Chương 3. Cài đặt hệ thống

## Môi trường phát triển

Ví dụ:

* Windows
* Linux

## Phần mềm sử dụng

* VS Code
* MySQL Workbench
* MongoDB Compass
* Postman
* Git

## Triển khai chức năng

Các chức năng cần được cài đặt đúng theo thiết kế.

Ví dụ:

* Đăng nhập
* Quản lý dữ liệu
* Tìm kiếm
* Báo cáo

---

# Bảo mật hệ thống

Các biện pháp thường sử dụng:

* Mã hóa mật khẩu.
* Xác thực người dùng.
* Phân quyền truy cập.
* Kiểm tra dữ liệu đầu vào.
* Chống SQL Injection.
* Chống XSS.

---

# Đánh giá hệ thống

## Ưu điểm

* Đáp ứng yêu cầu bài toán.
* Giao diện dễ sử dụng.
* Dữ liệu được quản lý hiệu quả.

## Nhược điểm

* Chưa tối ưu hiệu năng.
* Chưa hỗ trợ nhiều người dùng đồng thời.
* Chưa triển khai trên môi trường thực tế.

---

# Kết luận dự án

## Kết quả đạt được

* Hoàn thành khảo sát.
* Hoàn thành phân tích thiết kế.
* Xây dựng được hệ thống.
* Hoàn thiện báo cáo.

## Hướng phát triển

* Bổ sung tính năng mới.
* Nâng cao bảo mật.
* Tối ưu hiệu năng.
* Triển khai thực tế.

---

# Câu hỏi thường gặp

1. Thực tập cơ sở là gì?
2. Một dự án TTCS cần những phần nào?
3. Use Case Diagram dùng để làm gì?
4. ERD là gì?
5. Quy trình nghiệp vụ là gì?
6. Cần trình bày những gì trong báo cáo TTCS?
7. Làm thế nào để thiết kế cơ sở dữ liệu?
8. Kiến trúc 3 lớp là gì?
9. Nên sử dụng công nghệ nào cho dự án web?
10. Các tiêu chí đánh giá một dự án TTCS là gì?
# Chuẩn đầu ra và tiêu chí đánh giá môn Thực tập cơ sở

## CLO1 - Tuân thủ đạo đức nghề nghiệp trong phát triển dự án

### Mục tiêu

Sinh viên phải:

* Áp dụng các nguyên tắc đạo đức nghề nghiệp trong quá trình thực hiện dự án.
* Tôn trọng quyền tác giả và trích dẫn tài liệu tham khảo đầy đủ.

### Các nguyên tắc đạo đức cần tuân thủ

* Trung thực trong nghiên cứu.
* Không sao chép sản phẩm của người khác.
* Không đạo văn.
* Không sử dụng tài nguyên trái phép.
* Minh bạch trong báo cáo kết quả.

### Yêu cầu về trích dẫn

Trong báo cáo:

* Hình ảnh phải ghi nguồn.
* Bảng biểu phải ghi nguồn.
* Công thức tham khảo phải ghi nguồn.
* Nội dung tham khảo phải trích dẫn tài liệu.

Lưu ý:

Việc thiếu trích dẫn là một trong những nguyên nhân phổ biến khiến điểm CLO1 bị giảm.

---

# CLO2 - Ứng dụng công nghệ mới

## Mục tiêu

Sinh viên cần thực hiện một dự án sử dụng công nghệ mới đối với bản thân và phù hợp với ngành Công nghệ thông tin.

## Tiêu chí đánh giá

### 1. Lựa chọn công nghệ

Công nghệ nên:

* Có tính mới đối với sinh viên.
* Có khả năng ứng dụng thực tế.
* Đang được cộng đồng quan tâm nghiên cứu hoặc sử dụng.

Ví dụ:

* AI Agent
* Retrieval Augmented Generation (RAG)
* LangChain
* Docker
* Microservices
* Machine Learning
* Cloud Computing

### 2. Khảo sát các nghiên cứu liên quan

Sinh viên cần:

* Tìm hiểu các hệ thống tương tự.
* Phân tích ưu điểm.
* Phân tích nhược điểm.
* So sánh các giải pháp.

### 3. Hiện thực hóa giải pháp

Mức đánh giá cao nhất đạt được khi:

* Hoàn thành trên 75% chức năng chính của hệ thống.
* Có sản phẩm chạy được.
* Có minh chứng rõ ràng.

---

# CLO3 - Trình bày kết quả dự án

## Viết báo cáo

Một báo cáo TTCS tốt cần:

* Có đầy đủ các chương chính.
* Trình bày rõ ràng.
* Có hình ảnh minh họa.
* Có tài liệu tham khảo.

Các phần thường gặp:

1. Giới thiệu đề tài.
2. Khảo sát hệ thống.
3. Phân tích yêu cầu.
4. Thiết kế hệ thống.
5. Thiết kế cơ sở dữ liệu.
6. Cài đặt hệ thống.
7. Đánh giá kết quả.
8. Kết luận.

## Thuyết trình

Sinh viên cần:

* Trình bày mạch lạc.
* Trình bày đúng trọng tâm.
* Giải thích được sản phẩm của mình.
* Trả lời được câu hỏi phản biện.

---

# CLO4 - Trao đổi tiến độ với giảng viên hướng dẫn

## Báo cáo tiến độ

Sinh viên cần:

* Báo cáo tiến độ hằng tuần.
* Trình bày các công việc đã hoàn thành.
* Trình bày các khó khăn gặp phải.
* Trình bày kế hoạch tuần tiếp theo.

## Weekly Report

Một báo cáo tuần nên gồm:

### Công việc đã thực hiện

Ví dụ:

* Hoàn thành Use Case Diagram.
* Thiết kế cơ sở dữ liệu.
* Xây dựng API đăng nhập.

### Khó khăn gặp phải

Ví dụ:

* Chưa hiểu cơ chế JWT.
* Lỗi kết nối MongoDB.

### Kế hoạch tuần tới

Ví dụ:

* Hoàn thiện API quản lý người dùng.
* Thiết kế giao diện quản trị.

## Mức đánh giá cao

Để đạt mức cao nhất của CLO4:

* Trao đổi với giảng viên nhiều hơn 1 lần mỗi tuần.
* Báo cáo ngắn gọn.
* Trình bày rõ ràng.
* Có minh chứng tiến độ.

---

# Công thức đánh giá môn học

## Thành phần điểm

### A. Tiến độ

Trọng số: 30%

Bao gồm:

* Weekly report
* Weekly meeting
* Nội dung báo cáo tiến độ

### B. Sản phẩm quá trình

Trọng số: 70%

Bao gồm:

* CLO1: 20%
* CLO2: 50%
* CLO3: 30%

## Điều quan trọng nhất để đạt điểm cao

1. Chọn đề tài có công nghệ mới.
2. Hoàn thành phần lớn chức năng hệ thống.
3. Viết báo cáo đầy đủ.
4. Thuyết trình tốt.
5. Báo cáo tiến độ đều đặn.
6. Trích dẫn tài liệu đầy đủ.
