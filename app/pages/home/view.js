const React = require('react');
const { useEffect, useState } = React;
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const Image = require('nordic/image');
const restClient = require('nordic/restclient')({
  timeout: 5000,
  baseURL: '/api'
});

function View(props) {
  const [products, setProducts ] = useState([])
  const { imagesPrefix } = props;
  const preloadedState = {
    imagesPrefix,
  };

  useEffect(()=>{
    restClient.get('/getProducts?name=tablet')
    .then(data =>{
      setProducts(data.data);
    } )
  }, []);


  return (
    <div className="demo">

      <Head>
        <title>
          Home Page
        </title>
      </Head>

      <Style href="home.css" />
      <Script>
        {`
          window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
          console.log('Home page is loaded!');
        `}
      </Script>
      <Script src="vendor.js" />
      <Script src="home.js" />

      <ul>
      {
        products.length 
        ? products.map(p => (
          <li key={p.id}>
            <h5>{p.title}</h5>
            <a href={p.permalink}>
              <Image src={p.thumbnail} alt={p.title} lazyload="off" />
            </a>
          </li>
        ))
        : null
      }
      </ul>
    </div>
  );
}


module.exports = injectI18n(View);
