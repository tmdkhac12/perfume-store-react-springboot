# Documentation Standards: Flows & Architecture Decisions

Tài liệu này quy định tiêu chuẩn để Agent/Developer thực hiện ghi chép các thay đổi về luồng nghiệp vụ (Flow) và các quyết định kiến trúc (ADR) trong dự án. Mọi tài liệu tạo mới phải tuân thủ nghiêm ngặt cấu trúc dưới đây để đảm bảo tính nhất quán và khả năng truy vết (traceability).

---

## 1. Architecture Decision Records (ADR)
Tất cả các thay đổi quan trọng về giải pháp, công nghệ hoặc kiến trúc phải được ghi lại trong `docs/adr/` theo định dạng: `[ID]-[tên-ngắn-gọn].md`.

**Cấu trúc bắt buộc của một bản ADR:**
- **Status:** [Proposed / Accepted / Superseded]
- **Date:** [Ngày thực hiện]
- **Ngữ cảnh (Context):**
    - **Vấn đề hiện tại:** Mô tả hạn chế hoặc lỗi của hệ thống hiện tại.
    - **Luồng hoạt động cũ (Old Flow):** Liệt kê các bước xử lý cũ để đối chiếu.
    - **Use Case thực tế:** Đưa ra ví dụ cụ thể về tình huống người dùng gặp phải vấn đề.
    - **Yêu cầu mới:** Những mục tiêu cần đạt được sau khi thay đổi.
- **Quyết định (Decision):** Giải thích chi tiết giải pháp kỹ thuật được chọn.
- **Hệ quả (Consequences):** Liệt kê các tác động Tích cực và Tiêu cực (nếu có).

---

## 2. Diagram as Code (Flow Documentation)
Các luồng nghiệp vụ phức tạp phải được mô tả trong `docs/flows/` với cấu trúc giúp Developer dễ dàng tra cứu code.

**Yêu cầu bắt buộc:**

### A. Sơ đồ Sequence (Mermaid)
- Sử dụng **tên Class thực tế** trong dự án cho các `participant`.
- Không sử dụng alias (bí danh) trừ khi tên class quá dài gây khó đọc sơ đồ.
- Mô tả rõ các nhánh `alt/else` và các chú thích `Note`.

### B. Bảng liên kết Code (Traceability Table)
Phải có một bảng liệt kê các thành phần tham gia luồng và link trực tiếp đến file nguồn.
| Thành phần | Class thực tế | Mô tả |
| :--- | :--- | :--- |
| Tên logic | `Link đến file .java` | Vai trò trong luồng |

### C. Chi tiết logic
Giải thích bằng văn bản các bước xử lý quan trọng được thể hiện trong sơ đồ.

---

## Ví dụ mẫu chuẩn (Reference Example)

### ADR Example
```markdown
# ADR 001: [Tên quyết định]
- Status: Accepted
- Date: 2026-05-11

## Ngữ cảnh (Context)
### Vấn đề hiện tại: ...
### Luồng hoạt động cũ: ...
### Use Case thực tế: ...
...
```

### Flow Example
```markdown
# [Tên Luồng Nghiệp Vụ]
## Sơ đồ Sequence
```mermaid
sequenceDiagram
    participant ExactClassName
    ...
```
## Các thành phần chính và Liên kết Code
| Thành phần | Class thực tế | Mô tả |
| :--- | :--- | :--- |
| Filter | [`MyFilter.java`](../../src/path/to/MyFilter.java) | ... |
```
