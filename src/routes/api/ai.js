const express = require("express");
const routerAPI = express.Router();

const aiApiController = require("../../controllers/api/aiApiController");
const { requireLogin } = require("../../middleware/authMiddlewareApi");

routerAPI.use(requireLogin);

routerAPI.post("/chat", aiApiController.postChat);

module.exports = routerAPI;