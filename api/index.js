/**
 * Module dependencies
 */
const router = require('nordic/ragnar').router();
const getProducts = require('./getProducts');

/**
 * Demo router
 */
router.use('/getProducts', getProducts);

/**
 * Expose API router
 */
module.exports = router;
