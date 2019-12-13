const fs = require('fs');
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

const root_certs = Buffer.from(fs.readFileSync('./server.crt', 'utf8'), 'utf-8');
const ssl_creds = grpc.credentials.createSsl(root_certs);
const client = new discountCalculator.DiscountCalculator(
  `${DISCOUNT_CALCULATOR_HOST}:${DISCOUNT_CALCULATOR_PORT}`, 
  ssl_creds);


function runCalculateDiscount(callback, products, user_id) {
  const call = client.calculateDiscount({}, { deadline: () => new Date(Date.now() + 1) });
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
