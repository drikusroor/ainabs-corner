---
title: "Throw error on missing environment variables in Next.js"
date: "2023-01-09"
categories: 
  - "tips-tricks"
tags: 
  - "typescript"
  - "nextjs"
---

Since this year I have been working on a new project for our client. A `Next.js` project for the first time in years. This morning I was having some problems as the Next.js website tried to fetch data from the API but receiving errors instead. A query variable in the URL was set to `"undefined"`. After some poking around, I found out it was due to a missing environment variable in the project's `.env` file.

Apparently all environment variables in the Next.js project were being retrieved using `process.env.ENV_VARIABLE_NAME` directly. When a variable was missing, the developer was not notified and strings like `"undefined"` were used instead.

To prevent myself from debugging a considerable amount of time, I have made a little configuration script that extracts the environment variables to a new configuration object and that throws errors when an environment variable is missing:

## config/index.ts

```ts
const config = {
    NEXT_API_URL: process.env.NEXT_API_URL,
    NEXT_STATIC_URL: process.env.NEXT_STATIC_URL,
    NEXT_BASE_URL: process.env.NEXT_BASE_URL,
};

type TEnvironmentKeys = keyof typeof config;

type TEnvironmentVariables = {
    [key in TEnvironmentKeys]: string;
};

const getEnvironmentVariable = (environmentVariable: TEnvironmentKeys): string => {
    const unvalidatedEnvironmentVariable = config[environmentVariable];
    if (!unvalidatedEnvironmentVariable) {
        throw new Error(
            `Couldn't find environment variable: ${environmentVariable}`
        );
    } else {
        return unvalidatedEnvironmentVariable;
    }
}

const validatedEnvironmentVariables: TEnvironmentVariables = Object.keys(config).reduce(
    (acc, key) => {
        acc[key as TEnvironmentKeys] = getEnvironmentVariable(key as TEnvironmentKeys);
        return acc;
    },
    {} as TEnvironmentVariables
);

export default validatedEnvironmentVariables;
```

I made considerable effort to define the keys to be checked in as little places as possible. The typing in the rest of the functions and objects are then derived off that first config object.

To use the environment variables through the configuration object, do something like the following:

```ts
import config from "../config";

export class AccountService {
    public login() {
        const url = config.NEXT_API_URL + "/v1/login";
        const options = {
            email: "test",
            password: "test",
        };
    }
}
```

Typescript should also automatically provide hints about the keys you can use in the validated environment variables.