
const restclient = require('nordic/restclient')({
  timeout: 5000,
});

class Service {
  static getProducts(siteId,name) {
    return restclient.get(`/sites/${siteId}/search?q=${name}`)
      .then(response => response.data.results);
  };
}

module.exports = Service;
