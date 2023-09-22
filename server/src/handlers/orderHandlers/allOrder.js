const { Order,User, Products} = require('../../db');

const allOrder = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, required: true },
        { model: Products, required: true },
      ],
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { allOrder };
