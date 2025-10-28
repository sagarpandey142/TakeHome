const { evaluate } = require('../src/services/evaluator');

test('evaluator filters by price and stock_status and on_sale', () => {
  const products = [
    { id: 1, price: "1200", stock_status: "instock", on_sale: true },
    { id: 2, price: "800", stock_status: "instock", on_sale: false },
    { id: 3, price: "1500", stock_status: "outofstock", on_sale: true }
  ];
  const rules = `price > 1000\nstock_status = instock\non_sale = true`;
  const res = evaluate(products, rules);
  expect(res.length).toBe(1);
  expect(res[0].id).toBe(1);
});
