const React = require('react');
const ProductsView = require('../view');
const { render, screen, act, waitFor } = require('@testing-library/react');
require('core-js');
const restClient = require('nordic/restclient');
jest.mock('nordic/restclient');

const { mockGet } = restClient;

describe('La view de Products', () => {
    describe('Ejercicio 1', () => {
        let component; 
        const i18n = { gettext: text => text };

        beforeEach(async () => {  
            await act(async () => {
                mockGet.mockResolvedValueOnce({data: [
                    {
                        id: 1, 
                        title: 'Samsung', 
                        permalink: 'https://www.mercadolibre.com.ar/samsung-galaxy-m12-5000-mah-dual-sim-128-gb-black-4-gb-ram/p/MLA18192280',
                        thumbnail: 'http://http2.mlstatic.com/D_838903-MLA46771080799_072021-I.jpg'
                    }]
                });
                component = render(<ProductsView i18n={i18n}/>);
            });
        });
        
        it('1) Renderiza', () => {
            const { asFragment } = component;
            expect(asFragment()).toMatchSnapshot();
        });

        it('2) Utiliza Restclient desde la view para hacer un llamado a /api', () => {
            expect(mockGet).toHaveBeenCalled();
            expect(mockGet.mock.calls[0][0].includes('/getProducts')).toBeTruthy();
        });
            
        it('3) Renderiza los productos de la API dentro de una lista', async () => {
            const products = await screen.findAllByRole('listitem');
            expect(products).toHaveLength(1);
        });
    })

    xdescribe('Ejercicio 2', () => {
        let component; 
        const i18n = { gettext: text => text };
        let permalink = 'https://www.mercadolibre.com.ar/samsung-galaxy-m12-5000-mah-dual-sim-128-gb-black-4-gb-ram/p/MLA18192280';
        let thumbnail = 'http://http2.mlstatic.com/D_838903-MLA46771080799_072021-I.jpg';

        beforeEach(async () => {  
            await act(async () => {
                mockGet.mockResolvedValueOnce({data: [
                    {
                        id: 1, 
                        title: 'Samsung', 
                        permalink,
                        thumbnail
                    }]
                });
                component = render(<ProductsView i18n={i18n}/>);
            });
        });

        it('4) Renderiza una imagen con el thumbnail del producto', async () => {
            const img = await screen.findByRole('img');
            expect(img.src).toBe(thumbnail);
        })

        it('5) Redirige a la URL del detalle del producto en Mercado Libre', async () => {
            const anchor = await screen.findByRole('link');
            expect(anchor.href).toBe(permalink);
        })
    })
});