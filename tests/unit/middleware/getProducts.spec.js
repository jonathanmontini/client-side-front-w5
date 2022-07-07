const fetchProducts = require('../../../api/getProducts');
const {createRequest,createResponse} = require('node-mocks-http');
const ProductService = require('../../../services/productsService');
const { mockGet } = require('nordic/restclient');

describe('1) fetchProducts', () => {
    mockGet.mockResolvedValueOnce({ data: {
        results: [
            { 
                id: 'MLA457223',
                title: 'Ipad Air'
            }
        ]
    }});
    
    const req = createRequest({
        method: 'GET', 
        url: '/api/getProducts',
        platform:{siteId: 'MLA'},
        query:'tablet'
    });
    const res = createResponse();
    const mock = jest.spyOn(ProductService, 'getProducts');

    it('El middleware debería llamar al servicio', () => {
        return fetchProducts(req, res, () => {
            expect(mock).toHaveBeenCalled();
        });
    });
});