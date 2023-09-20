const { Sequelize,Op } =  require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Products, Category,Administrator,Customer,User,Order } = sequelize.models;

// Aca vendrian las relaciones:
Products.belongsToMany(Category, { through: "PoductsxCategory" });
Category.belongsToMany(Products, { through: "PoductsxCategory" });
// Products.belongsTo(Category, { foreignKey: 'categoryId'});
// Category.hasMany(Products, { foreignKey: 'categoryId' });
User.hasOne(Customer);
Customer.belongsTo(User);

User.hasOne(Administrator);
Administrator.belongsTo(User);

User.hasMany(Order); // Un usuario puede tener muchas órdenes
Order.belongsTo(User); // Cada orden pertenece a un usuario

Order.belongsToMany(Products, { through: 'OrderProduct' });
Products.belongsToMany(Order, { through: 'OrderProduct' });



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  sequelize, // para importart la conexión { conn } = require('./db.js');
  Op
};