// const { Order} = require('../../db');

// const updateStatus = async (req,res) =>{
//     const {email} = req.query
//     try {
//         const orden = await Order.findOne({
//             where:{email}
//         });

//         if (!orden) {
//             return res.status(404).json({ mensaje: 'Orden no encontrada' })
//           }

//           await orden.update({ status: "completado" });

//           res.send(200).json({message:"'Estado de la orden actualizado correctamente'"})

//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }

// module.exports = { updateStatus };


const { Order } = require('../../db');

const updateStatus = async (req, res) => {
  const { email, estado } = req.query; // Obtener el correo electrónico de la consulta

  try {
    const orden = await Order.findOne({
      where: { email }
    });

    if (!orden) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' }); // Cambiado el código de estado a 404 para indicar que no se encontró la orden
    }

    await orden.update({ status: estado });

    res.json({ message: "Estado de la orden actualizado correctamente" }); // Eliminado el código de estado 200
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}   

module.exports = { updateStatus };
