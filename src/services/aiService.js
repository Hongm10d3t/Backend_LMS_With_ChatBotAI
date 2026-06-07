const OpenAI = require("openai");
const { toFile } = require("openai/uploads");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const LMS_SYSTEM_PROMPT = `
Bạn là Trợ lý AI PTIT EDU, được tích hợp trong hệ thống học tập trực tuyến PTIT EDU.

Vai trò của bạn là trợ lý học tập và trợ lý hỗ trợ sử dụng hệ thống dành cho sinh viên, giảng viên và quản trị viên.

==================================================
1. PHẠM VI HỖ TRỢ
==================================================

A. Hỗ trợ sử dụng hệ thống LMS

Admin:
- Quản lý tài khoản.
- Quản lý học kỳ.
- Quản lý lớp học.
- Quản lý thành viên lớp.
- Quản lý thông báo.

Teacher:
- Quản lý lớp học.
- Quản lý tài liệu.
- Quản lý ngân hàng câu hỏi.
- Quản lý đề thi.
- Theo dõi kết quả học tập.
- Chat lớp học.

Student:
- Xem lớp học.
- Xem tài liệu.
- Làm bài thi.
- Xem lịch sử làm bài.
- Quản lý ghi chú.
- Chat lớp học.

--------------------------------------------------

B. Hỗ trợ học tập

Có thể:

- Giải thích kiến thức môn học.
- Tóm tắt tài liệu học tập.
- Trả lời câu hỏi ôn tập.
- Gợi ý phương pháp học.
- Tạo câu hỏi luyện tập.
- Tạo flashcard.
- So sánh các khái niệm.
- Giải thích thuật ngữ chuyên ngành.

--------------------------------------------------

C. Hỗ trợ đọc tài liệu và hình ảnh

Khi người dùng gửi:

- PDF
- DOCX
- TXT
- Markdown
- CSV
- PPT
- PPTX
- Ảnh

Bạn có thể:

- Đọc nội dung.
- Tóm tắt.
- Phân tích.
- Trích xuất ý chính.
- Giải thích nội dung.
- Tạo câu hỏi ôn tập.
- Trả lời các câu hỏi liên quan đến nội dung đã gửi.

Nếu người dùng hỏi tiếp trong cùng cuộc trò chuyện, hãy tiếp tục sử dụng ngữ cảnh của tài liệu đã được cung cấp trước đó.

==================================================
2. NGUỒN KIẾN THỨC
==================================================

Bạn được cung cấp các tài liệu học tập thông qua hệ thống tri thức của PTIT EDU.

Khi trả lời:

- Ưu tiên sử dụng tài liệu học tập được cung cấp.
- Ưu tiên kiến thức phù hợp với chương trình học của PTIT.
- Có thể kết hợp kiến thức nền tảng của bạn để giải thích rõ hơn.

Nếu tài liệu không đủ thông tin:

Hãy nói:

"Hiện tại tôi chưa có đủ tài liệu để trả lời chính xác câu hỏi này."

Không được tự bịa ra thông tin chính thức.

==================================================
3. NHỮNG ĐIỀU KHÔNG ĐƯỢC LÀM
==================================================

Không được:

- Tự truy cập dữ liệu hệ thống.
- Tự suy đoán dữ liệu người dùng.
- Tự suy đoán điểm số.
- Tự suy đoán kết quả học tập.
- Tự suy đoán lớp học.
- Tự suy đoán tài khoản.
- Tự suy đoán dữ liệu từ database.

Bạn chỉ biết những dữ liệu được backend cung cấp.

==================================================
4. CÁCH TRẢ LỜI
==================================================

Luôn trả lời bằng tiếng Việt.

Trả lời giống một trợ giảng đại học đang hỗ trợ sinh viên.

Không sử dụng các câu mở đầu như:

- "Theo tài liệu bạn gửi..."
- "Dựa trên tài liệu..."
- "Trong tài liệu..."
- "Theo nguồn dữ liệu..."

Thay vào đó hãy trả lời trực tiếp nội dung.

Ví dụ:

Không nên:

"Theo tài liệu bạn gửi, môn Nhập môn AI..."

Nên:

"Môn Nhập môn AI cung cấp các kiến thức nền tảng về..."

--------------------------------------------------

Khi người dùng hỏi tổng quan:

- Trả lời ngắn gọn.
- Nêu các ý chính.
- Giải thích dễ hiểu.

Khi người dùng hỏi chi tiết:

- Giải thích sâu hơn.
- Đưa ví dụ minh họa.
- Liên hệ thực tế nếu phù hợp.

--------------------------------------------------

Khi trả lời từ tài liệu:

- Không sao chép nguyên văn.
- Ưu tiên diễn giải lại.
- Ưu tiên tóm tắt.
- Ưu tiên giải thích.

--------------------------------------------------

Không hiển thị:

- filecite
- citation
- ID tài liệu
- ID file
- metadata hệ thống
- tên vector store

==================================================
5. PHONG CÁCH GIAO TIẾP
==================================================

Phong cách:

- Thân thiện.
- Chuyên nghiệp.
- Ngắn gọn.
- Dễ hiểu.

Luôn ưu tiên giúp sinh viên học tốt hơn thay vì chỉ sao chép nội dung tài liệu.
`;

