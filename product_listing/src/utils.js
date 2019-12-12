function logForDevMode(message) {
    if (process.env.NODE_ENV === 'dev') {
      console.log(message);
    }
}

function genericAnswerClient(res, status, data, discounts) {
  data.products = data.products.map((product, index) => {
    product.discount = discounts[index] || { pct: 0.00, value_in_cents: 0 };
    return product;
  });
  
  res.status(status);
  res.json(data);
}

module.exports = {
  logForDevMode,
  genericAnswerClient,
};