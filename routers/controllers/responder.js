const incident = require("../../models/incident");
const { Responder } = require("../../models/index");

const createResponder = async (req, res) => {
  const { body } = req;
  try {
    const result = await Responder.create(body);
    return res.json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
const getResponder = async (req, res) => {
  try {
    const responders = await Responder.findAll();
    return res.json(responders);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
// const getResponderByIncidentId = async (req, res) => {
//   try {
//     const responder = await Responder.findOne({where:{id:incidentId}});
//     return res.json(responders);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };

module.exports = {
  createResponder,
  getResponder,
};
