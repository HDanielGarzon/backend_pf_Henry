const { User } = require("../../db");
const { tokenSing } = require("../../helpers/generateTokens");
const { compare } = require("../../helpers/handlerBcrype");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({ error: "user not found" });
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
    res.send({ error: error.message });
  }
};

module.exports = { loginUser };
