const productsService = require('../../../services/productsService');
const { mockGet } = require('nordic/restclient');

describe('productsService', () => {
    beforeEach(() => {
        mockGet.mockResolvedValueOnce({ data: { results: [
            {
                id: 'MLA67562',
                title: 'Ipad Air'
            }
        ]}});
    });

    it('1) El método estático getProducts debería responser con el objeto entero cuando la petición es exitosa', async () => {
        const res = await productsService.getProducts('MLA', 'tablet');
        expect(mockGet).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith('/sites/MLA/search', {
            params: {
                q: 'tablet',
                limit: undefined,
                offset: undefined
            }
        });
        expect(typeof res).toBe('object');
    });
})

describe('OPCIONAL : manejo de error correcto de getProducts', () => {
    beforeEach(() => {
       mockGet.mockRejectedValueOnce('error')
    });

    it('2) Si la petición falla, arrojar un array como respuesta', async () => { 
        const res = await productsService.getProducts(null)
        expect(res).toBeInstanceOf(Array)
    });
})
