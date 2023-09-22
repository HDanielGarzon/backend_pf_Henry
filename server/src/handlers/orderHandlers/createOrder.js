const { User, Order, Products, Op } = require('../../db');

const orderCreate = async (req, res) => {
  try {
    const { orderDate, totalAmount, status, userId, productIds } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'El usuario no existe' });
    }

    const order = await Order.create({
      UserId: user.id, // Asigna el usuario a la orden
      orderDate,
      totalAmount,
      status,
    });

    if (productIds && productIds.length > 0) {
      const products = await Products.findAll({
        where: { id: { [Op.in]: productIds } }, // Busca los productos por sus IDs
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