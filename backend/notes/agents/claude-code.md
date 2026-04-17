# 🧠 Tài liệu Quản lý Quy trình Làm việc với AI (Vibe Coding)

### 📋 Quy tắc chung về Rules & Context
* **Cập nhật Rules:** Những thay đổi về rules dù nhỏ thì vẫn nên viết prompt cho AI để nó thay đổi vào bộ nhớ làm việc của chúng. Antigravity tự động quét `.agents` mỗi khi submit prompt.
* **Sử dụng @ (Mentions):** Chỉ cần dùng `@` khi muốn Agent tập trung đặc biệt vào 1 file cụ thể nào đó, việc dùng `@` giúp tiết kiệm context.
* **File đặc biệt:** `CLAUDE.md` là 1 file đặc biệt, nó sẽ luôn được load đầu tiên khi Agent khởi động vì nó chứa bản đồ dự án.
* **Tầm nhìn của AI:** Nếu bạn đang sửa file `index.html`, hãy đảm bảo file đó đang được mở trên tab biên tập hoặc dùng `@index.html` để Agent nhìn thấy chính xác nội dung hiện tại.

---

### 🔄 Quy tắc Session Handoff Management

1. **Mỗi khi bạn định tắt máy, hãy gửi một prompt cuối:**
> Trước khi kết thúc hãy cập nhật CLAUDE.md với những gì đã hoàn thành ở session này trạng thái cập nhật của từng phần, bước tiếp theo cần làm gì trong session sau. Những quyết định quan trọng đã đưa ra và lý do tại sao.

2. **Khi bạn mở máy lên và thấy khung chat trống trơn, đừng hoảng loạn. Hãy gõ:**
> Hãy đọc @CLAUDE.md và @tasks.md để nắm tình hình. Cho tôi biết chúng ta đã xong đến đâu, các bước tiếp theo là gì và có gì cần chú ý hay không.

3. **Khi bắt đầu 1 feature mới hoặc 1 feature phức tạp, hãy dùng Plan Mode và prompt sau:**
> Dựa trên CLAUDE.md và trạng thái hiện tại của dự án, hãy lên kế hoạch cho ..., ưu tiên những gì và làm theo thứ tự nào.

---

### 🗺️ CLAUDE.md cấu trúc chuẩn
1. **Tổng quan dự án:** Dự án này là gì, làm cho ai, mục đích gì.
2. **Tech stack.**
3. **Quy tắc thiết kế:** Màu sắc chủ đạo, font chữ, style tổng thể.
4. **Quy tắc bắt buộc:** Những thứ CLAUDE không được làm hoặc phải làm.
5. **Workflow:** Cách làm việc trong dự án này, sau mỗi thay đổi lớn thì làm gì.

* **Web tham khảo style:** `godly.website`
* **Kiểm tra chéo:** Khi prompt cho agent hãy luôn nhớ prompt làm xong phải kiểm tra lại lần nữa, so sánh với các file đã có và instructions xem đã đúng với cấu trúc chưa, tiếp tục sửa lại cho đến khi mọi thứ đều đúng và bám sát yêu cầu.

---

### 📂 Cấu trúc thư mục .claude/
```text
.claude/
├── CLAUDE.md              # bộ não dự án (đã học ở bài trước)
├── CLAUDE.local.md        # bản private, không đẩy lên GitHub
├── settings.json          # permissions + hooks
├── settings.local.json    # settings private
├── memory.md              # bộ nhớ cá nhân của Claude
├── rules/                 # quy tắc chi tiết, chia nhỏ từ CLAUDE.md (dùng khi CLAUDE.md quá dài >= 500 dòng)
│   ├── workflow.md
│   ├── design.md
│   └── tech-defaults.md
├── agents/                # các sub-agent chuyên dụng
│   ├── researcher.md
│   └── reviewer.md
└── skills/                # các tác vụ có thể tái sử dụng
    └── shop-amazon.md
```

### ⚙️ Vận hành và Quản lý Sub-agents
- Luôn chạy `/init` trước khi làm việc với bất kì folder nào.
- Những gì muốn CLAUDE nhớ phải luôn luôn nằm ở đầu file rules.
- Nếu CLAUDE mắc 1 lỗi sai 2 lần, hãy thêm vào rules để fix vĩnh viễn.
- **Có 3 loại sub-agents:**
    - **Research agent:** Đi ra internet tìm kiếm thông tin, dùng context thoải mái mà không ảnh hưởng đến parent.
    - **Reviewer agent:** Phát hiện ra những vấn đề mà parent bỏ qua.
    - **QA Testing agent:** Chạy test kiểm tra code có hoạt động đúng không.

### 📉 Cách quản lý context cho 1 session
- Từ 0-50% context là lúc CLAUDE hoạt động tốt nhất.
- Dùng lệnh `/compact` sau khi hoàn thành 1 task hoặc 1 milestone hoặc 1 feature rõ ràng. `/compact` cùng lệnh hãy ưu tiên giữ lại các kiến trúc của hệ thống.
- Hãy kiểm tra workspace này, liệt kê những files và folders không cần thiết nữa, sau đó hỏi tôi trước khi xóa.
- Sử dụng subagents khi nghiên cứu 1 thứ gì đó mới.

### 📝 Khi nào NÊN dùng Plan Mode
- Dùng để hiểu codebase của 1 dự án khi mới join.
- Bất kỳ task nào phức tạp hơn một thay đổi đơn lẻ.
- Khi build feature mới từ đầu.
- Khi tích hợp với external service (database, payment, API).
- Khi refactor code lớn.
- Khi bạn chưa chắc approach nào tốt nhất.
- Khi task sẽ ảnh hưởng đến nhiều file cùng lúc.

### 🛑 Khi KHÔNG cần Plan Mode
- Sửa lỗi nhỏ, đơn giản.
- Thay đổi text hoặc style nhỏ.
- Task bạn đã làm nhiều lần và biết rõ cách làm.

### ⚓ Hệ thống Hooks
- Hooks là những đoạn code được cấu hình để tự động chạy tại 1 thời điểm cụ thể.
- **Có 4 loại Hook events:**
    1. **PreToolUse:** Chạy trước khi Claude dùng 1 tool.
    2. **PostToolUse:** Chạy sau khi Claude dùng 1 tool.
    3. **Notification:** Chạy khi Claude gửi notification.
    4. **Stop:** Chạy khi Claude dừng hoàn toàn.

### 👥 Phân biệt Sub-agents & Agent Teams

#### Sub-agents:
- Một agent gọi nhiều child agents.
- Child agents KHÔNG giao tiếp với nhau.
- Kết quả luôn return về parent.
- Chi phí: tương đối thấp.

#### Agent Teams:
- Có Team Lead quản lý toàn bộ.
- Các teammates CÓ THỂ giao tiếp TRỰC TIẾP với nhau.
- Shared task list – như một Trello board cho AI.
- Mỗi teammate là một Claude instance hoàn chỉnh.
- Chi phí: **RẤT CAO** – 7x token usage so với một session bình thường.

#### Cách dùng:
- Để bật agent team thì nhờ Claude tạo và thêm vào settings.json
- Chỉ dùng agent team với các công việc độc lập như cần khám phá nhiều design cùng lúc, cần khám phá nhiều kiến trúc cùng lúc, không dùng với các tasks cần độ chính xác cao 