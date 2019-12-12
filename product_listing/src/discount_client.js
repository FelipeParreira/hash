const grpc = require('grpc');
const { logForDevMode } = require('./utils');
const protoLoader = require('@grpc/proto-loader');


const PROTO_PATH = __dirname + '/../discount.proto';
const { DISCOUNT_CALCULATOR_HOST, DISCOUNT_CALCULATOR_PORT } = process.env;

const packageDefinition = protoLoader.loadSync(PROTO_PATH, 
  {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
});

const discountCalculator = grpc.loadPackageDefinition(packageDefinition).discountcalculator;
const client = new discountCalculator.DiscountCalculator(
  `${DISCOUNT_CALCULATOR_HOST}:${DISCOUNT_CALCULATOR_PORT}`, 
  grpc.credentials.createInsecure());


function runCalculateDiscount(callback, products, user_id) {
  const call = client.calculateDiscount();
  const discounts = [];

  call.on('data', function fn(discount) {
    logForDevMode(`discount: ${JSON.stringify(discount)}`);
    discounts.push(discount);
  });

  call.on('error', error => {
    console.error("gRPC stream error: ", error);
    logForDevMode(`discounts: ${JSON.stringify(discounts)}`);
    callback(discounts);
  });

  call.on('end', () => {
    logForDevMode(`discounts: ${JSON.stringify(discounts)}`);
    callback(discounts);
  });

  for (let { id: product_id } of products) {
    logForDevMode(`Sending message: user_id = ${user_id} and product_id = ${product_id}`);
    call.write({
      user_id,
      product_id,
    });
  }

  call.end();
}

module.exports = {
  runCalculateDiscount,
};
