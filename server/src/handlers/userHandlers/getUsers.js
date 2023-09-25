const { verifyToken } = require("../../helpers/generateTokens");

const getUsers = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken(token);
    console.log("tokenData", tokenData);
    if (tokenData.id) {
      res.send(tokenData);
    } else res.status(409).send({ error: "Tu por aqui no pasas!" });
  } catch (error) {}
};
module.exports = { getUsers };
