const request = require('supertest');
const api = require('../../../index');
const ProductService = require('../../../services/productsService');
const { mockGet } = require('nordic/restclient');

describe('El router de /getProducts', () => {
    mockGet.mockResolvedValueOnce({ data: {
        results: [
            { 
                id: 'MLA457223',
                title: 'Ipad Air'
            }       
        ]
    }});

    const mockGetProducts = jest.spyOn(ProductService, 'getProducts');

    it('1) Utiliza el servicio para buscar los productos de la API', async () => {
        const response = await request(api.app).get('/api/getProducts?domain_override=mercadolibre.com.ar&name=tablet');
        expect(mockGetProducts).toHaveBeenCalled();
        let products = await JSON.parse(response.res.text);
        expect(products).toBeDefined();
        expect(typeof products).toBe('object');
    });
});
