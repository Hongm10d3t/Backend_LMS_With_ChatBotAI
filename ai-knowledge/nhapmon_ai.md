# Nhập môn Trí tuệ nhân tạo (PTIT)

## Thông tin môn học

Môn học: Nhập môn Trí tuệ nhân tạo

Giảng viên tham khảo trong tài liệu: Ngô Xuân Bách

Mục tiêu môn học:

- Hiểu các bài toán trí tuệ nhân tạo cơ bản.
- Hiểu cách biểu diễn tri thức và suy diễn.
- Hiểu suy diễn trong điều kiện không chắc chắn.
- Nắm được các khái niệm nền tảng của học máy.

---

# Chương 1. Giải quyết vấn đề bằng tìm kiếm

## Vai trò của tìm kiếm trong AI

Nhiều bài toán trí tuệ nhân tạo có thể được mô hình hóa dưới dạng bài toán tìm kiếm.

Ví dụ:

- Tìm đường đi.
- Lập thời khóa biểu.
- Chơi cờ.
- Giải mê cung.
- Bài toán 8 quân số.
- Bài toán 8 quân hậu.

## Bài toán tìm kiếm trong không gian trạng thái

Một bài toán tìm kiếm thường bao gồm:

- Không gian trạng thái.
- Trạng thái ban đầu.
- Tập hành động.
- Hàm sinh trạng thái kế tiếp.
- Điều kiện đích.
- Hàm chi phí.

Mục tiêu là tìm chuỗi hành động đưa trạng thái ban đầu tới trạng thái đích.

## Các tiêu chuẩn đánh giá thuật toán tìm kiếm

Một thuật toán tìm kiếm thường được đánh giá theo:

- Tính đầy đủ (Completeness)
- Tính tối ưu (Optimality)
- Độ phức tạp thời gian
- Độ phức tạp bộ nhớ

## Thuật toán tìm kiếm cơ bản

### Breadth First Search (BFS)

Đặc điểm:

- Duyệt theo chiều rộng.
- Mở rộng các nút theo từng mức.
- Đảm bảo tìm được lời giải ngắn nhất nếu chi phí bằng nhau.

### Depth First Search (DFS)

Đặc điểm:

- Đi sâu nhất có thể.
- Tiết kiệm bộ nhớ.
- Không đảm bảo tối ưu.

### Uniform Cost Search (UCS)

Đặc điểm:

- Luôn mở rộng nút có chi phí nhỏ nhất.
- Đảm bảo tìm được lời giải tối ưu.

---

# Chương 2. Logic mệnh đề

## Biểu diễn tri thức

Một hệ thống AI cần:

- Lưu trữ tri thức.
- Suy luận từ tri thức.
- Tạo ra tri thức mới.

## Thành phần của một hệ biểu diễn tri thức

### Cú pháp

Mô tả cách viết công thức.

### Ngữ nghĩa

Mô tả ý nghĩa của công thức.

### Cơ chế suy diễn

Cho phép suy ra kết luận từ các tri thức đã biết.

## Logic mệnh đề

Mệnh đề là câu có giá trị:

- Đúng
- Sai

Ví dụ:

P: Trời mưa.

Q: Đường ướt.

## Các phép toán logic

- Phủ định (¬)
- Hội (∧)
- Tuyển (∨)
- Kéo theo (→)
- Tương đương (↔)

## Suy diễn

Một số luật suy diễn cơ bản:

### Modus Ponens

Nếu:

P → Q

và

P

thì suy ra:

Q

### Resolution

Là kỹ thuật suy diễn quan trọng trong trí tuệ nhân tạo.

---

# Chương 3. Suy diễn xác suất

## Tại sao cần xác suất?

Trong thực tế:

- Tri thức không đầy đủ.
- Dữ liệu không chắc chắn.
- Có yếu tố ngẫu nhiên.

Logic truyền thống không đủ để xử lý các trường hợp này.

## Xác suất

Giá trị xác suất nằm trong khoảng:

0 ≤ P(A) ≤ 1

## Xác suất có điều kiện

P(A|B)

Ý nghĩa:

Xác suất A xảy ra khi biết B đã xảy ra.

## Định lý Bayes

Định lý Bayes là nền tảng của suy diễn xác suất.

Công thức:

P(A|B) = P(B|A) × P(A) / P(B)

Ứng dụng:

- Chẩn đoán bệnh.
- Phân loại thư rác.
- Nhận dạng.

## Suy diễn xác suất

Mục tiêu:

Tính xác suất của các giả thuyết dựa trên các bằng chứng quan sát được.

---

# Chương 4. Giới thiệu học máy

## Học máy là gì?

Học máy là lĩnh vực nghiên cứu các phương pháp giúp máy tính học từ dữ liệu.

## Các ứng dụng của học máy

- Nhận dạng chữ viết.
- Nhận dạng giọng nói.
- Nhận dạng hình ảnh.
- Khai phá dữ liệu.
- Dự báo.
- Hệ gợi ý.

## Các dạng học

### Học có giám sát

Dữ liệu có nhãn.

### Học không giám sát

Dữ liệu không có nhãn.

### Học bán giám sát

Kết hợp dữ liệu có nhãn và không nhãn.

## Cây quyết định (Decision Tree)

Là mô hình phân loại dựa trên các luật quyết định dạng cây.

Ưu điểm:

- Dễ hiểu.
- Dễ triển khai.

## Phân loại Bayes đơn giản (Naive Bayes)

Giả định các thuộc tính độc lập.

Ưu điểm:

- Nhanh.
- Hiệu quả với dữ liệu văn bản.

## Học dựa trên ví dụ

Ví dụ:

k-Nearest Neighbors (kNN)

Ý tưởng:

Phân loại dựa trên các mẫu gần nhất.

---

# Các câu hỏi ôn tập thường gặp

1. Bài toán tìm kiếm trong không gian trạng thái là gì?
2. Phân biệt BFS và DFS.
3. Thế nào là tính đầy đủ và tính tối ưu?
4. Biểu diễn tri thức là gì?
5. Logic mệnh đề gồm những phép toán nào?
6. Modus Ponens là gì?
7. Tại sao cần suy diễn xác suất?
8. Phát biểu định lý Bayes.
9. Học máy là gì?
10. So sánh học có giám sát và không giám sát.
11. Decision Tree hoạt động như thế nào?
12. Naive Bayes dựa trên giả định gì?