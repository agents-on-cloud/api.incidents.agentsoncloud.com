const { User } = require("../../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({});
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};
const createUser = async (req, res) => {
  const { body } = req;
  try {
    const user = await User.create(body);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  createUser,
};
