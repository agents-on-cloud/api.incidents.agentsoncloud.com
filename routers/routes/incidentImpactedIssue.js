const incidentImpactedIssueRouter = require("express").Router();
const {
  createIncidentImpactedIssues,
  getIncidentImpactedIssuesByIncidentId,
  getAllIncidentImpactedIssues,
} = require("../controllers/incidentImpactedIssues");
incidentImpactedIssueRouter.post("/", createIncidentImpactedIssues);
incidentImpactedIssueRouter.get("/:id", getIncidentImpactedIssuesByIncidentId);
incidentImpactedIssueRouter.get("/", getAllIncidentImpactedIssues);

module.exports = incidentImpactedIssueRouter;
