const currencyOne = document.querySelector('#currency-one');
const currencyTwo = document.querySelector('#currency-two')
const amountOne = document.querySelector('#amount-one')
const amountTwo = document.querySelector('#amount-two')
const rateElement = document.querySelector('.rate')
const swapBTN = document.querySelector('#swap')


const calculate = () => {
  const curreOne = currencyOne.value;
  const curreTwo = currencyTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${curreOne}`)
  .then(res => res.json())
  .then(data => {
  const rate = data.rates[curreTwo];
  rateElement.innerHTML = `${curreOne} = ${rate} ${curreTwo}`

  amountTwo.value = (amountOne.value * rate).toFixed(2)
  })
}

const swap = () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
}

const date = () => {
  const getDate = new Date();
  const month = getDate.toLocaleString('default', {month:'short'})
  const year = getDate.getFullYear();
  const day = getDate.getDate();
  const date =  `<span class="dateJS"> ${month}/${day}/${year}</span>`;
  document.getElementById('date').insertAdjacentHTML('beforeend', date)
}
// event listeners
document.addEventListener('DOMContentLoaded', date)
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate)
amountTwo.addEventListener('input', calculate)
swapBTN.addEventListener('click', swap)

calculate();