const React = require("react");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");
const Image = require("nordic/image");
const InjectI18n = require("nordic/i18n/injectI18n");
const restclient = require("nordic/restclient")({
  timeout: 5000,
});

function View(props) {
  const { imagesPrefix, translations, i18n } = props;
  const [products, setProducts] = React.useState([]);
  const preloadedState = { imagesPrefix, translations };

  React.useEffect(() => {
    restclient
      .get("https://dev.mercadolibre.com.ar:8443/api/get-products")
      .then((result) => setProducts(result.data))
      .catch(() => []);
  }, []);

  return (
    <>
      <Script>
        {`
                window.__PRELOADED_STATE__= ${serialize(preloadedState, {
                  isJSON: true,
                })}
                console.log('%cProductsView page is loaded', 'color:green')
            `}
      </Script>
      <Script src="vendor.js" />
      <Script src="products.js" />
      <Image
        className="demo-images__img"
        src="demo-image.jpg"
        alt="Mural painting"
      />
      {products.length ? (
        <ul>
          {products.map((prod) => (
            <li key={prod.id} style={{ listStyleType: "none" }}>
              <h4>{i18n.gettext(prod.name || prod.title)}</h4>
              <Image
                src={prod.buy_box_winner.thumbnail}
                alt={prod.name || prod.title}
                lazyload="off"
              />
            </li>
          ))}
        </ul>
      ) : (
        <h2>No se encontró el producto</h2>
      )}
    </>
  );
}

module.exports = InjectI18n(View);
