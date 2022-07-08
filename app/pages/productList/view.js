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
  const { imagesPrefix, products } = props;
  const preloadedState = {
    imagesPrefix,
    products
  };

  const [productList, setProductList] = useState(products);
  const [currentPage, setCurrentPage] = useState(0);

  const handleSearch = () => {
    setCurrentPage(prev => prev + 10)

    restClient.get('/getProducts', {
      params: {
        name: 'celular',
        offset: currentPage + 10
      }
    })
      .then(data => {
        setProductList(data.data)
      });
  }

  // const handleCurrent = () => {
  //   setCurrentPage(prev => prev + 10)
  // }

  // useEffect(() => {
  //   handleSearch()
  // }, [currentPage])

  return (
    <div className="demo">

      <Head>
        <title>
          producList Page
        </title>
      </Head>

      <Style href="productList.css" />
      <Script>
        {`
           window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
           console.log('Home page is loaded!');
         `}
      </Script>
      <Script src="vendor.js" />
      <Script src="productList.js" />

      <h1>productList</h1>
      <button onClick={handleSearch}>Siguiente</button>
      <ol>
        {
          productList.length
            ? productList.map(p => {
              const { id, title, thumbnail, price } = p;

              return (
                <li key={id} className='card' >
                  <figure className="img">
                    <Image src={thumbnail} alt={title} lazyload="off" />
                  </figure>
                  <div className="info-products">
                    <h4 className='price'>${price}</h4>
                    <h3 className='title-product'>{title} </h3>
                  </div>
                </li>
              )
            })
            : <h4>No se encontraron productos.</h4>
        }
      </ol>
    </div>
  );
}


module.exports = injectI18n(View);
