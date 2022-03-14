---
title: "SyntaxError: Cannot use import statement outside a module"
date: "2021-08-02"
categories: 
  - "problems-solutions"
tags: 
  - "node"
  - "npm"
  - "typeorm"
  - "typescript"
---

For the secret game I am developing, I needed a database to store User and Profile data. The game's backend server is developed using Node.js and Typescript, and to simplify connecting to the MySQL database, I wanted to use TypeORM.

TypeORM is awesome. Previously, I had to create the database from scratch and I connected to the database directly and subsequently executed carefully prepared sql queries with parameters. With TypeORM I can specify entities, add columns with specific qualities. It has a `synchronize` option that automatically updates the database based on your entities whenever you start your application.

For a production database, however, this sounds a tad dangerous. With TypeORM it is also possible to generate migrations when the `synchronize` option is turned off.

So, that's what I wanted to do: Generate migrations and update database in a structured and organized manner. Using the globally installed npm package TypeORM CLI (Command Line Interface), this should be as easy as executing the following command:

```generic
// bash
typeorm migration:generate -n
```

However, this returned an error:

_SyntaxError: Cannot use import statement outside a module_

Apparently, the TypeORM CLI does not work well with my `package.json`, `tsconfig.json` or `ts-node` settings. I still have not figured out _why_ not, but I am happy to say I have found a solution to generate my migrations, loosely based on several Stackoverflow entries, which I unconveniently cannot find at the moment.

Behold:

Several Stackoverflow findings gave the advice of using `CommonJS` as the module setting in the `tsconfig.json` file:

```json
// File: tsconfig.json
{
  "compilerOptions": {
    // Other settings
    "module": "CommonJS"
  }
}
```

Then, instead of using the globally installed TypeORM CLI, I use the locally installed CLI by adding it as a `npm script`:

```generic
// File: package.json
// Do note: I use ts-node to execute the CLI,
// so do not forget to install ts-node as well.
{
  "scripts": {
    "start": "npx ts-node server.ts",
    "dev": "nodemon",
    "typeorm:local": "ts-node ./node\_modules/typeorm/cli.js"
  },
}
```

Then, to execute this script with the correct parameters, I execute the following command in the shell:

```generic
// bash
npm run typeorm:local -- migration:generate -n AddNewTable
```

I am also very happy to have found out [\[link\]](https://stackoverflow.com/a/14404223/4496102) about the `--` double hyphens that allow for supplying parameters to a script configured in `package.json`.

Now I can generate migrations _every day_.

![Now I can have milk every day!](https://media1.tenor.com/images/cc6f2e0211d93a0e9c4241c13e5ff346/tenor.gif?itemid=4980396)
