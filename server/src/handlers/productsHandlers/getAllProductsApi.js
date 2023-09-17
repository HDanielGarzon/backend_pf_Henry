// const url = 'http://localhost:5000/products'
// const { Products } = require('../../db')
// const axios = require('axios')

// const getAllProductsApi = async (req, res) =>{
    
//     try {
//         const response = await axios.get(url)
//         const data = response.data;
//         const product = data.map(product=>{
//             return({
//                         name: product.name,
//                         description: product.description,
//                         price: Number(product.price),
//                         // stock:product.stock,
//                         rating: product.rating.rate,
//                         image: product.image,
//                         // brand:product.marca,
//                         // categoryId:product.categoryid
//             });
//         })
//         // console.log(product[0]);
//         let products = await Products.bulkCreate(product)
//         // Product.create(product[0]);

//         res.status(200).json(products)

//     } catch (error) {
//         //  console.log(error.message);
//     }
// }

// module.exports = getAllProductsApi;
