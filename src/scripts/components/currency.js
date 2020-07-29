function currencyFormat(number) {
  const parsedFloat = parseFloat(number);
  const numberToFormat = !isNaN(parsedFloat) ? parsedFloat : 0;

  return numberToFormat.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 4,
  });
}

currencyFormat(100);
currencyFormat(580937.7);
currencyFormat(562116.6);
