const SOURCE_CURRENCY = "CZK";

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
  const apiRates = apiData;
  const formattedApi = jsonRates(apiRates);
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
}

module.exports = {
  formatRate,
  getExchangeRates,
  jsonRates
};
