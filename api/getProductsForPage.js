const router = require('nordic/ragnar').router();
const ProductsService = require('../services/productsService');

router.get('/', (req, res) => {
    const { offset } = req.query
    const siteId = req.platform.siteId;

    ProductsService.getProductsForPage(siteId, 'celular', 10, offset)
    .then(resp => res.json(resp))
    .catch(err => console.error(err))

})

module.exports = router;