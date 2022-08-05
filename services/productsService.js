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
const normalize = require("./transforms/normalize");

class ProductsService {
  static getProducts(siteId, q, offset, limit) {
    return restclient
      .get(`/sites/${siteId}/search`, {
        params: {
          q,
          offset,
          limit,
        },
      })
      .then((response) => response.data.results)
      .catch(() => []);
  }
}

module.exports = ProductsService;
