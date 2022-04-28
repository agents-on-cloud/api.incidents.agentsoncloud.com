const { CommentsReplay } = require("../../models/index");

const createReplay = async (req, res) => {
  const { body } = req;
  console.log(body, "godr");
  try {
    const replay = await CommentsReplay.create(body);

    return res.json(replay);
  } catch (err) {
    console.log(err);
  }
};
const getReplaysByCommentId = async (req, res) => {
  const { id } = req.params;
  try {
    const replays = await CommentsReplay.findAll({
      where: { commentId: id },
    });
    return res.json(replays);
  } catch (err) {
    console.log(err);
  }
};
const updateReplay = async (req, res) => {
  const { replayText, userId } = req.body;
  const { id } = req.params;
  try {
    const replayUpdated = await CommentsReplay.update(
      { replayText, userId },
      {
        where: { id, userId },
      }
    );

    return res.json(replayUpdated);
  } catch (err) {
    console.log(err);
  }
};

const deleteReplay = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const numberOfdeleted = await CommentsReplay.destroy({
      where: { id, userId },
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
  createReplay,
  getReplaysByCommentId,
  updateReplay,
  deleteReplay,
};
