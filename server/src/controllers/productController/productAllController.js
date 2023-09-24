const { default: axios } = require("axios");
const { Products, Category } = require("../../db");

const productAllController = async () => {
  //   const productos = await Products.findAll({
  //     include: [{ model: Category, attribute: ["name" ]}],
  //   });
  //   console.log(":::::::::::::::::", productos[0]);
  //   const categoryId = await Products.findByPk(id, {
  //       include: {
  //         model: Category,
  //         attributes: ["name"],
  //       },
  //     });
  //   await productos.setCategory(categoryId)

  //________________________________________

//   const categoryApi = (await axios.get("http://localhost:5001/category")).data;
//   const categoryDb = await Category.bulkCreate(categoryApi);
  
  
//   const productApi = (await axios.get("http://localhost:5000/products")).data;
//   const productDb = await Products.bulkCreate(productApi);

//   for (const product of productDb) {
//     const categoryId = product.categoryId;
//     const category = await Category.findByPk(categoryId);
//     if (category) {
//       await product.setCategory(category);
//     }
//   }
//-_____________________________________________

  const productos = await Products.findAll({
    attributes: {
      exclude: ['category'] 
    },
    include: { model: Category,  through:{// y de la tabla intermedia 
      attributes:[]//ninguno
  } },
  });
  //   await Promise.all(
  //     productos.map(async (product) => {
  //       const categoryId = categoryApi.find(
  //         (category) => category.id === product.categoryId
  //       );
  //       if (categoryId) {
  //         await product.setCategory(categoryId);
  //       }
  //       console.log("======", categoryId);
  //     })
  //   );

  //    const result = productos.map((producto)=>
  //         categoryApi.findOne({where: {name: producto.name}}))

  //      productos.setCategory(result)
  //   for (const producto of productos) {
  //     const category = categoryApi.find(
  //       (category) => category.name === producto.category
  //     );
  //     await producto.setCategory(category);
  //   }

    // console.log("???????????'", productos[0]);

    return productos;
//   const result = productos?.map((elem) => {
//     const catename = elem.category?.map(({ name }) => name);

//     // console.log("ggggg",elem);

//     console.log("catename", catename);

//     return {
//       id: elem.id,
//       name: elem.name,
//       description: elem.description,

//       rating: elem.rating,
//       image: elem.image,

//       category: catename,
//     };
//   });

//   return result
};
module.exports = {
  productAllController,
};


// -----------------
// const { default: axios } = require("axios");
// const { Products, Category } = require("../../db");

// const productAllController = async () => {
//   // 1. Importa las categorías desde el servicio JSON y guárdalas en la base de datos SQLite
//   const categoryApi = (await axios.get("http://localhost:5001/category")).data;
//   const categoryDb = await Category.bulkCreate(categoryApi);

//   // 2. Importa los productos desde el servicio JSON y guárdalos en la base de datos SQLite
//   const productApi = (await axios.get("http://localhost:5000/products")).data;

//   // Mapea los productos y asigna las categorías correspondientes
//   const productDb = await Promise.all(productApi.map(async (product) => {
//     const categoryId = product.categoryId;
//     const category = categoryDb.find((cat) => cat.categoryId === categoryId);

//     if (category) {
//       const createdProduct = await Products.create({
//         name: product.name,
//         price: product.price,
//         description: product.description,
//         image: product.image,
//         rating: product.rating,
//       });

//       await createdProduct.setCategory(category);
//       return createdProduct;
//     }
//   }));

//   // 3. Consulta los productos con sus categorías incluidas
//   const productos = await Products.findAll({
//     include: [{ model: Category, attributes: ["name"] }],
//   });
//   console.log(productos[0]);

//   // 4. Formatea el resultado según tus necesidades
//   const result = productos?.map((elem) => {
//     const catename = elem.category?.map(({ name }) => name);

//     return {
//       id: elem.id,
//       name: elem.name,
//       description: elem.description,
//       rating: elem.rating,
//       image: elem.image,
//       category: catename,
//     };
//   });

//   return result;
// };

// module.exports = {
//   productAllController,
// };