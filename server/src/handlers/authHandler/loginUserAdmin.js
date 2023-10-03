const { User } = require("../../db");
const { tokenSing } = require("../../helpers/generateTokens");
const { compare } = require("../../helpers/handlerBcrype");

const loginUserAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: {email: email} });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    if (user.role !== "administrator") {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const checkPassword = await compare(password, user.password);

    const tokenSession = await tokenSing(user);

    if (checkPassword) {
        const userCopy = { ...user.toJSON() };
        delete userCopy.password;
        delete userCopy.recoveryToken;
        return res.send({ data: userCopy, tokenSession });
    } else {
      return res.status(401).send({ error: "Incorrect password" });
    }
  } catch (error) {
    return res.send({ error: error.message });
  }
};

module.exports = { loginUserAdmin };
