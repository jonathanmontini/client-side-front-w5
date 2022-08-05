const React = require("react");
const hydrate = require("nordic/hydrate");
const I18n = require("nordic/i18n");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ProductView = require("../pages/productList/view");

const { products, translations } = window.__PRELOADED_STATE__;
const i18n = new I18n({ translations });

hydrate(
  <I18nProvider i18n={i18n}>
    <ProductView products={products} />
  </I18nProvider>,
  document.getElementById("root-app")
);
