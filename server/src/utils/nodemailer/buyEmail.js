const nodemailer = require("nodemailer");
const { User } = require("../../db");
const jwt = require("jsonwebtoken");

const buySendEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new Error("Unauthorized");
  }

  // const payload = { sub: user.id };
  // const token = jwt.sign(payload, process.env.JWT_SECRET, {
  //   expiresIn: "15min",
  // });
  const link = `http://localhost:5174/home`; //ejemplo
  // await User.update({ recoveryToken: token }, { where: { id: user.id } });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  await transporter.sendMail({
    from: "correopruebadesarrollo77@gmail.com", // sender address
    to: `${user.email}`, // list of receivers
    subject: "Estado de compra",
    html: `<b>Hola ${user.name}, te damos la bienvenida a Divano. ¡Tu compra fue EXITOSA!</b>`, // html body
  });

  // console.log("Message sent: %s", info.messageId);
  return "mensaje enviado";
};

module.exports = {
  buySendEmail,
};
