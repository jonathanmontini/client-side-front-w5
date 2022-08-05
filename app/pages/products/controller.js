const React = require("react");
const View = require("./view");
const config = require("nordic/config");
const ImageProvider = require("nordic/image/provider");
const I18n = require("nordic/i18n");
const I18nProvider = require("nordic/i18n/I18nProvider");

const imagesPrefix = config.assets.prefix;

exports.render = function render(req, res) {
  const ProductsView = (props) => (
    <I18nProvider i18n={req.i18n}>
      <ImageProvider prefix={imagesPrefix}>
        <View {...props} />
      </ImageProvider>
    </I18nProvider>
  );

  res.render(ProductsView, {
    imagesPrefix,
    translations: req.translations,
  });
};
