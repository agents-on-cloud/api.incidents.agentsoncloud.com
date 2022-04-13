const { Op } = require("sequelize");
const {
  Incident,
  ImpactedIssue,
  IncidentImpactedIssue,
  Assignee,
  Attachment,
  Responder,
} = require("../../models/index");

const createIncident = async (req, res, err) => {
  const { body } = req;
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
      const incidentResponder = body.responder.map((id) => {
        return {
          incidentId: incident.id,
          userId: id,
        };
      });
      await Responder.bulkCreate(incidentResponder);
    }

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
    res.json(stateUpdated);
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

      include: [ImpactedIssue, Assignee],
      order: [["deadline"]],
    });
    // priority = allIncident.map((incident) => {
    //   return incident.priority;
    // });
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
const getIncidentsResponderToMe = async (req, res) => {
  try {
    const { id } = req.params;
    const responder = await Responder.findAll({
      where: { userId: id },
    });
    const ids = responder.map((user) => user.incidentId);
    const incidentsResponder = await Incident.findAll({
      where: {
        [Op.and]: [{ id: ids }, { state: { [Op.ne]: "Closed (preventive)" } }],
      },
      include: ImpactedIssue,
    });

    res.json(incidentsResponder);
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
      include: [ImpactedIssue, Attachment, Assignee],
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
    const incident = await Incident.update(body, {
      where: { id },
      individualHooks: true,
    });

    if (body.impactedIssues && body.impactedIssues.length) {
      const incidentIssues = body.impactedIssues.map((issue) => {
        return {
          incidentId: id,
          impactedIssueId: issue.id,
          item: issue.item,
        };
      });

      await IncidentImpactedIssue.destroy({ where: { incidentId: id } });
      await IncidentImpactedIssue.bulkCreate(incidentIssues);
      // await IncidentImpactedIssue.update(incidentIssues, {
      //   where: { incidentId: id },
      // });
    }

    const impactedIssue = await ImpactedIssue.update(body.impactedIssues, {
      where: {},
      individualHooks: true,
    });
    res.json({ incident });
  } catch (err) {
    console.log(err);
  }
};

const getIncidentHistory = async (req, res) => {
  try {
    const incidentHistory = await Incident.findAll({
      paranoid: false,
      include: ImpactedIssue,
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
  getIncidentsResponderToMe,
};
