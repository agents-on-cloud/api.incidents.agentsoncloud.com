const { IncidentImpactedIssue } = require("../../models/index");

const createIncidentImpactedIssues = async (req, res) => {
  console.log(Object.keys(db), "dbbb");
  const { incidentId, impactedIssueId } = req.body;

  try {
    const incidentImpactedIssue = await IncidentImpactedIssue.create({
      incidentId,
      impactedIssueId,
    });
    res.json(incidentImpactedIssue);
  } catch (err) {
    console.log(err);
  }
};
const getIncidentImpactedIssuesByIncidentId = async (req, res) => {
  console.log(req.params, "req.params");
  const incidentId = req.params.id;

  try {
    const incidentImpactedIssue = await IncidentImpactedIssue.findAll({
      where: { incidentId },
    });
    res.json(incidentImpactedIssue);
  } catch (err) {
    console.log(err);
  }
};
const getAllIncidentImpactedIssues = async (req, res) => {
  try {
    const incidentImpactedIssue = await IncidentImpactedIssue.findAll();
    res.json(incidentImpactedIssue);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createIncidentImpactedIssues,
  getIncidentImpactedIssuesByIncidentId,
  getAllIncidentImpactedIssues,
};
