const axios = require("axios");

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

function parseRates(text) {
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

function getExchangeRates(currencies, ratesPromise = fetchData()) {
  return ratesPromise.then(response => {
    const rates = parseRates(response.data);
    return currencies
      .filter(a => rates[a])
      .map(a => {
        const { amount, code, exchange } = rates[a];
        return formatRate({
          amount,
          exchange,
          source: code,
          target: "CZK"
        });
      });
  });
}

module.exports = {
  formatRate,
  getExchangeRates,
  parseRates
};
