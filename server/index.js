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

// const { Products, Category } = require('./src/db');
// const app = require("./src/app");
// const { sequelize } = require("./src/db");
// const axios = require("axios");

// async function cargarDatos() {
//   try {
//     // Sincroniza el modelo con la base de datos
//     await sequelize.sync(); // No se necesita { force: true } si no deseas recrear la base de datos cada vez

//     // Carga los datos en la base de datos
//     const categoryApi = (await axios.get("http://localhost:5001/category")).data;
//     const productApi = (await axios.get("http://localhost:5000/products")).data;

//     // Crea las categorías en la base de datos
//     for (const categoryData of categoryApi) {
//       // Si 'image' está ausente o es nulo, asigna un valor por defecto
//       if (!categoryData.image) {
//         categoryData.image = 'default.jpg'; // Cambia 'default.jpg' al valor que desees
//       }
//       await Category.create({
//         name: categoryData.name,
//         image: categoryData.image,
//         // Agrega aquí otros campos si es necesario
//       });
//     }

//     // Crea los productos en la base de datos y asocia las categorías
//     for (const productData of productApi) {
//       const measures = productData.measures || { width: "", height: "", deep: "" }; // Define medidas por defecto si no están presentes
//       const product = await Products.create({
//         name: productData.name,
//         price: productData.price,
//         description: productData.description,
//         measures: measures, // Asigna las medidas a partir de los datos o las medidas por defecto
//         // Agrega aquí otros campos si es necesario
//       });

//       // Busca la categoría correspondiente en la base de datos
//       const category = await Category.findOne({
//         where: { name: productData.category },
//       });

//       // Asocia el producto con la categoría
//       if (category) {
//         await product.addCategory(category);
//       }
//     }

//     console.log("Datos cargados exitosamente en la base de datos.");

//     // Levanta el servidor después de cargar los datos
//     app.listen(3001, () => {
//       console.log("Servidor iniciado en el puerto 3001");
//     });
//   } catch (error) {
//     console.error("Error al cargar datos:", error);
//   }
// }

// // Llama a la función para cargar los datos
// cargarDatos();


