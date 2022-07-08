const router = require('nordic/ragnar').router();
const ProductsService = require('../services/productService');

router.get('/', (req, res) => {
    const { name, limit, offset } = req.query
    const siteId = req.platform.siteId;

    ProductsService.getProductsForPage(siteId, name, limit, offset)
    .then(resp => res.json(resp))
    .catch(err => console.error(err))

})

module.exports = router;