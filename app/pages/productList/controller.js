const React = require("react");
const I18nProvider = require("nordic/i18n/I18nProvider");

const ProductView = require("./view");
const ProductService = require("../../../services/productsService");

exports.fetchProducts = function fetchProducts(req, res, next) {
  const { name, offset, limit } = req.query;
  ProductService.getProducts(req.platform.siteId, name, offset, limit)
    .then((response) => {
      res.locals.products = response;
      next();
    })
    .catch((err) => next(err));
};

exports.render = function render(req, res) {
  const ProductList = (props) => (
    <I18nProvider i18n={req.i18n}>
      <ProductView {...props} />
    </I18nProvider>
  );

  res.render(ProductList, {
    products: res.locals.products,
    translations: req.translations,
  });
};
