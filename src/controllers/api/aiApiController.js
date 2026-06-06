const mongoose = require("mongoose");
const AIConversation = require("../../models/aiConversation");
const aiService = require("../../services/aiService");

const MAX_FILES_PER_MESSAGE = 5;
const MAX_FILE_SIZE = 20 * 1024 * 1024;

const getCurrentUser = (req) => req.session?.user;

const normalizeFilesFromRequest = (files = {}) => {
    const result = [];

    const pushFile = (value) => {
        if (!value) return;
        if (Array.isArray(value)) {
            value.forEach(pushFile);
            return;
        }
        if (value.name && value.data) {
            result.push(value);
        }
    };

    pushFile(files.files);
    pushFile(files.file);
    pushFile(files.attachments);
    pushFile(files.attachment);
    pushFile(files.images);
    pushFile(files.image);

    if (result.length === 0) {
        Object.values(files).forEach(pushFile);
    }

    return result;
};

const getOldAttachmentsForContext = (conversation) => {
    return (conversation.messages || [])
        .flatMap((msg) => msg.attachments || [])
        .slice(-5);
};

const createConversationTitle = (message, files = []) => {
    if (message && message.trim()) {
        return message.trim().slice(0, 80);
    }

    if (files.length > 0) {
        return `Phân tích ${files[0].name}`.slice(0, 80);
    }

    return "Cuộc trò chuyện mới";
};

const createConversation = async (req, res) => {
    try {
        const user = getCurrentUser(req);
        const title = req.body.title || "Cuộc trò chuyện mới";

        const conversation = await AIConversation.create({
            user: user.id,
            title,
            messages: [],
        });

        return res.status(200).json({
            EC: 0,
            EM: "Tạo cuộc trò chuyện AI thành công",
            DT: conversation,
        });
    } catch (error) {
        console.error("createConversation error:", error);
        return res.status(500).json({
            EC: -1,
            EM: "Không thể tạo cuộc trò chuyện AI",
            DT: null,
        });
    }
};

const getConversations = async (req, res) => {
    try {
        const user = getCurrentUser(req);

        const conversations = await AIConversation.find({ user: user.id })
            .select("title updatedAt createdAt messages")
            .sort({ updatedAt: -1 })
            .lean();

        const data = conversations.map((item) => ({
            _id: item._id,
            title: item.title,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            messageCount: item.messages?.length || 0,
            lastMessage: item.messages?.length
                ? item.messages[item.messages.length - 1].content
                : "",
        }));

        return res.status(200).json({
            EC: 0,
            EM: "Lấy danh sách cuộc trò chuyện AI thành công",
            DT: data,
        });
    } catch (error) {
        console.error("getConversations error:", error);
        return res.status(500).json({
            EC: -1,
            EM: "Không thể lấy danh sách cuộc trò chuyện AI",
            DT: null,
        });
    }
};

const getConversationDetail = async (req, res) => {
    try {
        const user = getCurrentUser(req);
        const { conversationId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
            return res.status(400).json({
                EC: 1,
                EM: "conversationId không hợp lệ",
                DT: null,
            });
        }

        const conversation = await AIConversation.findOne({
            _id: conversationId,
            user: user.id,
        }).lean();

        if (!conversation) {
            return res.status(404).json({
                EC: 1,
                EM: "Không tìm thấy cuộc trò chuyện AI",
                DT: null,
            });
        }

        return res.status(200).json({
            EC: 0,
            EM: "Lấy chi tiết cuộc trò chuyện AI thành công",
            DT: conversation,
        });
    } catch (error) {
        console.error("getConversationDetail error:", error);
        return res.status(500).json({
            EC: -1,
            EM: "Không thể lấy chi tiết cuộc trò chuyện AI",
            DT: null,
        });
    }
};

