/**
 * Implementar un servicio que tenga un método estático llamado `getProducts`,
 * el cual tiene recibe dos parámetros: siteId y el nombre nombre de un producto.
 * Restclient va a hacer una request a la ruta `/sites/${siteId}/search`.
 *
 * Comando para correr el test: `npm run test:unit:watch products-service`
 */
const restclient = require("nordic/restclient")({
  timeout: 5000,
});
const normalizer = require("./transforms/normalizer");

class ProductsService {
  static getProducts(siteId, q = "celular", offset = 0, limit = 10) {
    return restclient
      .get(`/sites/${siteId}/search`, {
        params: {
          q,
          offset,
          limit,
        },
      })
      .then((response) => normalizer(response.data.results))
      .catch((err) => []);
  }
}

module.exports = ProductsService;
