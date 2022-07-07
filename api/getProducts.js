const productsService = require('../services/productsService.js');

function fetchProducts(req,res,next){
    const {name} = req.query;

    productsService.getProducts(req.platform.siteId, name)
        .then(data => res.json(data.results))
}


module.exports = fetchProducts;

