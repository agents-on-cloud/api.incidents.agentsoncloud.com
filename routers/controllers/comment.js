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
    const comment = await Comment.findAll({
      where: { incidentId: id },
    });
    return res.json(comment);
  } catch (err) {
    console.log(err);
  }
};
const updateComments = async (req, res) => {
  const { comment, userId } = req.body;
  const { id } = req.params;
  try {
    const commentUpdated = await Comment.update(
      { comment, userId },
      {
        where: { incidentId: id, userId: userId },
      }
    );

    return res.json(commentUpdated);
  } catch (err) {
    console.log(err);
  }
};

const deleteComments = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const numberOfdeleted = await Comment.destroy({
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
  createComment,
  getComments,
  updateComments,
  deleteComments,
};
