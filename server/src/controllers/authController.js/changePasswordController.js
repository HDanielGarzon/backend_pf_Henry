const { User } = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const changePasswordController = async (token, newPassword) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log("payload", payload);
    const user = await User.findOne({ where: { id: payload.sub } });

    if (!user || user.recoveryToken !== token) {
      throw new Error("Unauthorized");
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await User.update(
      { recoveryToken: null, password: hash },
      { where: { id: user.id } }
    );

    return { message: "Password changed" };
  } catch (error) {
    throw new Error("unauthorized");
  }
};
module.exports = {
  changePasswordController,
};
