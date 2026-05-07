const path = require("path");
const { uploadSingleFile } = require("../../services/fileService");
const {
    getCourseMessagesService,
    postCreateMessageService,
} = require("../../services/messageService");

module.exports = {
    getCourseMessages: async (req, res) => {
        try {
            let courseId = req.params.courseId;
            let userId = req.session.user.id;
            let limit = Number(req.query.limit) || 50;

            let data = await getCourseMessagesService(courseId, userId, limit);

            return res.status(200).json({
                EC: 0,
                data,
            });
        } catch (error) {
            console.log("getCourseMessages error:", error);
            return res.status(500).json({
                EC: 1,
                EM: error.message || "Lỗi server khi lấy tin nhắn",
                data: null,
            });
        }
    },

    postCreateMessage: async (req, res) => {
        try {
            let courseId = req.params.courseId;
            let senderId = req.session.user.id;

            let data = {
                courseId,
                senderId,
                content: req.body?.content || "",
                type: "text",
                imageUrl: "",
            };

            if (req.files && req.files.image) {
                let uploadedImage = await uploadSingleFile(
                    req.files.image,
                    "images/upload"
                );

                if (uploadedImage.status !== "success") {
                    throw new Error("Tải ảnh lên thất bại");
                }

                data.type = "image";
                data.imageUrl = uploadedImage.publicUrl;
            } else {
                data.type = "text";
            }

            let result = await postCreateMessageService(data);

            return res.status(200).json({
                EC: 0,
                data: result,
            });
        } catch (error) {
            console.log("postCreateMessage error:", error);
            return res.status(500).json({
                EC: 1,
                EM: error.message || "Lỗi server khi gửi tin nhắn",
                data: null,
            });
        }
    },
};