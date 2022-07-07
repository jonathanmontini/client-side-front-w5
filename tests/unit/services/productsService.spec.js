const ProductService = require('../../../services/productsService');
const Mock = require('nordic-dev/mocks');
const apiDomain = 'https://internal-api.mercadolibre.com';


const mock = Mock();

beforeAll(()=>{
    mock.intercept(apiDomain, ['/sites/*'])
});

afterAll(()=>{
    mock.restore(apiDomain, ['/sites/*'])
});

describe('Pruebas en servicio - getProducts',()=>{
    
   describe('1) getProducts debería hacer la petición correctamente',()=>{
    it('Si la petición fue exitosa, debería responder con el objeto entero', async ()=>{
        const res = await ProductService.getProducts('MLA', 'tablet');
        expect(typeof res).toBe('object');
        expect(res.query).toMatch(/tablet/i)
        expect(res.site_id).toMatch(/mla/i)
        
    });
   })

   describe('2) OPCIONAL : manejo de error correcto de getProducts',()=>{
    it('Si la petición falla, arrojar un array como respuesta', async () => { 
        const res = await ProductService.getProducts(null);
        expect(res).toBeInstanceOf(Array)
    });
   })
});
