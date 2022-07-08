const React = require('react');
const ProductListView = require('../view');
const { render, screen, act, fireEvent, waitFor } = require('@testing-library/react');
require('core-js');
const restClient = require('nordic/restclient');

const { mockGet } = restClient;

describe('La view de ProductList', () => {
    let component; 
    let mockProducts = [{id:'MLA12874', title:'Samsung', thumbnail:'foto', permalink:'link'}]

    beforeEach(async() => {  
        await act(async () =>{
            mockGet.mockResolvedValueOnce({data: [{id:'MLA12874', title:'Moto', thumbnail:'foto', permalink:'link'}]})
            component= await waitFor(() => render(<ProductListView products={mockProducts} />));
        })
    });
    
    it('1) Renderiza', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    });
    
    it('2) Debe modificar la lista de productos al hacer click en el boton', async () => {
        await act(async () => {
            const button = await screen.findByRole('button');
            fireEvent.click(button);
        })
        
        const title = await screen.findByText('Moto')
        expect(title).toBeInTheDocument();
    })

    it('Opcional: Si no hay productos deberia mostrar el msj "no se encontraron productos"', async () => {
        await act(async () =>{
            component= await waitFor(() => render(<ProductListView products={[]}  />));
        })
        const text = screen.getByText(/no se encontraron productos/i)
        expect(text).toBeInTheDocument();
    })

})