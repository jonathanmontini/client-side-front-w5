const normalizer = (array) => {
  return array.map((pdt) => pdt.buy_box_winner || pdt);
};

module.exports = normalizer;
