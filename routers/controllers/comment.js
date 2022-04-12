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
  // const { userId } = req.body;
  try {
    const comment = await Comment.findAll({
      // where: { incidentId: id, userId: userId },
      where: { incidentId: id },
    });
    return res.json(comment);
  } catch (err) {
    console.log(err);
  }
};
const updateComments = async (req, res) => {
  const { body } = req;
  try {
    const commentUpdated = await Comment.create(body);
    console.log(commentUpdated, "commentUpdated");
    return res.json(commentUpdated);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createComment,
  getComments,
  updateComments,
};
