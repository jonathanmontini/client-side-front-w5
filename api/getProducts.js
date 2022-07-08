const router = require('nordic/ragnar').router();
const productsService = require('../services/productsService.js');

router.get('/', (req, res) => {
    const { name, offset, limit } = req.query;

    productsService.getProducts(req.platform.siteId, name, offset, limit)
        .then(data => res.json(data))
        .catch(err => console.error(err));
})

module.exports = router;
