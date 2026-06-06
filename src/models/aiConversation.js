const mongoose = require("mongoose");

const aiAttachmentSchema = new mongoose.Schema(
    {
        openaiFileId: {
            type: String,
            required: true,
        },
        originalName: {
            type: String,
            required: true,
        },
        mimeType: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            default: 0,
        },
        kind: {
            type: String,
            enum: ["image", "file"],
            required: true,
        },
    },
    { _id: false }
);

const aiMessageSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },
        content: {
            type: String,
            default: "",
        },
        attachments: {
            type: [aiAttachmentSchema],
            default: [],
        },
    },
    { timestamps: true }
);

const aiConversationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title: {
            type: String,
            default: "Cuộc trò chuyện mới",
            trim: true,
        },
        messages: {
            type: [aiMessageSchema],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AIConversation", aiConversationSchema);
