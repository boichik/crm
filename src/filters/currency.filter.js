export default function currensyFilter (value, currency = 'UAH') {
  return new Intl.NumberFormat('ua-UA', {
    style: 'currency',
    currency
  }).format(value)
}
