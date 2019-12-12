const { sequelize, Sequelize } = require('../db_connection');

const User = sequelize.define('user', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter a first name',
      }
    },
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter a last name',
      }
    },
  },
  date_of_birth: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter a date of birth',
      }
    },
  },
});

module.exports = {
  User,
};
