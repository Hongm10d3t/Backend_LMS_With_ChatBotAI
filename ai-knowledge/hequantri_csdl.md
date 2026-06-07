# Hệ Quản trị Cơ sở Dữ liệu (Database Management System - DBMS)

## Giới thiệu môn học

Hệ Quản trị Cơ sở Dữ liệu là môn học cung cấp các kiến thức nền tảng về cách tổ chức, lưu trữ, quản lý và khai thác dữ liệu trong các hệ thống thông tin.

Mục tiêu môn học:

* Hiểu các khái niệm cơ bản về cơ sở dữ liệu.
* Hiểu mô hình dữ liệu quan hệ.
* Thiết kế cơ sở dữ liệu.
* Sử dụng SQL để thao tác dữ liệu.
* Hiểu cơ chế quản lý giao dịch, bảo mật và phục hồi dữ liệu.

---

# Chương 1. Tổng quan về cơ sở dữ liệu

## Dữ liệu là gì?

Dữ liệu là các thông tin thô được lưu trữ để phục vụ cho việc xử lý và khai thác.

Ví dụ:

* Mã sinh viên
* Họ tên
* Điểm thi
* Ngày sinh

## Cơ sở dữ liệu là gì?

Cơ sở dữ liệu (Database) là tập hợp dữ liệu có liên quan với nhau được tổ chức và lưu trữ có hệ thống.

Ví dụ:

* Cơ sở dữ liệu sinh viên
* Cơ sở dữ liệu thư viện
* Cơ sở dữ liệu bệnh viện

## Hệ quản trị cơ sở dữ liệu (DBMS)

DBMS là phần mềm cho phép:

* Tạo cơ sở dữ liệu
* Quản lý dữ liệu
* Truy vấn dữ liệu
* Bảo mật dữ liệu
* Khôi phục dữ liệu

Ví dụ:

* MySQL
* PostgreSQL
* SQL Server
* Oracle
* MongoDB

---

# Chương 2. Mô hình dữ liệu quan hệ

## Bảng (Table)

Dữ liệu được lưu trong các bảng.

Ví dụ:

Bảng SinhVien

| MSSV | HoTen | Lop |
| ---- | ----- | --- |

## Bản ghi (Record)

Một dòng dữ liệu trong bảng.

## Thuộc tính (Attribute)

Một cột dữ liệu trong bảng.

## Miền giá trị (Domain)

Tập các giá trị hợp lệ của thuộc tính.

---

# Chương 3. Khóa trong cơ sở dữ liệu

## Khóa chính (Primary Key)

Dùng để xác định duy nhất một bản ghi.

Ví dụ:

```sql
id
```

Đặc điểm:

* Không được NULL
* Không trùng lặp

## Khóa ngoại (Foreign Key)

Dùng để liên kết giữa các bảng.

Ví dụ:

```sql
student_id
```

tham chiếu đến:

```sql
students.id
```

## Candidate Key

Tập thuộc tính có khả năng trở thành khóa chính.

## Super Key

Tập thuộc tính có khả năng phân biệt các bản ghi.

---

# Chương 4. Mô hình ER

## Thực thể (Entity)

Đối tượng cần quản lý.

Ví dụ:

* Sinh viên
* Giảng viên
* Môn học

## Thuộc tính (Attribute)

Thông tin mô tả thực thể.

Ví dụ:

* Họ tên
* Ngày sinh

## Quan hệ (Relationship)

Mối liên hệ giữa các thực thể.

Ví dụ:

Sinh viên đăng ký môn học.

## Các loại quan hệ

### One-to-One (1-1)

Ví dụ:

Người và căn cước công dân.

### One-to-Many (1-N)

Ví dụ:

Lớp học có nhiều sinh viên.

### Many-to-Many (N-N)

Ví dụ:

Sinh viên học nhiều môn học.

---

# Chương 5. Chuẩn hóa dữ liệu

## Mục tiêu

Giảm dư thừa dữ liệu.

Giảm bất thường khi cập nhật.

## First Normal Form (1NF)

Không có thuộc tính lặp.

## Second Normal Form (2NF)

Đạt 1NF và loại bỏ phụ thuộc bộ phận.

