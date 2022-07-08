const restclient = require('nordic/restclient')({
  baseURL: 'https://api.mercadolibre.com',
  timeout: 5000,
});

const normalize = require('./transforms/normalize');

class ProductsService {
  static getProducts(siteId,name) {
    return restclient.get(`/sites/${siteId}/search?q=${name}`)
      .then(response => response.data)
      .catch(err => ([]));
  };
}

module.exports = ProductsService;
