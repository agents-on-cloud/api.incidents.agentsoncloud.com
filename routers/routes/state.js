const stateRouter = require("express").Router();
const { addState } = require("../controllers/state");

stateRouter.post("/:id", addState);
module.exports = stateRouter;
