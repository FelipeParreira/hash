const { sequelize } = require('./db_connection');
const { logForDevMode } = require('../utils');

// import models
const { Product } = require("./models/products");

// sync DB without droppping tables
sequelize.sync({ force: false });

const pageLimit = process.env.PAGE_LIMIT || 10;

// query functions
async function getAllProducts(page = 0, limit = pageLimit) {
  try {
    let products = await Product.findAll({
      offset: page * limit,
      limit,
      attributes: ['id', 'price_in_cents', 'title', 'description'],
    });

    products = products.map(product => product.dataValues);
    logForDevMode(`Got ${products.length} products`);
    
    return products;
  } catch (exception) {
    return [];
  }
}

async function getProductPagesCount(limit = pageLimit) {
  try {
    const totalProducts = await Product.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'total_products']]
    });

    const pageCount = Number(totalProducts[0].dataValues['total_products'])/limit - 1;
    
    return pageCount;
  } catch (exception) {
    return 0;
  }
}

module.exports = {
  getAllProducts,
  getProductPagesCount,
};
