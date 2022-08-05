const normalize = (array) => {
  return array.map((pdt) => pdt.buy_box_winner || pdt);
};
