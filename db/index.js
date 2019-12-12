const fs = require('fs');
const faker = require('faker');
const fastcsv = require('fast-csv');

const products = [];
const users = [];

function zeroPad(value, size = 2) {
  const string = String(value);
  return '0'.repeat(size - string.length) + string;
}


let product;
let createdAt;
for (let i = 0; i < 1000; i++) {
  createdAt = faker.date.recent();
  createdAt = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;

  product = {
    id: String(i),
    price_in_cents: parseFloat(faker.commerce.price()) * 100,
    title: faker.commerce.product(),
    description: faker.lorem.paragraph(),
    createdAt,
    updatedAt: createdAt,
  };
  products.push(product);
}

let user;
let birthDate;
for (let i = 0; i < 1000; i++) {
  birthDate = faker.date.past();
  createdAt = faker.date.recent();

  createdAt = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
  
  date_of_birth = birthDate.getFullYear() + '-' + (birthDate.getMonth() + 1) + '-' + birthDate.getUTCDate();

  user = {
    id: String(i),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    date_of_birth,
    createdAt,
    updatedAt: createdAt,
  };
  users.push(user);
}

let ws = fs.createWriteStream("data/products.csv");
fastcsv
  .write(products, { headers: true })
  .pipe(ws);

ws = fs.createWriteStream("data/users.csv");
fastcsv
  .write(users, { headers: true })
  .pipe(ws);
