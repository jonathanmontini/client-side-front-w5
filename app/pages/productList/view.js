const React = require("react");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");
const InjectI18n = require("nordic/i18n/injectI18n");
const Image = require("nordic/image");
const restclient = require("nordic/restclient")({
  timeout: 5000,
});

const baseUrl = "https://dev.mercadolibre.com.ar:8443/api";

const View = ({ products, translations, i18n }) => {
  const isMounted = React.useRef(false);
  const [productList, setProductList] = React.useState(products);
  const [offset, setOffset] = React.useState(0);
  const preloadedState = {
    products,
    translations,
  };

  const handlePrev = () => {
    if (offset > 9) setOffset((prev) => prev - 10);
  };

  const handleNext = () => {
    setOffset((prev) => prev + 10);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      restclient
        .get(`${baseUrl}/get-products`, {
          params: {
            offset,
          },
        })
        .then((response) => setProductList(response.data));
    }
    isMounted.current = true;
  }, [offset]);

  return (
    <>
      <Script>{`
                window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
                  isJSON: true,
                })}
                console.log('%cProductsView page is loaded', 'color:green')
            `}</Script>
      <Script src="vendor.js" />
      <Script src="productList.js" />
      {/* <button disabled={offset === 0 ? true : false} onClick={handlePrev}>
        Atrás
      </button> */}
      <button onClick={handleNext}>Más productos</button>
      {productList.length ? (
        <ul>
          {productList.map((prod) => (
            <li key={prod.id} style={{ listStyleType: "none" }}>
              <h4>{i18n.gettext(prod.title)}</h4>
              <a href={prod.permalink} target="_blank">
                <Image src={prod.thumbnail} alt={prod.title} lazyload="off" />
              </a>
              <h4>{prod.price}</h4>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No se encontraron productos</h2>
      )}
    </>
  );
};

module.exports = InjectI18n(View);
