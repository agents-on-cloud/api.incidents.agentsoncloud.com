const updatesRouter = require("express").Router();
const {
  createUpdates,
  getIncidentUpdates,
  deleteUpdate,
} = require("../controllers/updates");
updatesRouter.post("/", createUpdates);
updatesRouter.get("/:id", getIncidentUpdates);
// updatesRouter.put("/update/comment/:id", updateComments);
updatesRouter.delete("/:id", deleteUpdate);

module.exports = updatesRouter;
