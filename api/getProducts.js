const router = require('nordic/ragnar').router();
const productsService = require('../services/productsService.js');

router.get('/', (req, res) => {
    const {name} = req.query;

    productsService.getProducts(req.platform.siteId, name)
        .then(data => res.json(data.results));
})

module.exports = router;
