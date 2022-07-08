/**
 * Module dependencies
 */
 const router = require('nordic/ragnar').router();
 const { fetchProductsList, render } = require('./controller');
 
 /**
  * Routers
  */
 router.get('/', fetchProductsList, render);
 
 /**
  * Expose router
  */
 module.exports = router;
 