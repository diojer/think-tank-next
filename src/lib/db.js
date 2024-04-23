import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
  }
);

async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
    await sequelize.sync({ alter: true });
  } catch (err) {
    console.log("Unable to connect to database: ", err);
  }
};

export default sequelize;
