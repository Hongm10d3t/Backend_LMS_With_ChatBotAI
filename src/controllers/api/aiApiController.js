const aiService = require("../../services/aiService");

const postChat = async (req, res) => {
    try {
        const user = req.session?.user;

        if (!user) {
            return res.status(401).json({
                EC: 1,
                EM: "Bạn chưa đăng nhập",
                DT: null,
            });
        }

        const { messages } = req.body;

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                EC: 1,
                EM: "Danh sách tin nhắn không hợp lệ",
                DT: null,
            });
        }

        const result = await aiService.chatWithAI({
            user,
            messages,
        });

        return res.status(200).json({
            EC: 0,
            EM: "AI trả lời thành công",
            DT: result,
        });
    } catch (error) {
        console.error("postChat AI error:", error);

        return res.status(500).json({
            EC: -1,
            EM: "Không thể xử lý yêu cầu chatbot AI",
            DT: null,
        });
    }
};

module.exports = {
    postChat,
};