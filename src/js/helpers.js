import { TIMEOUT_SEC } from './config.js';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // 1. Loading recipe
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    console.log(res, data);
    return data;
  } catch (err) {
    throw err;
  }
};
