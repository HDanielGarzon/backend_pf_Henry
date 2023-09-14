const server = require("./app");
const { sequelize } = require("./db");
const PORT = 3001;

sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server raise in PORT: ${PORT}`);
  });
});
