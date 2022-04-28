const updatesRouter = require("express").Router();
const {
  createUpdates,
  getIncidentUpdates,
  deleteUpdate,
  updateTextUpdate,
} = require("../controllers/updates");
updatesRouter.post("/", createUpdates);
updatesRouter.get("/:id", getIncidentUpdates);
updatesRouter.put("/update/:id", updateTextUpdate);
updatesRouter.delete("/:id", deleteUpdate);

module.exports = updatesRouter;
