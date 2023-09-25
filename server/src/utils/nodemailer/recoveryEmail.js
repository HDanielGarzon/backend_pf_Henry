const nodemailer = require("nodemailer");
const { User } = require("../../db");
const jwt = require("jsonwebtoken");

const sendEmail = async (email) => {
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new Error("Unauthorized");
  }

  const payload = { sub: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15min",
  });
  const link = `http://localhost:5174/newPassword?token=${token}`; //ejemplo
  await User.update({ recoveryToken: token }, { where: { id: user.id } });

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
    subject: "Email para recuperar contraseña",
    html: `<b>Ingresa a este link para recuperar tu contraseña: ${link}</b>`, // html body
  });

  // console.log("Message sent: %s", info.messageId);
  return "mensaje enviado";
};

module.exports = {
  sendEmail,
};
