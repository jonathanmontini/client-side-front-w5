const restclient = require('nordic/restclient')({
  timeout: 5000,
});

const normalize = require('./transforms/normalize');

class ProductsService {
  static getProducts(siteId, name, offset, limit) {
    return restclient.get(`/sites/${siteId}/search`, {
      params: {
        q: name, 
        offset,
        limit
      }
    })
      .then(response => normalize(response.data.results))
      .catch(err => ([]));
  };

}

module.exports = ProductsService;
