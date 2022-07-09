/* istanbul ignore file */
const React = require('react');
const View = require('./view');
const config = require('nordic/config');
const ImageProvider = require('nordic/image/provider');
const ProductsService = require('../../../services/productsService');

const imagesPrefix = config.assets.prefix;

exports.fetchProducts = function fetchProductsList(req, res, next){

    const siteId = req.platform.siteId

    ProductsService.getProducts(siteId, 'celular', 0, 10)
        .then(response =>{
            res.locals.products = response;
            next();
        } )
        .catch(err =>  next(err));
}


exports.render = function render(req, res) {

    const ProductList = props => (
        <ImageProvider prefix={imagesPrefix}>
            <View {...props} />
        </ImageProvider>
    )

    res.render(ProductList, {
        imagesPrefix,
        products : res.locals.products
    });
};
