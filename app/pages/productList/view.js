const React = require('react');
const { useEffect, useState, useRef } = React;
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
  /**
   * Solución sin useEffect:
   */
  const handleNext = () => {
    setCurrentPage(prev => prev + 50);

    restClient.get('/getProducts', {
      params: {
        name: 'celular',
        offset: currentPage + 50
      }
    })
      .then(data => {
        setProductList(data.data);
      });
  }

  /**
   * La solución con el handler de arriba y el valor del offset hardcodeado
   * no queda muy linda, francamente. Podemos optar por ser más precisos y 
   * eficientes ejecutando la misma lógica dentro de un useEffect, pero hay
   * que tener cuidado, porque podemos encontrarnos con un bug muy sútil y 
   * ni siquiera darnos cuenta. 
   * -> ¿Cuál es el bug del que hablamos? 
   * El hook useEffect SIEMPRE se ejecuta la primera vez que renderizamos 
   * el componente. Por ende, si no tenemos cuidado, vamos a estar ejecutando
   * el llamado a la carpeta /api en el primer render, lo que implicaría estar
   * ejecutando Restclient dos veces, innecesariamente -la primera vez lo 
   * haríamos desde el controller, y la segunda desde esta view-.
   * Estrategia para solucionar el bug basada en evaluar si es el primer
   * renderizado o no:
   *  1) Guardamos un booleano en un useRef inicializado en `false`
   *     en el first render, y se modifica a true cuando se ejecuta
   *     el useEffect por primera vez (el problema es que todavía no 
   *     vimos useRef a esta altura).
   * NOTA: adoptar la misma estrategia pero con un useState sería ineficiente,
   * ya que el seteo del estado al booleano opuesto dispararía un re-render, 
   * ejecutando el useEffect de nuevo (la ventaja del useRef es que no 
   * dispara un nuevo render, y a la vez su valor persiste entre renders).
   */
  // const isMounted = useRef(false);

  // const handleNext = () => {
  //   setCurrentPage(prev => prev + 50);
  // }

  // useEffect(() => {
  //   if (isMounted.current) {
  //     console.log('This is not the first render, for sure.');
  //     restClient.get('/getProducts', {
  //       params: {
  //         name: 'celular',
  //         offset: currentPage
  //       }
  //     })
  //     .then(data => {
  //       setProductList(data.data)
  //     });    
  //   }
  //   isMounted.current = true
  // }, [currentPage]);

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
      <button onClick={handleNext}>Siguiente</button>
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
