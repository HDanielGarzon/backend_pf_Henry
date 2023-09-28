const { Order,User, Products} = require('../../db');

const getOrden = async (req, res) => {
    const {email} = req.params
  try {
    const orden = await Order.findOne({
        where:{email},
      include: [
        { model: User, required: true },
        { model: Products, required: true },
      ],
    });

    if(!orden){
        res.status(200).json({mesanje:"no exite orden"});
    }

    res.status(200).json(orden);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getOrden };
