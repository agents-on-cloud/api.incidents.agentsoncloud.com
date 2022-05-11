const { Updates } = require("../../models/index");

const createUpdates = async (req, res) => {
  const { body } = req;
  try {
    const update = await Updates.create(body);
    return res.json(update);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
const getIncidentUpdates = async (req, res) => {
  const { id } = req.params;
  // const { userId } = req.body;
  try {
    const incidentUpdates = await Updates.findAll({
      where: { incidentId: id },
      order: [["createdAt", "DESC"]],
    });
    return res.json(incidentUpdates);
  } catch (err) {
    console.log(err);
  }
};
const updateTextUpdate = async (req, res) => {
  const { updateText, userId } = req.body;
  const { id } = req.params;
  console.log(req.body, "req.body");
  try {
    const textUpdated = await Updates.update(
      { updateText, userId },
      {
        where: { id: id, userId: userId },
      }
    );
    return res.json(textUpdated);
  } catch (err) {
    console.log(err);
  }
};

const deleteUpdate = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const numberOfdeleted = await Updates.destroy({
      where: { id: id, userId: userId },
    });

    if (numberOfdeleted === 1) {
      return res.json(id);
    }

    return res.json(null);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUpdates,
  getIncidentUpdates,
  updateTextUpdate,
  deleteUpdate,
};
