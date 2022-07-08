/**
 * Module dependencies
 */
const React = require('react');
const View = require('./view');
const config = require('nordic/config');
const ImageProvider = require('nordic/image/provider');
const ProductsService = require('../../../services/productsService')



const imagesPrefix = config.assets.prefix;

exports.fetchProductsList = function fetchProductsList(req, res, next){

    const siteId = req.platform.siteId

    ProductsService.getProductsForPage(siteId, 'celular', 10, 0)
    .then(response =>{
        res.locals.prodlist = response
        next()
    } )
    .catch(err =>  next(err));

    
}


exports.render = function render(req, res) {

    const ProdList = props => (
        <ImageProvider prefix={imagesPrefix}>
            <View {...props} />
        </ImageProvider>
    )

    res.render(ProdList, {
        imagesPrefix,
        prodlist : res.locals.prodlist

    });
};
