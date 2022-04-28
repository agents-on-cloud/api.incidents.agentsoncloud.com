const replayRouter = require("express").Router();
const {
  createReplay,
  getReplaysByCommentId,
  updateReplay,
  deleteReplay,
} = require("../controllers/Replay");
replayRouter.post("/", createReplay);
replayRouter.get("/:id", getReplaysByCommentId);
replayRouter.put("/update/Replay/:id", updateReplay);
replayRouter.delete("/:id", deleteReplay);

module.exports = replayRouter;
