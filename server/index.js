/* const data=require("./src/fillDB/data") 
const server = require("./src/app");
const { sequelize } = require("./src/db");
const PORT = 3001;

sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server raise in PORT: ${PORT}`);
  });
}); */
const  {Products}  = require('./src/db'); // Asegúrate de importar el modelo correcto de Sequelize
const data = require('./src/fillDB/data');
const server = require('./src/app');
const { sequelize } = require('./src/db');
const PORT = 3001;

async function cargarDatos() {
  try {
    // Sincroniza el modelo con la base de datos
    await sequelize.sync({ force: true });

    // Carga los datos en la base de datos
    await Products.bulkCreate(data);

    console.log('Datos cargados exitosamente en la base de datos.');

    // Levanta el servidor después de cargar los datos
    server.listen(PORT, () => {
      console.log(`Servidor en ejecución en el puerto: ${PORT}`);
    });
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
}

// Llama a la función para cargar los datos
cargarDatos();

