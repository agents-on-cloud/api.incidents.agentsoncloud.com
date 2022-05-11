const { State } = require("../../models/index");

const addState = async (req, res) => {
  try {
    const { state, actionText } = req.body;
    const { id } = req.params;

    const newState = await State.create({
      state: state,
      incidentId: id,
      actionText: actionText,
    });

    res.json(newState);
  } catch (err) {
    console.log(err);
  }
};
const getStateByIncidentId = async (req, res) => {
  try {
    const { id } = req.params;

    const allState = await State.findAll({
      where: { incidentId: id },
    });

    res.json(allState);
  } catch (err) {
    console.log(err);
  }
};
const getStateResolved = async (req, res) => {
  try {
    const { id } = req.params;

    const stateResolved = await State.findAll({
      where: { incidentId: id, state: "Resolved" },
    });

    res.json(stateResolved);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  addState,
  getStateByIncidentId,
  getStateResolved,
};
