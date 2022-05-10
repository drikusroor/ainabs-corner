---
title: "Easy Node.js Mysql database table seeder"
date: "2022-05-10"
categories: 
  - "tips-tricks"
tags: 
  - "mysql"
  - "node-js"
  - "seeder"
---

First, install npm dependencies:
```sh
npm i mysql2 @faker-js/faker dotenv
```

Run the script with the command 
```sh
node ./index.js
```

Don't forget to add the mysql db credentials to your .env file and of course edit the `getSeedQuery` function if you want to use it for your own table.

```js
const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");

require("dotenv").config();

function getSeedQuery(amount = 10000) {
  return Array.from({ length: amount })
    .map(() => {
      const date = faker.date.past(5);
      const time = new Date();
      const currency = faker.finance.currencyCode();
      const rate = faker.finance.amount(1.0, 9.99).toString();

      const sql = `INSERT INTO ExchangeRates (date, time, currency, rate) VALUES ('${date.toISOString()}', '${time.toTimeString()}', '${currency}', '${rate}')`;
      return sql;
    })
    .join(";\n");
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

connection.connect();

const seedQuery = getSeedQuery(10000);

connection.query(seedQuery, (err, results) => {
  if (err) {
    console.log(err);
  }
  console.log("Seeding complete");
  connection.end();
});
```

Source [https://gist.github.com/drikusroor/5e7e3c7ef859702798ab390cbfef1fe4](https://gist.github.com/drikusroor/5e7e3c7ef859702798ab390cbfef1fe4)
