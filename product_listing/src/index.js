const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const queries = require('./db/queries');
const { runCalculateDiscount } = require('./discount_client');
const { genericAnswerClient } = require('./utils');

// start server
const app = express();

// apply middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup the logger
app.use(morgan(process.env.NODE_ENV === 'dev' ? 'tiny' : 'combined'));

// endpoints
app.get("/health_check", (req, res) => {
  res.status(200);
  res.send("OK");
});

app.get("/product", async (req, res) => {
  const page = Number(req.body.page) || 0;
  const user_id = req.headers['x-user-id'];
  const products = await queries.getAllProducts(page);
  // TODO how may we cache this value (lastPage)?
  const lastPage = await queries.getProductPagesCount();

  let nextPage;
  let status;

  if (products.length > 0) {
    nextPage = (page + 1);
    status = 200;
  } else {
    nextPage = page;
    status = 500;
  }

  nextPage = Math.min(nextPage, lastPage);
  const data = {
    products,
    nextPage,
    lastPage,
  };

  if (status == 200) {
    const answerClient = genericAnswerClient.bind(null, res, status, data);
    runCalculateDiscount(answerClient, products, user_id);
  } else {
    res.status(status);
    res.json(data);
  }
});

// server listening
const PORT = process.env.PORT || 3000;
// module.exports = app;
app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
