let form = document.querySelector('.form');
let p = document.querySelector('.order');
let title = document.querySelector('.title')
let orders = [];
const burgerSizes = {
  small: {
     price: 50,
     calories: 20
  },
  big: {
    price: 100,
    calories: 40
  }
};
const ingredients = {
  cheese: {
    price: 10,
    calories: 100
  },
  potato: {
    price: 8,
    calories: 80
  },
  salad: {
    price: 5,
    calories: 20
  },
  spaces: {
    price: 2,
    calories: 10
  },
  mayo: {
    price: 3,
    calories: 50
  }
};
form.addEventListener('submit', (event) => {
  event.preventDefault();
  let randomValue = 10 + Number((Math.random()+'').slice(2,3));
  let userName = document.querySelector('#user_name').value;
  let size = document.querySelector('#select_size').value;
  let selectedTopping = document.querySelector('input[name="topping"]:checked').value;
  let selectedSauces = [...document.querySelectorAll('input[name="sauce"]:checked')];
  let checked_sauce = selectedSauces.map(el =>{
    if(el.checked){
      return el.value
    }
  })
  let price = burgerSizes[size].price;
  let calories = burgerSizes[size].calories;

  price += ingredients[selectedTopping].price;
  calories += ingredients[selectedTopping].calories;

  checked_sauce.forEach(sauce => {
  price += ingredients[sauce].price;
  calories += ingredients[sauce].calories;
  });
  title.innerHTML = 'Замовлення';
  orders = orders + `<br> <br> Привет ${userName} <br> Ваш заказ ${size} бургер с ${selectedTopping} и ${checked_sauce} будет готов в течении ${randomValue} минут <br> Стоимость заказа: ${price} (${calories} калорий).`;
  p.innerHTML = orders;
  form.reset();
})