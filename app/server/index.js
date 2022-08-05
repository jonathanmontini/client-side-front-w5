/**
 * Module dependencies
 */
const router = require("nordic/ragnar").router();
const config = require("nordic/config");
const { layoutMiddleware } = require("nordic/layout");
const i18nMiddleware = require("nordic/i18n/middleware");
const polyfillsMiddleware = require("nordic/script/polyfills-middleware");

/**
 * Set up mocks
 */
require("../../mocks");

/**
 * Routers
 */
const clase = require("../pages/clase");
const products = require("../pages/products");
const productsList = require("../pages/productList");

/**
 * Use global middlewares
 */
router.use(layoutMiddleware());
router.use(i18nMiddleware(config.i18n));
router.use(polyfillsMiddleware(config.polyfillLimits));

/**
 * Redirect
 */
router.get("/", (req, res) =>
  res.redirect(`${config.ragnar.basePath}products`)
);

/**
 * Mount routers
 */
router.use("/clase", clase);
router.use("/products", products);
router.use("/productsList", productsList);

/**
 * Expose router
 */
module.exports = router;
