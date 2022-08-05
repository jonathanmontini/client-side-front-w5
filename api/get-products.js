const router = require("nordic/ragnar").router();
const productsService = require("../services/productsService");
/**
 * Ejercitación 1
 *
 * Aquí deberás crear el endpoint con el método GET, el cual consuma
 * el servicio que devuelve los productos de la API de MeLi.
 *
 * Comando para correr el test: `npm run test:unit:watch get-products`
 */
router.get("/", (req, res) => {
  const { q, offset, limit } = req.query;
  const { siteId } = req.platform;
  productsService
    .getProducts(siteId, q, offset, limit)
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
