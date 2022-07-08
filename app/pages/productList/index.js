/**
 * Module dependencies
 */
 const router = require('nordic/ragnar').router();
 const { fetchProducts, render } = require('./controller');
 
 /**
  * Routers
  */
 router.get('/', fetchProducts, render);
 
 /**
  * Expose router
  */
 module.exports = router;
 