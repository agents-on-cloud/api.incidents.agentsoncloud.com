const { Op } = require("sequelize");
const {
  Incident,
  ImpactedIssue,
  IncidentImpactedIssue,
  Assignee,
  Attachment,
  Responder,
  User,
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
          impacted: issue.impacted || false,
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

    // await incident.setAssignees([body.assignee]);
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
    const { state, reasonOnHold, actionCorrective, actionPreventive } =
      req.body;
    const { id } = req.params;
    const stateUpdated = await Incident.update(
      {
        state,
        reasonOnHold,
        actionCorrective,
        actionPreventive,
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

      include: [
        {
          model: ImpactedIssue,
        },
        {
          model: User,
          as: "assignees",
        },
        {
          model: User,
          as: "responders",
        },
      ],
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
        [Op.and]: [{ id: ids }, { state: { [Op.ne]: "Closed" } }],
      },
      include: [
        {
          model: ImpactedIssue,
        },
        {
          model: User,
          as: "responders",
        },
      ],
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
      include: [
        {
          model: ImpactedIssue,
        },
        {
          model: User,
          as: "assignees",
        },
      ],
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
      include: [
        {
          model: ImpactedIssue,
        },
        {
          model: Attachment,
        },
        {
          model: User,
          as: "assignees",
        },
        {
          model: User,
          as: "responders",
        },
      ],
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
    if (body.assignee && body.assignee.length) {
      const incidentAssignee = body.assignee.map((userId) => {
        return {
          incidentId: id,
          userId: userId,
        };
      });
      await Assignee.destroy({ where: { incidentId: id } });
      await Assignee.bulkCreate(incidentAssignee);
    }
    if (body.responder && body.responder.length) {
      const incidentResponder = body.responder.map((userId) => {
        console.log(incident, id, userId, ":::::::::::::::::::");

        return {
          incidentId: id,
          userId: userId,
        };
      });
      await Responder.destroy({ where: { incidentId: id } });
      await Responder.bulkCreate(incidentResponder);
    }

    // const impactedIssue = await ImpactedIssue.update(body.impactedIssues, {
    //   where: {},
    //   individualHooks: true,
    // });
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
const addSecondaryAssignee = async (req, res) => {
  const { secondaryAssigneeId, incidentId, deadline } = req.body;

  try {
    const secondaryAssignee = await Assignee.create(
      { userId: secondaryAssigneeId, incidentId: incidentId },
      {
        where: { deadline },
      }
    );
    res.json(secondaryAssignee);
  } catch (err) {
    console.log(err);
  }
};
const deleteAssignee = async (req, res) => {
  const { id } = req.params;
  try {
    const assignee = await Assignee.destroy({
      where: { id },
    });
    res.json(assignee);
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
  addSecondaryAssignee,
  deleteAssignee,
};
