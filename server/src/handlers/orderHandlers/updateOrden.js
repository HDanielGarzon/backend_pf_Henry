const { Order } = require('../../db');

const updateOrden = async (req, res) => {
  const { ordenId, estado } = req.query; // Obtener ordenId y estado de la consulta

  try {
    const orden = await Order.findOne({
      where: { ordenId }
    });

    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }

    await orden.update({ status: estado });

    res.json({ message: "Estado de la orden actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { updateOrden };

