const incidentRouter = require("express").Router();
const {
  createIncident,
  getAllIncident,
  getIncidentById,
  updateIncidentById,
  deleteIncidentById,
  getIncidentsCreatedByMe,
  getIncidentsAssigneToMe,
  updateState,
  getIncidentHistory,
  getIncidentsResponderToMe,
  addSecondaryAssignee,
  deleteAssignee,
} = require("../controllers/incident");
incidentRouter.post("/", createIncident);
incidentRouter.get("/", getAllIncident);
incidentRouter.get("/details/:id", getIncidentById);
incidentRouter.put("/:id", updateIncidentById);
incidentRouter.delete("/:id", deleteIncidentById);
incidentRouter.get("/creator/:id", getIncidentsCreatedByMe);
incidentRouter.get("/assignee/:id", getIncidentsAssigneToMe);
incidentRouter.put("/state/:id", updateState);
incidentRouter.get("/history", getIncidentHistory);
incidentRouter.get("/responder/:id", getIncidentsResponderToMe);
incidentRouter.put("/secondaryAssignee/:id/:incidentId", addSecondaryAssignee);
incidentRouter.delete("/assignee/:id", deleteAssignee);
module.exports = incidentRouter;
