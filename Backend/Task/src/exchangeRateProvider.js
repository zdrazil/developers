const axios = require("axios");

const SOURCE_CURRENCY = "CZK";
const DEBUG = process.env.DEBUG || false;
const API_URL = DEBUG
  ? "http://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt"
  : "none";

function fetchData() {
  return axios.get(API_URL);
}

function parseNumber(text) {
  return parseFloat(text.replace(",", "."));
}

function jsonRates(text) {
  const rates = text
    .split("\n")
    .filter(Boolean)
    .slice(2)
    .reduce((acc, cur) => {
      const [country, currency, amount, code, exchange] = cur.split("|");
      return {
        ...acc,
        [code]: {
          amount: parseNumber(amount),
          code,
          country,
          currency,
          exchange: parseNumber(exchange)
        }
      };
    }, {});
  return rates;
}

function formatRate({ source, target, exchange, amount }) {
  return `${source}/${target}/amount:${amount}=${exchange}`;
}

function getExchangeRates(currencies, apiData) {
  const apiRates = apiData || fetchData();

  return apiRates.then(response => {
    const formattedApi = jsonRates(response.data);
    const stringCurrencies = currencies
      .filter(a => formattedApi[a])
      .map(a => {
        const { amount, exchange, code } = formattedApi[a];
        return formatRate({
          exchange,
          source: code,
          target: SOURCE_CURRENCY,
          amount
        });
      });
    return stringCurrencies;
  });
}

module.exports = {
  formatRate,
  getExchangeRates,
  jsonRates
};