const buildUserContext = (user) => {
    if (!user) return "Người dùng hiện tại chưa xác định.";

    return `
Thông tin người dùng đang đăng nhập:
- ID: ${user.id || "Không rõ"}
- Mã người dùng: ${user.code || "Không rõ"}
- Họ tên: ${user.name || "Không rõ"}
- Vai trò: ${user.role || "Không rõ"}
`;
};

const getAttachmentKind = (mimeType = "") => {
    return mimeType.startsWith("image/") ? "image" : "file";
};

const isSupportedMimeType = (mimeType = "") => {
    const allowedMimeTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
        "image/gif",
        "application/pdf",
        "text/plain",
        "text/markdown",
        "text/csv",
        "application/json",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    return allowedMimeTypes.includes(mimeType);
};

const uploadToOpenAI = async (uploadedFile) => {
    if (!uploadedFile) {
        throw new Error("File không hợp lệ");
    }

    if (!isSupportedMimeType(uploadedFile.mimetype)) {
        throw new Error(`Định dạng file không được hỗ trợ: ${uploadedFile.mimetype}`);
    }

    const kind = getAttachmentKind(uploadedFile.mimetype);

    const openaiFile = await openai.files.create({
        file: await toFile(uploadedFile.data, uploadedFile.name),
        purpose: kind === "image" ? "vision" : "user_data",
    });

    return {
        openaiFileId: openaiFile.id,
        originalName: uploadedFile.name,
        mimeType: uploadedFile.mimetype,
        size: uploadedFile.size || uploadedFile.data?.length || 0,
        kind,
    };
};

const buildUserContent = ({ message, attachments = [] }) => {
    const content = [
        {
            type: "input_text",
            text: message && message.trim()
                ? message.trim()
                : "Hãy phân tích nội dung file/ảnh tôi gửi.",
        },
    ];

    for (const attachment of attachments) {
        if (attachment.kind === "image") {
            content.push({
                type: "input_image",
                file_id: attachment.openaiFileId,
            });
        } else {
            content.push({
                type: "input_file",
                file_id: attachment.openaiFileId,
            });
        }
    }

    return content;
};

const normalizeConversationHistory = (messages = []) => {
    return messages
        .slice(-12)
        .filter((msg) => msg && msg.content)
        .map((msg) => ({
            role: msg.role === "assistant" ? "assistant" : "user",
            content: String(msg.content).slice(0, 3000),
        }));
};

const chatWithAI = async ({ user, conversationMessages = [], message = "", attachments = [] }) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("Missing OPENAI_API_KEY");
    }

    const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;

    const input = [
        {
            role: "developer",
            content: `${LMS_SYSTEM_PROMPT}\n\n${buildUserContext(user)}`,
        },
        ...normalizeConversationHistory(conversationMessages),
        {
            role: "user",
            content: buildUserContent({ message, attachments }),
        },
    ];

    const payload = {
        model,
        input,
    };

    if (vectorStoreId) {
        payload.tools = [
            {
                type: "file_search",
                vector_store_ids: [vectorStoreId],
                max_num_results: 5,
            },
        ];
    }
    const response = await openai.responses.create(payload);

    const cleanAnswer = (response.output_text || "")
        .replace(/[\uE000-\uF8FF]+/g, "")
        .replace(/filecite|turn\d+file\d+/g, "")
        .replace(/\[\]/g, "")
        .trim();

    return {
        answer: cleanAnswer || "Xin lỗi, tôi chưa tạo được câu trả lời.",
    };
};

module.exports = {
    chatWithAI,
    uploadToOpenAI,
};
