const commentRouter = require("express").Router();
const {
  createComment,
  getComments,
  updateComments,
} = require("../controllers/comment");
commentRouter.post("/", createComment);
commentRouter.post("/:incidentId", getComments);
commentRouter.post("/update/comment", updateComments);

module.exports = commentRouter;
