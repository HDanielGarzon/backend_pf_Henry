const { User, Order, Products, Op } = require('../../db');

const orderCreate = async (req, res) => {
  try {
    const {  items,total,nombre,apellido,telefono,email,direccion,nota,orderDate} = req.body;

    const user = await User.findOne({
      where:{email}
    });

    if (!user) {
      return res.status(400).json({ error: 'El usuario no existe' });
    }


    const order = await Order.create({
      UserId: user.id, // Asigna el usuario a la orden
      nombre,
      apellido,
      telefono,
      email,
      direccion,
      nota,
      orderDate,
      total,
    });

    if (items && items.length > 0) {
      const products = await Products.findAll({
        where: { id: { [Op.in]: items } }, // Busca los productos por sus IDs
      });

      // Asocia los productos a la orden
      await order.addProducts(products);
    }

    res.status(201).json(order); // Devuelve la orden creada
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { orderCreate };