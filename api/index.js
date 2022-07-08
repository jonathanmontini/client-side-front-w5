/**
 * Module dependencies
 */
const router = require('nordic/ragnar').router();
const getProducts = require('./getProducts');
const getProductsForPage = require('./getProductsForPage');


/**
 * Demo router
 */
router.use('/getProducts', getProducts);
router.use('/getProductsForPage', getProductsForPage);


/**
 * Expose API router
 */
module.exports = router;
