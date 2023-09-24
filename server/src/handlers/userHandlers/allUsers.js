const { User, Administrator, Customer} = require('../../db');

const allUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Administrator, required: false },
        { model: Customer, required: false },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { allUsers };




