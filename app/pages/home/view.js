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
  const [prod, setProd ] = useState([])
  const {  translations, imagesPrefix } = props;
  const preloadedState = {
   
   
  };

  useEffect(()=>{
        restClient.get('/getProducts?name=tablet')
        .then(data =>{

          setProd(data.data)

          
        } )
          
  }, [])

  console.log(prod)

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
     
   <h1>hola</h1>
    </div>
  );
}


module.exports = injectI18n(View);
