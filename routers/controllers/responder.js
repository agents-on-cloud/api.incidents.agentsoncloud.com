const { Responder } = require("../../models");

const deleteResponderByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const responder = await Responder.destroy({ where: { userId: id } });
    res.json(responder);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  deleteResponderByUserId,
};
