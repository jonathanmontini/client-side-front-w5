/**
 * Module dependencies
 */
 const router = require('nordic/ragnar').router();
 const {  render } = require('./controller');
 
 /**
  * Routers
  */
 router.get('/', render);
 
 /**
  * Expose router
  */
 module.exports = router;
 