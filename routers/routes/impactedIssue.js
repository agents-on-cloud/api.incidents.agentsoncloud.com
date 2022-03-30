const impactedIssuesRouter = require("express").Router();
const {
  createImpactedIssue,
  getImpactedIssuesById,
  getAllImpactedIssue,
} = require("../controllers/impactedIssue");
impactedIssuesRouter.post("/", createImpactedIssue);
impactedIssuesRouter.get("/", getAllImpactedIssue);
impactedIssuesRouter.get("/:id", getImpactedIssuesById);
module.exports = impactedIssuesRouter;
