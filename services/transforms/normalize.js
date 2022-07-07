const normalize = (producList) => producList.map(prod => prod.buy_box_winner || prod);

module.exports = normalize;