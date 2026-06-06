const express = require("express");
const routerAPI = express.Router();

const aiApiController = require("../../controllers/api/aiApiController");
const { requireLogin } = require("../../middleware/authMiddlewareApi");

routerAPI.use(requireLogin);

routerAPI.post("/chat", aiApiController.postChat);
routerAPI.post("/conversations", aiApiController.createConversation);
routerAPI.get("/conversations", aiApiController.getConversations);
routerAPI.get("/conversations/:conversationId", aiApiController.getConversationDetail);
routerAPI.patch("/conversations/:conversationId", aiApiController.updateConversationTitle);
routerAPI.delete("/conversations/:conversationId", aiApiController.deleteConversation);

module.exports = routerAPI;
