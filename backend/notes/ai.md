Spring AI là 1 thư viện nhằm đơn giản hóa việc tích hợp trí tuệ nhân tạo (AI), đặc biệt là AI tạo sinh (Generative AI), vào các ứng dụng Java doanh nghiệp. Nó giúp Java developer xây dựng các ứng dụng AI-driven trong vài ngày thay vì hàng tuần "vật lộn" với các kỹ thuật phức tạp.

Spring AI giải quyết các "Pain Point" gì?
- Spring AI cung cấp các API trừu tượng hóa, giúp chuyển đổi giữa các nhà cung cấp AI (OpenAI, Ollama, Hugging Face) chỉ bằng cách thay đổi file cấu hình.
- Hỗ trợ chunking (chia nhỏ), tạo embedding, và lưu vào Vector Database 1 cách dễ dàng.
- Quản lý lịch sử hội thoại, context người dùng và template prompt với ChatClient API.
- Spring AI giúp kiểm soát token và bảo mật dữ liệu

Các chức năng chính của Spring AI
- Chat Models (Mô hình hội thoại): Tích hợp với OpenAI (ChatGPT), Ollama, Anthropic (Claude), Google (Gemini), Mistral, v.v..
- Vector Databases (Cơ sở dữ liệu Vector): Tích hợp với Apache Cassandra, Azure Vector Search, Chroma, Elasticsearch, MongoDB Atlas, Neo4j, PgVector, Pinecone, Redis, v.v., để thực hiện tìm kiếm ngữ nghĩa (semantic search).
- ETL Framework (Trích xuất, Biến đổi, Tải dữ liệu): Hỗ trợ nạp dữ liệu từ tài liệu doanh nghiệp (PDF, Word, Markdown) vào Vector Database.
- Function Calling (Gọi hàm): Cho phép các mô hình AI gọi đến các hàm (method) Java, giúp ứng dụng AI có thể thao tác dữ liệu thực tế (ví dụ: lấy dữ liệu từ database, gọi API nội bộ).
- Structured Output (Đầu ra cấu trúc): Ánh xạ phản hồi của AI (thường là text) trực tiếp thành các đối tượng Java (POJO).
- Image Generation & Text-to-Speech: Hỗ trợ tạo ảnh và chuyển đổi văn bản thành giọng nói.
- Moderation (Kiểm duyệt): Đảm bảo đầu ra của AI tuân thủ quy tắc bảo mật.
- Advisors API: Hỗ trợ RAG và quản lý bộ nhớ hội thoại.

Chức năng Chatbot tư vấn sản phẩm cần 2 giai đoạn chính, chuẩn bị dữ liệu (ETF) và truy vấn tư vấn (RAG)

Với ETF cần quan tâm 2 hàm
Data Aggregator():
    Ý nghĩa: Gom dữ liệu từ nhiều bảng (perfume, brand, note, volume). Tạo ra một chuỗi văn bản hoàn chỉnh cho mỗi chai nước hoa (ví dụ: "Chai X của hãng Y, có hương hoa hồng, giá 2tr...").
Vector Ingestion():
    Ý nghĩa: Đẩy dữ liệu văn bản vào hệ thống AI. Chuyển văn bản thành Vector (thông qua Embedding Model) và lưu vào Pinecone kèm theo perfume_id (metadata).

Với RAG:
Question-Answer Advisor: Đây là bộ điều phối của Spring AI, tự động kết nối Chat Model với Vector DB.
System Prompt Definition: Định hình tính cách cho AI. Thiết lập một đoạn văn bản ẩn (ví dụ: "Bạn là chuyên gia tư vấn nước hoa, chỉ được dùng dữ liệu được cung cấp...").
Luồng hoạt động (Flow):
1. User gửi câu hỏi: "Tôi muốn tìm nước hoa nữ mùi nhài dưới 1 triệu".
2. Advisor lấy câu hỏi đó, gửi lên Pinecone để tìm 3-5 chai nước hoa có "mùi nhài" và "giá dưới 1 triệu" dựa trên tính toán vector.
3. Pinecone trả về thông tin chi tiết của 3-5 chai đó.
4. Advisor ghép thông tin này vào câu hỏi gốc của User thành một Prompt khổng lồ.
5. LLM (Groq) đọc toàn bộ và viết ra một câu trả lời tự nhiên: "Dựa trên sở hữu của bạn, tôi có chai A và chai B rất phù hợp...".
6. User nhận câu trả lời.