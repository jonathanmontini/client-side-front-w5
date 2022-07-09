/**
 * Implementar un servicio que tenga un método estático llamado `getProducts`,
 * el cual tiene recibe dos parámetros: siteId y el nombre nombre de un producto.
 * Restclient va a hacer una request a la ruta `/sites/${siteId}/search`.
 */
const restclient = require('nordic/restclient')({
  timeout: 5000,
});

class ProductsService { 
  
}

module.exports = ProductsService;
