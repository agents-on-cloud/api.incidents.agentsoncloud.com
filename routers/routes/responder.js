const responderRouter = require("express").Router();
const { createResponder, getResponder } = require("../controllers/responder");
responderRouter.post("/", createResponder);
responderRouter.get("/", getResponder);
module.exports = responderRouter;
