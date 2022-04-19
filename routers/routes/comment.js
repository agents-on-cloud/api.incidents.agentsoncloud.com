const commentRouter = require("express").Router();
const {
  createComment,
  getComments,
  updateComments,
  deleteComments,
} = require("../controllers/comment");
commentRouter.post("/", createComment);
commentRouter.get("/:incidentId", getComments);
commentRouter.put("/update/comment/:id", updateComments);
commentRouter.delete("/:id", deleteComments);

module.exports = commentRouter;
