/* eslint-disable no-console */
const { getExchangeRates } = require("./exchangeRateProvider");

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

function waitForEnter() {
  console.log("Press any key to exit");

  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", process.exit.bind(process, 0));
}

getExchangeRates(currencies)
  .then(rates => {
    console.log(`Successfully retrieved ${rates.length} exchange rates:`);

    rates.forEach(rate => {
      console.log(rate);
    });

    waitForEnter();
  })
  .catch(err => {
    console.log(`Could not retrieve exchange rates: ${err}`);
  });
