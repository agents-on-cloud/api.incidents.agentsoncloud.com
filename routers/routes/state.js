const stateRouter = require("express").Router();
const {
  addState,
  getStateByIncidentId,
  getStateResolved,
} = require("../controllers/state");

stateRouter.post("/:id", addState);
stateRouter.get("/allState/:id", getStateByIncidentId);
stateRouter.get("/stateResolved/:id", getStateResolved);
module.exports = stateRouter;
