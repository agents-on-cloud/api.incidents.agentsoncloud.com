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
    });
    return res.json(incidentUpdates);
  } catch (err) {
    console.log(err);
  }
};
// const updateComments = async (req, res) => {
//   const { comment, userId } = req.body;
//   const { id } = req.params;
//   try {
//     const commentUpdated = await Comment.update(
//       { comment, userId },
//       {
//         where: { incidentId: id, userId: userId },
//       }
//     );

//     return res.json(commentUpdated);
//   } catch (err) {
//     console.log(err);
//   }
// };

const deleteUpdate = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const update = await Updates.destroy({
      where: { id: id, userId: userId },
    });

    return res.json(update);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUpdates,
  getIncidentUpdates,
  deleteUpdate,
};
