class Hamburger {
  static SIZE_SMALL = { price: 50, calories: 20 };
  static SIZE_LARGE = { price: 100, calories: 40 };
  static STUFFING_CHEESE = { price: 10, calories: 20 };
  static STUFFING_SALAD = { price: 20, calories: 5 };
  static STUFFING_POTATO = { price: 15, calories: 10 };
  static TOPPING_SAUCE = { price: 15, calories: 0 };
  static TOPPING_MAYO = { price: 20, calories: 5 };

  #size;
  #stuffing;
  #toppings = [];
  constructor(size, stuffing) {
    this.#size = size;
    this.#stuffing = stuffing;
  }

  addTopping(topping) {
    this.#toppings.push(topping);
  }
  
  removeTopping(topping) {
    this.#toppings = this.#toppings.filter(el => el !== topping);
  }

  getToppings() {
    return this.#toppings;
  }

  getSize() {
    return this.#size;
  }

  getStuffing() {
    return this.#stuffing;
  }

  calculatePrice() {
    let price = this.#size.price + this.#stuffing.price;
    this.#toppings.forEach((topping) => {
      price += topping.price;
    });
    return price;
  }

  calculateCalories() {
    let calories = this.#size.calories + this.#stuffing.calories;
    this.#toppings.forEach(function(topping) {
      calories += topping.calories;
    });
    return calories;
  }
}

// маленький гамбургер з начинкою з салатом
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);

// запитаємо скільки там калорій і вартість
console.log(`Calories: ` + hamburger.calculateCalories());
console.log(`Price: ` + hamburger.calculatePrice());

// добавка з майонезу
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// запитаємо скільки там калорій і вартість
console.log(`Calories: ` + hamburger.calculateCalories());
console.log(`Price: ` + hamburger.calculatePrice());

// я передумала і вирішила прибрати майонез
hamburger.removeTopping(Hamburger.TOPPING_MAYO); 

// запитаємо скільки там калорій і вартість
console.log(`Calories: ` + hamburger.calculateCalories());
console.log(`Price: ` + hamburger.calculatePrice());

// я тут передумала і вирішила додати ще приправу
hamburger.addTopping(Hamburger.TOPPING_SAUCE);

// А скільки тепер коштує?
console.log(`Price with sauce: ` + hamburger.calculatePrice());