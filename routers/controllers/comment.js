const { Comment } = require("../../models/index");

const createComment = async (req, res) => {
  const { body } = req;
  try {
    const result = await Comment.create(body);
    return res.json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
const getComments = async (req, res) => {
  const id = req.params.incidentId;
  try {
    const result = await Comment.findAll({ where: { incidentId: id } });
    return res.json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = {
  createComment,
  getComments,
};
