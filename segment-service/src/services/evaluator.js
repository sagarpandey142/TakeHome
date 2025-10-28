// evaluator: parse simple rules (one per line) and filter products.
// Supported operators: =, !=, >, >=, <, <=
// Boolean true/false for on_sale; strings for stock_status; numeric for price, stock_quantity
function parseLine(line) {
  // Trim and support operators
  const opMatch = line.match(/(.*?)\s*(==|=|!=|>=|<=|>|<)\s*(.*)/);
  if (!opMatch) throw new Error(`Invalid rule: ${line}`);
  const left = opMatch[1].trim();
  const op = opMatch[2].replace('==', '=');
  const rightRaw = opMatch[3].trim();
  let right = rightRaw;
  // try to parse as number or boolean
  if (/^\d+(\.\d+)?$/.test(rightRaw)) {
    right = Number(rightRaw);
  } else if (/^(true|false)$/i.test(rightRaw)) {
    right = rightRaw.toLowerCase() === 'true';
  } else {
    // strip quotes if any
    right = rightRaw.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
  }
  return { left, op, right };
}

function matchCondition(product, cond) {
  const { left, op, right } = cond;
  const val = product[left];
  // handle undefined
  if (val === undefined) return false;
  // numeric compare if both numeric
  const bothNumeric = (typeof val === 'number' || (!isNaN(parseFloat(val)) && isFinite(val))) && typeof right === 'number';
  let leftVal = val;
  if (bothNumeric) leftVal = Number(val);
  if (op === '=' ) return leftVal == right;
  if (op === '!=') return leftVal != right;
  if (op === '>') return leftVal > right;
  if (op === '>=') return leftVal >= right;
  if (op === '<') return leftVal < right;
  if (op === '<=') return leftVal <= right;
  return false;
}

function parseRules(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const conds = lines.map(parseLine);
  return conds;
}

function evaluate(products, rulesText) {
  const conds = parseRules(rulesText);
  return products.filter(p => conds.every(cond => matchCondition(p, cond)));
}

module.exports = { parseLine, parseRules, evaluate };
