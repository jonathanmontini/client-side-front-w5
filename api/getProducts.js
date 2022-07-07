const productService = require('../services/productsService.js');

function fetchProducts(req,res,next){
    const {name} = req.query;

    productService.getProducts(req.platform.siteId, name)
        .then(data => res.json(data.results))
}


module.exports = fetchProducts;

