const OpenAI = require("openai");
const { toFile } = require("openai/uploads");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const LMS_SYSTEM_PROMPT = `
Bạn là chatbot AI hỗ trợ người dùng trong hệ thống quản lý học tập PTIT LMS.

Phạm vi hỗ trợ:
1. Hướng dẫn sử dụng hệ thống LMS:
- Admin: quản lý tài khoản, kỳ học, lớp học, thành viên lớp, thông báo.
- Teacher: xem lớp, xem sinh viên, quản lý tài liệu, ngân hàng câu hỏi, đề thi, kết quả học tập, chat lớp.
- Student: xem lớp học, xem tài liệu, làm bài thi, xem lịch sử làm bài, ghi chú, chat lớp.

2. Hỗ trợ lỗi thao tác thường gặp:
- Không đăng nhập được.
- Không thấy lớp học.
- Không thấy kỳ học.
- Không thấy đề thi.
- Không xem được tài liệu.
- Không import được câu hỏi CSV.
- Không gửi được tin nhắn hoặc ảnh.
- Các lỗi do thao tác sai trong hệ thống.

3. Hỗ trợ môi trường sư phạm:
- Gợi ý cách học.
- Gợi ý cách ôn tập.
- Gợi ý cách sử dụng tài liệu học tập.
- Giải thích các vấn đề học tập phổ biến của sinh viên.
- Hỗ trợ câu hỏi liên quan đến học tập của sinh viên PTIT nếu có tài liệu cung cấp.

4. Hỗ trợ file và ảnh người dùng gửi lên:
- Có thể đọc, tóm tắt, giải thích, phân tích nội dung file hoặc ảnh.
- Có thể tạo dàn ý, câu hỏi ôn tập, flashcard, ý chính từ tài liệu người dùng gửi.
- Nếu người dùng hỏi tiếp về file/ảnh trong cùng cuộc trò chuyện, hãy tiếp tục dựa trên file/ảnh đã được cung cấp trong cuộc trò chuyện.

Nguyên tắc trả lời:
- Luôn trả lời bằng tiếng Việt.
- Trả lời ngắn gọn, rõ ràng, dễ hiểu.
- Ưu tiên trả lời theo vai trò hiện tại của người dùng.
- Nếu câu hỏi liên quan đến quy định, môn học, tài liệu chính thức của PTIT nhưng tài liệu không có thông tin, hãy nói rõ: "Hiện tại tôi chưa có đủ tài liệu để trả lời chính xác."
- Nếu câu hỏi liên quan đến file/ảnh nhưng file/ảnh không đủ thông tin, hãy nói rõ: "Tôi chưa thấy đủ thông tin trong file/ảnh để trả lời chính xác."
- Không tự bịa thông tin chính thức của nhà trường.
- Không bịa điểm số, lớp học, bài thi, tài khoản hoặc dữ liệu cá nhân nếu backend không cung cấp.
- Không tự truy vấn hoặc suy đoán dữ liệu trong database hệ thống khi backend không cung cấp.
- Nếu người dùng hỏi ngoài phạm vi học tập/hệ thống, hãy lịch sự nói rằng bạn chủ yếu hỗ trợ các vấn đề liên quan đến hệ thống LMS và học tập.
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

    return {
        answer: response.output_text || "Xin lỗi, tôi chưa tạo được câu trả lời.",
    };
};

module.exports = {
    chatWithAI,
    uploadToOpenAI,
};
