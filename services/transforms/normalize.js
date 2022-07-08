const normalize = productList => productList.map(prod => prod.buy_box_winner || prod);

module.exports = normalize;