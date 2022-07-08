
const restclient = require('nordic/restclient')({
  timeout: 5000,
});

const normalize = require('./transforms/normalize')

class Service {
  static getProducts(siteId,name) {
    return restclient.get(`/sites/${siteId}/search?q=${name}`)
      .then(response => normalize(response.data.results));
  };

  static getProductsForPage(siteId,name,limit, offset) {
    return restclient.get(`/sites/${siteId}/search`,{
      params:{
        q:name,
        limit: limit || 12,
        offset: offset || 0
      }
    })
      .then(response => normalize(response.data.results));
  };

}

module.exports = Service;
