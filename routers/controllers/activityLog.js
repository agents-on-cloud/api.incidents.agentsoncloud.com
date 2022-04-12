const { ActivityLog } = require("../../models/index");

const getActivityByIncidentId = async (req, res) => {
  try {
    const incidentId = req.params.id;

    const activityLog = await ActivityLog.findAll({
      where: { incidentId },
    });
    return res.json(activityLog);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
module.exports = {
  getActivityByIncidentId,
};
