# ADR 002: Tích hợp AI Chatbot tư vấn nước hoa (Groq + Qdrant + Ollama Embeddings)
- Status: Accepted
- Date: 2026-05-13

## Ngữ cảnh (Context)
### Vấn đề hiện tại:
Cửa hàng chưa có công cụ hỗ trợ khách hàng tìm kiếm sản phẩm thông qua ngôn ngữ tự nhiên. Việc tìm kiếm hiện tại chỉ dựa trên filter cứng (tên, thương hiệu, giá), gây khó khăn cho khách hàng muốn tìm theo "cảm giác" hoặc "dịp sử dụng".

### Luồng hoạt động cũ (Old Flow):
Khách hàng tự lọc danh sách sản phẩm -> Đọc mô tả từng cái -> Tự quyết định.

### Use Case thực tế:
Khách hàng hỏi: "Tôi muốn tìm một loại nước hoa mùi hoa hồng, sang trọng để đi tiệc cưới, giá tầm 2 triệu."

### Yêu cầu mới:
1. Trả lời thông minh, hiểu ngữ cảnh hội thoại.
2. Dữ liệu tư vấn phải chính xác tuyệt đối dựa trên kho hàng hiện có (RAG).
3. Chi phí vận hành thấp, tốc độ phản hồi nhanh.

## Quyết định (Decision)
Sử dụng framework **Spring AI** để xây dựng hệ thống RAG (Retrieval-Augmented Generation):
1. **LLM**: Sử dụng `llama-3.3-70b-versatile` thông qua **Groq API** để đạt tốc độ xử lý cực nhanh và chi phí thấp.
2. **Vector Database**: Sử dụng **Qdrant** làm kho lưu trữ vector để tìm kiếm sản phẩm liên quan.
3. **Embedding Model**: Sử dụng **Ollama (mxbai-embed-large)** chạy local. Lý do: Groq không hỗ trợ API Embedding, việc dùng Ollama giúp đảm bảo quyền riêng tư dữ liệu, tiết kiệm chi phí và linh hoạt trong việc lựa chọn model embedding chất lượng cao.
4. **Đồng bộ dữ liệu (Sync Strategy)**: Sử dụng kiến trúc hướng sự kiện (Event-driven). `PerfumeService` phát ra `PerfumeEvent`, `AssistantEventListener` lắng nghe và cập nhật Qdrant sau khi transaction commit (`@TransactionalEventListener`) thông qua `VectorStorageService`.

## Hệ quả (Consequences)
- **Tích cực**:
    - Trải nghiệm khách hàng được nâng cao rõ rệt.
    - Hệ thống hoạt động tách biệt (decoupled), không làm chậm luồng nghiệp vụ chính của module Perfume.
    - Tiết kiệm chi phí API Embedding và kiểm soát hoàn toàn hạ tầng vector.
- **Tiêu cực**:
    - Cần quản lý thêm instance Qdrant và Ollama trong môi trường triển khai.
    - Phụ thuộc vào hiệu năng của server local khi thực hiện embedding.
