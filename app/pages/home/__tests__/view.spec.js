const React = require('react');
const HomeView = require('../view');
const { render, screen, act, waitFor } = require('@testing-library/react');
require('core-js');
const restClient = require('nordic/restclient');
jest.mock('nordic/restclient');

const { mockGet } = restClient;

describe('La view de Home', () => {
    let component; 

    beforeEach(async () => {  
        await act(async () => {
            mockGet.mockResolvedValueOnce({data: [{id: 1, title: 'Samsung'}]});
            component = await waitFor(() => render(<HomeView />));
        });
    });
    
    it('1) Renderiza', async () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });

    it('2) Utiliza restclient desde la view', async () => {
        expect(mockGet).toHaveBeenCalled();
    });
        
    it('3) Renderiza los productos de la API dentro de una lista', async () => {
        await act(async () => {
            const products = await screen.findAllByRole('listitem');
            expect(products).toHaveLength(1);
        })
    });
});