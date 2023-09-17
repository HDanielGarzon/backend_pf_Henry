const  {Products, Category}  = require('./src/db'); // Asegúrate de importar el modelo correcto de Sequelize
// const dataP = require('./src/fillDB/data');
// const dataC = require('./src/fillDB/dataCategory');
// const server = require('./src/app');
// const { sequelize } = require('./src/db');
// const PORT = 3001;

const app = require("./src/app");
const { sequelize } = require("./src/db");
const { default: axios } = require("axios");

// app.listen(3001, () => {
//   sequelize.sync({ force: true });
//   console.log("listening on port 3001");
// });

async function cargarDatos() {
  try {
    //     // Sincroniza el modelo con la base de datos
    await sequelize.sync({ force: true });

    //     // Carga los datos en la base de datos
    const categoryApi = (await axios.get("http://localhost:5001/category"))
      .data;
    const categoryDb = await Category.bulkCreate(categoryApi);

    const productApi = (await axios.get("http://localhost:5000/products")).data;
    const productDb = await Products.bulkCreate(productApi);

    for (const product of productDb) {
      for (const category of categoryDb) {
        if (product.category === category.name) {
          await product.addCategory(category)
          
        }
      }
    }

    console.log("Datos cargados exitosamente en la base de datos.");

    //     // Levanta el servidor después de cargar los datos
    app.listen(3001, () => {
      console.log("listening on port 3001");
    });
  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

// Llama a la función para cargar los datos
cargarDatos();
