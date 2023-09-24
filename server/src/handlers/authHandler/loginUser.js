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
      res.send({ data: user, tokenSession });
    }
    return;
  } catch (error) {}
};

module.exports = { loginUser };
