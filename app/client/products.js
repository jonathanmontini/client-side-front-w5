const React = require("react");
const ProductsView = require("../pages/products/view");
const hydrate = require("nordic/hydrate");
const I18n = require("nordic/i18n");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ImageProvider = require("nordic/image/provider");

const { imagesPrefix, translations } = window.__PRELOADED_STATE__;
const i18n = new I18n({ translations });
hydrate(
  <I18nProvider i18n={i18n}>
    <ImageProvider imagesPrefix={imagesPrefix}>
      <ProductsView />
    </ImageProvider>
  </I18nProvider>,
  document.getElementById("root-app")
);
