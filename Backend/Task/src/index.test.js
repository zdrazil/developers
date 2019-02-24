const { loadFile } = require("./lib");
const {
  formatRate,
  getExchangeRates,
  parseRates
} = require("./exchangeRateProvider");

test("creates object of rates from a string", () => {
  expect(
    parseRates(
      "22.02.2019 #38\nzemě|měna|množství|kód|kurz\nAustrálie|dolar|1|AUD|16,122"
    )
  ).toEqual({
    AUD: {
      amount: 1,
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
      amount: 2.5,
      exchange: 16.122,
      source: "CZK",
      target: "USD"
    })
  ).toBe("CZK/USD/amount:2.5=16.122");
});

const currencies = ["USD", "JPY", "CZK"];

test("returns specified rates:", () =>
  getExchangeRates(
    currencies,
    new Promise(resolve => resolve({ data: loadFile() }))
  ).then(res => {
    expect(res).toEqual([
      "USD/CZK/amount:1=22.662",
      "JPY/CZK/amount:100=20.441"
    ]);
  }));
