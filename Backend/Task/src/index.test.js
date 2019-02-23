const { loadFile } = require("./lib");
const {
  formatRate,
  getExchangeRates,
  jsonRates
} = require("./exchangeRateProvider");

const data = loadFile();

const rates =
  "22.02.2019 #38\nzemě|měna|množství|kód|kurz\nAustrálie|dolar|1|AUD|16,122";

test("creates object of rates from a string", () => {
  expect(jsonRates(rates)).toEqual({
    AUD: {
      amount: "1",
      code: "AUD",
      country: "Austrálie",
      currency: "dolar",
      exchange: 16.122
    }
  });
});

test("formats rates info", () => {
  expect(
    formatRate({
      exchange: 16.122,
      source: "CZK",
      target: "USD"
    })
  ).toBe("CZK/USD=16.122");
});

const currencies = ["USD", "EUR", "CZK"];

test("returns specified rates:", () => {
  expect(getExchangeRates(currencies, data)).toEqual([
    "USD/CZK=22.662",
    "EUR/CZK=25.665"
  ]);
});
