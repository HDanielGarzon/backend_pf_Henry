require("dotenv").config();
const { STRIPE_KEY } = process.env;
const { User, Products, Order } = require("../../db");

const stripe = require("stripe")(STRIPE_KEY);

const payOrder = async (req, res) => {
  const { email, token, orderId } = req.body;
  
  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });
    
    if (!order) {
      return res.status(404).send({ message: "No se encontro la orden" });
    }

    // Suponiendo que desea encontrar un usuario asociado con el pedido
    const user = await User.findOne({
      where: {
        id: order.userId, // Ajuste esto según la estructura de su base de datos.
      },
    });
    
    if (!user) {
      return res.status(404).send({ message: "No se encontro el usuario" });
    }

    // Utilice el correo electrónico del cliente de Stripe si está disponible; de ​​lo contrario, utilice el correo electrónico del usuario
    const customerEmail = email || user.email;

    let customer = await stripe.customers.create({
      email: customerEmail,
      source: token,
    });

    let charge = await stripe.charges.create({
      amount: parseFloat(order.totalAmount) * 100,
      description: `Payment for order ${order.id}`,
      currency: "USD",
      customer: customer.id,
    });

    if (charge) {
      // Pago exitoso
      // Puedes actualizar el estado del pedido o realizar otras acciones aquí
      await Order.update(
        {
          status: "paid",
        },
        {
          where: {
            id: order.id,
          },
        }
      );
      
      return res.status(200).send({ message: "Pago realizado con éxito" });
    } else {
      return res.status(404).send({ message: "Ha ocurrido un error en el pago" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Ha ocurrido un error en el servidor" });
  }
};

module.exports = {
  payOrder,
};




































































// require("dotenv").config();
// const { STRIPE_KEY } = process.env;
// const { User,Products,Order } = require("../../db");

// const stripe = require("stripe")(STRIPE_KEY);



// const payOrder = async (req, res) => {
//   const { email, token, orderId } = req.body;
//   try {
//     const order = await Order.findOne({
//       where: {
//         id: orderId,
//       },
//     });
//     if (!order) {
//       res.status(404).send({ message: "No se encontro la orden" });
//     }
//     const student = await Student.findOne({
//       where: {
//         id: order.studentId,
//       },
//     });
//     if (!student) {
//       res.status(404).send({ message: "No se encontro el estudiante" });
//     }
//     let customer = await stripe.customers.create({
//       //Crea el cliente
//       email: email,
//       source: token.id,
//       name: token.card.name,
//     });
//     let charge = await stripe.charges.create({
//       //Crea el cargo
//       amount: parseFloat(order.amount) * 100,
//       description: `Payment for USD ${order.amount}`,
//       currency: "USD",
//       customer: customer.id,
//     });
//     if (charge) {
//       //Si se creo el cargo
//       // return res.status(200).send(charge);
//       student.addCourse(order.arrayCoursesId); //Agrega los cursos al estudiante
//       await Order.update(
//         {
//           status: true,
//         },
//         {
//           where: {
//             id: order.id,
//           },
//         }
//       );
//       return res.status(200).send({ message: "Pago realizado con exito" });
//     } else {
//       return res.status(404).send({ message: "Ha ocurrido un error" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error);
//   }
// };

// module.exports={
//     payOrder
// }