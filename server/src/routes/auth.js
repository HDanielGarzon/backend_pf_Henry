const { Router } = require("express");
const { authByEmailPwd } = require("../helpers/auth_by_email_pwd");
const { user_db } = require("../fillDB/usersfake");

const authRouter = Router();

// Endpoint publico
authRouter.get("/publico", (req, res) => res.send("Endpoint publico"));

// Endpoint autenticado
authRouter.post("/autenticado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPwd(email, password);
    return res.send(`Usuario ${user.id} autenticado`);
  } catch (error) {
    return res.sendStatus(401);
  }
});

// Endpoint autorizado

authRouter.post("/autorizado", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPwd(email, password);

    if (user.role !== "admin") return res.sendStatus(403);

    console.log("'''''''",user.phone);
    return res.send(`Usuario administrador ${user.name}`);
  } catch (error) {
    return res.sendStatus(401);
  }
});

module.exports = authRouter;
