const getProductsForPage = require('../../../api/getProductsForPage');
const {createRequest,createResponse} = require('node-mocks-http');
const ProductService = require('../../../services/productService');


describe('1) getProductsForPage', () => {
    const req = createRequest({
        method: 'GET', 
        url: '/api/getProductsForPage',
        platform:{siteId: 'MLA'},
        params:{
            name: 'tablet',
            limit: 10,
            offset: 0

        },
    });
    const res = createResponse();
    const mock = jest.spyOn(ProductService, 'getProductsForPage');

    it('El middleware debería llamar al servicio', () => {
        getProductsForPage(req, res, () => {
            expect(mock).toHaveBeenCalled();
        });
    });
});