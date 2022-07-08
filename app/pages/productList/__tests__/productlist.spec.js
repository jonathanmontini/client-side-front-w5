const React = require('react');
const ProdListView = require('../view');
const { render, screen, act, fireEvent } = require('@testing-library/react');
// require('core-js');
// const restClient = require('nordic/restclient');
// jest.mock('nordic/restclient');

// const { mockGet } = restClient;

describe('La view de Home', () => {
    let component; 

    beforeEach(async() => {  
        await act(() =>{

            component= render(<ProdListView />);
        })
    });
    
    it('1) Renderiza', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });

    it('2) Si no hay productos deberia mostrar el msj "no se encontraron productos"', () => {
        const text = screen.getByText(/no se encontraron productos/i)
        expect(text).toBeInTheDocument();
    })
        
    xit('3) Debe mostrar la lista de productos al hacer click en el boton', async() => {
        await act(async () => {
            const button = await screen.findByRole('pagination');
            fireEvent.click(button);
        })

        const item = await screen.findByRole('listitem')
        screen.debug(item)
    })
})