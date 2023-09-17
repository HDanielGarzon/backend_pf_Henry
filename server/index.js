/* const data=require("./src/fillDB/data") 
const server = require("./src/app");
const { sequelize } = require("./src/db");
const PORT = 3001;

sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server raise in PORT: ${PORT}`);
  });
}); */
const  {Products, Category}  = require('./src/db'); // Asegúrate de importar el modelo correcto de Sequelize
const dataP = require('./src/fillDB/data');
const dataC = require('./src/fillDB/dataCategory');
const server = require('./src/app');
const { sequelize } = require('./src/db');
const PORT = 3001;
const {createProductsAndRelations} = require('./src/handlers/productsHandlers/suvirDB')

async function cargarDatos() {
  try {
    // Sincroniza el modelo con la base de datos
    await sequelize.sync({ force: true });

    // Carga los datos en la base de datos
    // await Products.bulkCreate(dataP);
    await Category.bulkCreate(dataC);
    // await createProductsAndRelations()

    

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

