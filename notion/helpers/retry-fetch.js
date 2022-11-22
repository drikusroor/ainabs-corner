const fetch = require("node-fetch");

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

export const retryFetch = (
  url,
  fetchOptions = {},
  retries = 3,
  retryDelay = 1000,
  timeout
) => {
  return new Promise((resolve, reject) => {
    if (timeout) setTimeout(() => reject("error: timeout"), timeout);

    const wrapper = (n) => {
      fetch(url, fetchOptions)
        .then((res) => resolve(res))
        .catch(async (err) => {
          if (n > 0) {
            await delay(retryDelay);
            wrapper(--n);
          } else {
            reject(err);
          }
        });
    };

    wrapper(retries);
  });
};
