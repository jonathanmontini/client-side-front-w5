/**
 * Module dependencies
 */
 const React = require('react');
 const {useEffect,useState} = React;
 const PropTypes = require('prop-types');
 const Head = require('nordic/head');
 const Script = require('nordic/script');
 const Style = require('nordic/style');
 const serialize = require('serialize-javascript');
 const { injectI18n } = require('nordic/i18n');
 const Image = require('nordic/image');
 const restClient = require('nordic/restclient')({timeout:5000,baseURL: '/api'});
 /**
  * View Component
  */
 function View(props) {
   const { imagesPrefix } = props;
   const preloadedState = {
     imagesPrefix
   };

   const [ products, setProducts ] = useState([])
   const [ currentPage, setCurrentPage ] = useState(0)


   const handleSearch = () =>{
    restClient.get('/getProducts?name=tablet')
    .then(data => {
        setProducts(data.data)
        console.log(data.data.length)
    })
   }

   
 
   useEffect(()=>{
         restClient.get('/getProducts?name=tablet')
         .then(data => setProducts(data.data))
   }, [])

   
 
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
        <button onClick={handleSearch} >Buscar</button>
        <ol>
                {
                    products.length
                    ? products.map(prod => {
                        const { id, title, thumbnail, price } = prod;

                        return (
                            <li key={id} className='card' >
                                <div className="img">
                                    <Image src={thumbnail} alt={title} lazyload="off" />
                                </div>
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
 