const productService = require('../../services/productService');

const Mock = require('nordic-dev/mocks');
const mock = Mock();
const apiDomain = 'https://internal-api.mercadolibre.com';

describe('Demo service', () => {
  beforeAll(() => {
    mock.intercept(apiDomain, ['/sites/*']);
  });

  afterAll(() => {
    mock.restore(apiDomain, ['/sites/*']);
  });

  it('Debe devolver un array de 10 productos', (done) => {
    productService
    
      .getProductsForPage('MLA', 'celular', 10, 0)
      .then((data) => {
        expect(data).toBeInstanceOf(Array)
        expect(data.length).toBe(10)
        done();
      });
  });

  it('Debe devolver un array de objetos que no contengan buy_box_winner en sus propiedades', (done) =>{
    productService
    .getProductsForPage('MLA', 'celular', 10, 0)
      .then((data) => {
        expect(Object.keys(data[0])).toEqual(
            expect.arrayContaining(["id", "site_id", "title", "seller", "price", "prices", "sale_price", "currency_id", "available_quantity", "sold_quantity", "buying_mode", "listing_type_id", "stop_time", "condition", "permalink", "thumbnail", "thumbnail_id", "accepts_mercadopago", "installments", "address", "shipping", "seller_address", "attributes", "original_price", "category_id", "official_store_id", "domain_id", "sale_terms", "variation_id", "vertical", "variation_filters", "image_ratio", "international_delivery_mode", "variations_data", "colors_qty", "pictures_qty", "has_variations", "reviews", "catalog_product_id", "tags", "catalog_listing", "use_thumbnail_id", "offer_score", "offer_share", "match_score", "winner_item_id", "melicoin", "discounts"]),
          );
        done();
      });
  })
});
