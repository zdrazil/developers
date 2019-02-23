/* eslint-disable no-console */
const provider = require("exchangeRateProvider");

const currencies = [
  "USD",
  "EUR",
  "CZK",
  "JPY",
  "KES",
  "RUB",
  "THB",
  "TRY",
  "XYZ"
];

try {
  const rates = provider.getExchangeRates(currencies);
  console.log(`Successfully retrieved ${rates.length} exchange rates:`);

  rates.forEach(rate => {
    console.log(rate);
  });
} catch (err) {
  console.log(`Could not retrieve exchange rates: ${err}`);
}

console.log("Press any key to exit");

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on("data", process.exit.bind(process, 0));
