const commentRouter = require("express").Router();
const { createComment, getComments } = require("../controllers/comment");
commentRouter.post("/", createComment);
commentRouter.get("/:incidentId", getComments);

module.exports = commentRouter;
