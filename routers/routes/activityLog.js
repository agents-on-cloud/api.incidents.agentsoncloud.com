const activityLogRouter = require("express").Router();
const { getActivityByIncidentId } = require("../controllers/activityLog");
activityLogRouter.get("/:id", getActivityByIncidentId);

module.exports = activityLogRouter;
