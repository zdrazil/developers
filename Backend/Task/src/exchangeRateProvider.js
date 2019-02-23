const axios = require("axios");

const SOURCE_CURRENCY = "CZK";
const API_URL = "abc";
// const API_URL =
//   "http://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt";

function fetchData() {
  return axios.get(API_URL);
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
          amount,
          code,
          country,
          currency,
          exchange: parseFloat(exchange.replace(",", "."))
        }
      };
    }, {});
  return rates;
}

function formatRate({ source, target, exchange }) {
  return `${source}/${target}=${exchange}`;
}

function getExchangeRates(currencies, apiData) {
  const apiRates = apiData || fetchData();

  return apiRates.then(response => {
    const formattedApi = jsonRates(response.data);
    const stringCurrencies = currencies
      .filter(a => formattedApi[a])
      .map(a => {
        const { exchange, code } = formattedApi[a];
        return formatRate({
          exchange,
          source: code,
          target: SOURCE_CURRENCY
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
