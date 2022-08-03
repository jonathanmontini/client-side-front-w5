const React = require("react");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");

function View(props) {
  const { message } = props;

  return (
    <>
      <Script>
        {`
                window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
                  isJSON: true,
                })}
                console.log('%cClase page is loaded!', 'color:green')
            `}
      </Script>
      <Script src="vendor.js" />
      <Script src="clase.js" />
      <h2>{message}</h2>
    </>
  );
}

module.exports = View;
