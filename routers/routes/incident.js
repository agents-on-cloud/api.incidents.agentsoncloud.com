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
} = require("../controllers/incident");
incidentRouter.post("/", createIncident);
incidentRouter.get("/", getAllIncident);
incidentRouter.get("/details/:id", getIncidentById);
incidentRouter.patch("/:id", updateIncidentById);
incidentRouter.delete("/:id", deleteIncidentById);
incidentRouter.get("/:id", getIncidentsCreatedByMe);
incidentRouter.get("/assignee/:id", getIncidentsAssigneToMe);
incidentRouter.patch("/state/:id", updateState);
incidentRouter.post("/history", getIncidentHistory);
module.exports = incidentRouter;
