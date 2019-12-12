const { sequelize, Sequelize } = require('../db_connection');

const Product = sequelize.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter a title',
      }
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter a description',
      }
    },
  },
  price_in_cents: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter a price in cents',
      }
    },
  },
});

module.exports = {
  Product,
};
