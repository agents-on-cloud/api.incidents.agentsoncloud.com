const { ImpactedIssue } = require("../../models/index");
// const incidentModel = require("../../models/incident")
const createImpactedIssue = async (req, res) => {
  const { body } = req;
  try {
    const impactedIssue = await ImpactedIssue.create(body);
    res.json(impactedIssue);
  } catch (err) {
    console.log(err);
  }
};
const getImpactedIssuesById = async (req, res) => {
  const id = req.params.id;
  try {
    const impactedIssue = await ImpactedIssue.findOne({
      where: { id },
    });
    res.json(impactedIssue);
  } catch (err) {
    console.log(err);
  }
};

const getAllImpactedIssue = async (req, res) => {
  try {
    const impactedIssues = await ImpactedIssue.findAll();
    res.json(impactedIssues);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createImpactedIssue,
  getImpactedIssuesById,
  getAllImpactedIssue,
};
