const responderRouter = require("express").Router();
const { deleteResponderByUserId } = require("../controllers/responder");

responderRouter.delete("/:id", deleteResponderByUserId);
module.exports = responderRouter;
