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
module.exports = {
  addState,
};
