/**
 * Module dependencies
 */
const React = require('react');
const { useEffect, useState } = React;
const PropTypes = require('prop-types');
const Head = require('nordic/head');
const Script = require('nordic/script');
const Style = require('nordic/style');
const serialize = require('serialize-javascript');
const { injectI18n } = require('nordic/i18n');
const Image = require('nordic/image');
const restClient = require('nordic/restclient')({ timeout: 5000, baseURL: '/api' });
/**
 * View Component
 */
function View(props) {
  const { imagesPrefix, prodlist } = props;
  const preloadedState = {
    imagesPrefix,
    prodlist
  };

  const [products, setProducts] = useState(prodlist)
  const [currentPage, setCurrentPage] = useState(0)


  const handleSearch = () => {
    setCurrentPage(prev => prev + 10)

    restClient.get('/getProductsForPage', {
      params: {
        offset: currentPage + 10
      }
    })
      .then(data => {
        setProducts(data.data)
      })
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

      <Style href="home.css" />
      <Script>
        {`
           window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })};
           console.log('Home page is loaded!');
         `}
      </Script>
      <Script src="vendor.js" />
      <Script src="productList.js" />

      <h1>productList</h1>
      <button onClick={handleSearch}  role='pagination'>NEXT</button>
      <ol>
        {
          products.length
            ? products.map(prod => {
              const { id, title, thumbnail, price } = prod;

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
            : <h4>No se encontraron productos</h4>
        }
      </ol>
    </div>
  );
}


module.exports = injectI18n(View);
