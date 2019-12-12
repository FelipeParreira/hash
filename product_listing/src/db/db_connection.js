const Sequelize = require('sequelize');

const { DB_PWD, DB_HOST, DB_DIALECT, DB_NAME, DB_USER } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});


async function tryConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the DB has been established successfully.');

  } catch(error) {
    console.error('Unable to connect to the database: ', err);
    console.error('Trying to connect to the database again...');
    setTimeout(tryConnection, 1000);
  }  
}

tryConnection();

module.exports = {
  sequelize,
  Sequelize,
};