const updateConversationTitle = async (req, res) => {
    try {
        const user = getCurrentUser(req);
        const { conversationId } = req.params;
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                EC: 1,
                EM: "Tiêu đề không hợp lệ",
                DT: null,
            });
        }

        const conversation = await AIConversation.findOneAndUpdate(
            { _id: conversationId, user: user.id },
            { title: title.trim().slice(0, 100) },
            { new: true }
        );

        if (!conversation) {
            return res.status(404).json({
                EC: 1,
                EM: "Không tìm thấy cuộc trò chuyện AI",
                DT: null,
            });
        }

        return res.status(200).json({
            EC: 0,
            EM: "Cập nhật tiêu đề thành công",
            DT: conversation,
        });
    } catch (error) {
        console.error("updateConversationTitle error:", error);
        return res.status(500).json({
            EC: -1,
            EM: "Không thể cập nhật tiêu đề",
            DT: null,
        });
    }
};

const deleteConversation = async (req, res) => {
    try {
        const user = getCurrentUser(req);
        const { conversationId } = req.params;

        const conversation = await AIConversation.findOneAndDelete({
            _id: conversationId,
            user: user.id,
        });

        if (!conversation) {
            return res.status(404).json({
                EC: 1,
                EM: "Không tìm thấy cuộc trò chuyện AI",
                DT: null,
            });
        }

        return res.status(200).json({
            EC: 0,
            EM: "Xóa cuộc trò chuyện AI thành công",
            DT: null,
        });
    } catch (error) {
        console.error("deleteConversation error:", error);
        return res.status(500).json({
            EC: -1,
            EM: "Không thể xóa cuộc trò chuyện AI",
            DT: null,
        });
    }
};

const postChat = async (req, res) => {
    try {
        const user = getCurrentUser(req);
        const message = req.body.message || "";
        const conversationId = req.body.conversationId;
        const files = normalizeFilesFromRequest(req.files || {});

        if (!message.trim() && files.length === 0) {
            return res.status(400).json({
                EC: 1,
                EM: "Vui lòng nhập tin nhắn hoặc gửi file/ảnh",
                DT: null,
            });
        }

        if (files.length > MAX_FILES_PER_MESSAGE) {
            return res.status(400).json({
                EC: 1,
                EM: `Chỉ được gửi tối đa ${MAX_FILES_PER_MESSAGE} file mỗi lần`,
                DT: null,
            });
        }

        for (const file of files) {
            if ((file.size || 0) > MAX_FILE_SIZE) {
                return res.status(400).json({
                    EC: 1,
                    EM: `File ${file.name} vượt quá 20MB`,
                    DT: null,
                });
            }
        }

        let conversation = null;

        if (conversationId) {
            if (!mongoose.Types.ObjectId.isValid(conversationId)) {
                return res.status(400).json({
                    EC: 1,
                    EM: "conversationId không hợp lệ",
                    DT: null,
                });
            }

            conversation = await AIConversation.findOne({
                _id: conversationId,
                user: user.id,
            });

            if (!conversation) {
                return res.status(404).json({
                    EC: 1,
                    EM: "Không tìm thấy cuộc trò chuyện AI",
                    DT: null,
                });
            }
        }

        if (!conversation) {
            conversation = await AIConversation.create({
                user: user.id,
                title: createConversationTitle(message, files),
                messages: [],
            });
        }

        const uploadedAttachments = [];
        for (const file of files) {
            const attachment = await aiService.uploadToOpenAI(file);
            uploadedAttachments.push(attachment);
        }

        const oldAttachments = getOldAttachmentsForContext(conversation);
        const attachmentsForAI = [...oldAttachments, ...uploadedAttachments];

        const result = await aiService.chatWithAI({
            user,
            conversationMessages: conversation.messages,
            message,
            attachments: attachmentsForAI,
        });

        conversation.messages.push({
            role: "user",
            content: message.trim(),
            attachments: uploadedAttachments,
        });

        conversation.messages.push({
            role: "assistant",
            content: result.answer,
            attachments: [],
        });

        await conversation.save();

        return res.status(200).json({
            EC: 0,
            EM: "AI trả lời thành công",
            DT: {
                conversationId: conversation._id,
                answer: result.answer,
                attachments: uploadedAttachments,
            },
        });
    } catch (error) {
        console.error("postChat AI error:", error);

        return res.status(500).json({
            EC: -1,
            EM: error.message || "Không thể xử lý yêu cầu chatbot AI",
            DT: null,
        });
    }
};

module.exports = {
    postChat,
    createConversation,
    getConversations,
    getConversationDetail,
    updateConversationTitle,
    deleteConversation,
};
