const { Op } = require("sequelize");
const {
  Incident,
  ImpactedIssue,
  IncidentImpactedIssue,
  Assignee,
  Responder,
} = require("../../models/index");

const createIncident = async (req, res, err) => {
  const { body } = req;
  console.log(body, "body");
  try {
    const incident = await Incident.create(body);

    if (body.impactedIssues && body.impactedIssues.length) {
      const incidentIssues = body.impactedIssues.map((issue) => {
        return {
          incidentId: incident.id,
          impactedIssueId: issue.id,
          item: issue.item,
        };
      });

      await IncidentImpactedIssue.bulkCreate(incidentIssues);
    }

    if (body.assignee && body.assignee.length) {
      const incidentAssignee = body.assignee.map((id) => {
        return {
          incidentId: incident.id,
          userId: id,
        };
      });
      await Assignee.bulkCreate(incidentAssignee);
    }
    if (body.responder && body.responder.length) {
      const incidentResponder = body.assignee.map((userId) => {
        return {
          incidentId: incident.id,
          userId: userId,
        };
      });
      await Responder.bulkCreate(incidentResponder);
    }
    console.log("result", incident);
    res.json(incident);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};
const deleteIncidentById = async (req, res) => {
  try {
    const id = req.params.id;
    const incident = await Incident.destroy({
      where: { id: id },
    });
    res.json(incident);
  } catch (err) {
    console.log(err);
  }
};
const updateState = async (req, res) => {
  try {
    const { state } = req.body;
    const { id } = req.params;
    const stateUpdated = await Incident.update(
      {
        state,
      },
      { where: { id: id } }
    );
    res.json(state);
  } catch (err) {
    console.log(err);
  }
};
const getAllIncident = async (req, res) => {
  try {
    const allIncident = await Incident.findAll({
      include: ImpactedIssue,
      order: [["deadline"]],
    });
    res.json(allIncident);
  } catch (err) {
    console.log(err);
  }
};
const getIncidentsCreatedByMe = async (req, res) => {
  try {
    const { id } = req.params;
    const allIncident = await Incident.findAll({
      where: { creatorId: id },
      include: ImpactedIssue,
      Assignee,
      order: [["deadline"]],
    });
    // console.log(allIncident, "allIncidentallIncident");
    // priority = allIncident.map((incident) => {
    //   return incident.priority;
    // });
    // console.log(priority.sort(), "this.priority");
    res.json(allIncident);
  } catch (err) {
    console.log(err);
  }
};

const getIncidentsAssigneToMe = async (req, res) => {
  try {
    const { id } = req.params;
    const assignee = await Assignee.findAll({
      where: { userId: id },
    });
    const ids = assignee.map((user) => user.incidentId);
    const incidentsAssignee = await Incident.findAll({
      where: {
        [Op.and]: [{ id: ids }, { state: { [Op.ne]: "Closed (preventive)" } }],
      },
      include: ImpactedIssue,
    });
    res.json(incidentsAssignee);
  } catch (err) {
    console.log(err);
  }
};
const getAttachmentsByIncidentId = async (req, res) => {
  Incident.findAll({ where: { recordStatus: "islatest" } })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};
const getIncidentById = async (req, res) => {
  try {
    const id = req.params.id;
    const incident = await Incident.findByPk(id, {
      include: ImpactedIssue,
    });
    res.json(incident);
  } catch (err) {
    console.log(err);
  }
};
const updateIncidentById = async (req, res) => {
  try {
    const id = req.params.id;
    const { body } = req;
    console.log(body, "body", { body });
    const incident = await Incident.findOne({ where: { id } });
    const newIncident = await Incident.update(body, {
      where: { id },
      // returning: ["*"],
    });
    // console.log(newIncident, "newIncidentqqqqqqqqqqqqqqqqqq");
    res.json({ incident: incident, newIncident: body });
  } catch (err) {
    console.log(err);
  }
};
const getIncidentHistory = async (req, res) => {
  try {
    const incidentHistory = await Incident.findAll({
      paranoid: false,
    });
    res.json(incidentHistory);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createIncident,
  deleteIncidentById,
  getAllIncident,
  getAttachmentsByIncidentId,
  getIncidentById,
  updateIncidentById,
  getIncidentsCreatedByMe,
  getIncidentsAssigneToMe,
  updateState,
  getIncidentHistory,
};
