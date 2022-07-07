const productService = require('../services/productService.js');

function fetchProducts(req,res,next){
    const {name} = req.query;

    productService.getProducts(req.platform.siteId, name)
    .then(data => res.json(data))
}


module.exports = fetchProducts;

