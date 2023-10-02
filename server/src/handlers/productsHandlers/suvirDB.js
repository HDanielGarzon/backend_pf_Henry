// const { Product, Category } = require("../../db"); // Asegúrate de importar los modelos correctos de Sequelize
// const { muebles } = require("../../fillDB/data");

// const createProductsAndRelations = async () => {
//   try {
//     // Obtener todas las categorías de la base de datos
//     const categories = await Category.findAll();

//     // Crear un objeto de mapeo para buscar las categorías por nombre
//     const categoryMap = new Map();
//     categories.forEach(category => {
//       categoryMap.set(category.name, category);
//     });

//     // Iterar sobre los muebles y agregar las categorías correspondientes
//     const createdProducts = await Promise.all(
//       muebles.map(async mueble => {
//         const category = categoryMap.get(mueble.category);
//         if (category) {
//           // Crea un producto y establece sus atributos
//           const product = await Product.create({
//             name: mueble.name,
//             color: mueble.color,
//             // Agrega otros atributos del producto aquí
//           });

//           // Asocia el producto con la categoría
//           await product.addCategory(category);
//           return product;
//         }
//       })
//     );

//     // Devolver los productos creados
//     return createdProducts.filter(Boolean);
//   } catch (error) {
//     console.error("Error al buscar categorías o crear productos:", error);
//     throw new Error("Error al buscar categorías o crear productos");
//   }
// };

// module.exports = {
//   createProductsAndRelations
// };




require("dotenv").config();
const { STRIPE_KEY } = process.env;
const { Student, Course, Order } = require("../../../db.js");
const stripe = require("stripe")(STRIPE_KEY);
const stripePay = async (req, res) => {
  const { email, token, orderId } = req.body;
  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      res.status(404).send({ message: "No se encontro la orden" });
    }
    const student = await Student.findOne({
      where: {
        id: order.studentId,
      },
    });
    if (!student) {
      res.status(404).send({ message: "No se encontro el estudiante" });
    }
    let customer = await stripe.customers.create({
      //Crea el cliente
      email: email,
      source: token.id,
      name: token.card.name,
    });
    let charge = await stripe.charges.create({
      //Crea el cargo
      amount: parseFloat(order.amount) * 100,
      description: `Payment for USD ${order.amount}`,
      currency: "USD",
      customer: customer.id,
    });
    if (charge) {
      //Si se creo el cargo
      // return res.status(200).send(charge);
      student.addCourse(order.arrayCoursesId); //Agrega los cursos al estudiante
      await Order.update(
        {
          status: true,
        },
        {
          where: {
            id: order.id,
          },
        }
      );
      return res.status(200).send({ message: "Pago realizado con exito" });
    } else {
      return res.status(404).send({ message: "Ha ocurrido un error" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};







