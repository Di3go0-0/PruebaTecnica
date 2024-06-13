import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST, 
  port: process.env.DB_PORT,  
  username: process.env.DB_USER, 
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME, 
};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

export default sequelize;