## Third Normal Form (3NF)

Đạt 2NF và loại bỏ phụ thuộc bắc cầu.

---

# Chương 6. Ngôn ngữ SQL

## DDL

Data Definition Language.

Ví dụ:

```sql
CREATE TABLE
ALTER TABLE
DROP TABLE
```

## DML

Data Manipulation Language.

Ví dụ:

```sql
INSERT
UPDATE
DELETE
```

## DQL

Data Query Language.

Ví dụ:

```sql
SELECT
```

## DCL

Data Control Language.

Ví dụ:

```sql
GRANT
REVOKE
```

---

# Chương 7. Truy vấn SQL

## SELECT

```sql
SELECT * FROM students;
```

## WHERE

```sql
SELECT * FROM students
WHERE class = 'D21CQCN01';
```

## ORDER BY

```sql
SELECT * FROM students
ORDER BY gpa DESC;
```

## GROUP BY

```sql
SELECT class, COUNT(*)
FROM students
GROUP BY class;
```

## JOIN

### INNER JOIN

```sql
SELECT *
FROM students s
INNER JOIN classes c
ON s.class_id = c.id;
```

### LEFT JOIN

Trả về toàn bộ dữ liệu bên trái.

---

# Chương 8. Transaction

## Transaction là gì?

Transaction là một nhóm thao tác được thực hiện như một đơn vị công việc.

Ví dụ:

* Chuyển tiền ngân hàng
* Thanh toán hóa đơn

## ACID

### Atomicity

Hoặc thực hiện toàn bộ hoặc không thực hiện gì.

### Consistency

Dữ liệu luôn hợp lệ.

### Isolation

Các transaction không ảnh hưởng lẫn nhau.

### Durability

Dữ liệu được lưu bền vững.

---

# Chương 9. Điều khiển tương tranh

## Vấn đề

Nhiều người dùng cùng truy cập dữ liệu.

## Các lỗi thường gặp

### Lost Update

Ghi đè dữ liệu của nhau.

### Dirty Read

Đọc dữ liệu chưa commit.

### Phantom Read

Kết quả truy vấn thay đổi trong cùng transaction.

## Locking

Sử dụng khóa để bảo vệ dữ liệu.

---

# Chương 10. Phục hồi dữ liệu

## Mục tiêu

Khôi phục dữ liệu khi hệ thống gặp lỗi.

## Các loại lỗi

* Lỗi hệ thống
* Lỗi phần cứng
* Mất điện
* Lỗi ứng dụng

## Backup

Tạo bản sao dữ liệu.

## Recovery

Khôi phục dữ liệu từ bản sao lưu.

---

# Chương 11. Index

## Index là gì?

Cấu trúc dữ liệu giúp tăng tốc truy vấn.

Ví dụ:

```sql
CREATE INDEX idx_name
ON students(name);
```

## Ưu điểm

* Truy vấn nhanh hơn.

## Nhược điểm

* Tốn bộ nhớ.
* Làm chậm thao tác INSERT/UPDATE.

---

# Chương 12. View, Trigger và Stored Procedure

## View

Bảng ảo được tạo từ truy vấn.

```sql
CREATE VIEW student_view AS
SELECT * FROM students;
```

## Trigger

Đoạn mã tự động thực thi khi dữ liệu thay đổi.

Ví dụ:

* Ghi log
* Kiểm tra dữ liệu

## Stored Procedure

Tập lệnh SQL được lưu trong DBMS.

Ưu điểm:

* Tái sử dụng.
* Tăng hiệu năng.
* Bảo mật tốt hơn.

---

# Câu hỏi ôn tập thường gặp

1. Cơ sở dữ liệu là gì?
2. DBMS là gì?
3. Phân biệt khóa chính và khóa ngoại.
4. Mô hình ER gồm những thành phần nào?
5. Chuẩn hóa dữ liệu để làm gì?
6. SQL gồm những nhóm lệnh nào?
7. JOIN dùng để làm gì?
8. ACID là gì?
9. Transaction là gì?
10. Index có tác dụng gì?
11. Trigger và Stored Procedure khác nhau như thế nào?
12. Khi nào nên sử dụng View?
