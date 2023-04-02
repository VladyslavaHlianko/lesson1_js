const userData = {
	USD: 1000,
	EUR: 900,
	UAH: 15000,
	BIF: 20000,
	AOA: 100
};

const bankData = {
    USD: {
        max: 3000,
        min: 100,
        img: '💵'
    },
    EUR: {
        max: 1000,
        min: 50,
        img: '💶'
    },
    UAH: {
        max: 0,
        min: 0,
        img: '💴'
    },
    GBP: {
        max: 10000,
        min: 100,
        img: '💷'
    }
}
         

const keys = Object.keys(userData);
const keysBank = Object.keys(bankData);

function checkBalance() {
  let balance = prompt(`Введіть валюту, за якою буде виведено баланс. Доступні: (${Object.keys(userData).join(', ')})`).toUpperCase();
  while(!keys.includes(balance)){
    balance = prompt(`Введіть валюту, за якою буде виведено баланс. Доступні: (${Object.keys(userData).join(', ')})`).toUpperCase();
  }
  if (keys.includes(balance)) {
    console.log(`Баланс становить: ${userData[balance]} ${balance}`);
  } 
}

function WithdrawMoney() {
  let currency;
  do {
    currency = prompt(`Введіть валюту. У Вас в наявності (${Object.keys(userData).join(', ')}). В банку наявні валюти (USD, EUR, GBP)`).toUpperCase();
  } while (!keys.includes(currency) || !keysBank.includes(currency) || bankData[currency].max === 0);
  maxAmount = Math.min(userData[currency], bankData[currency].max);
  minAmount = bankData[currency].min;
  amount = Number(prompt(`Введіть суму (${minAmount}-${maxAmount} ${currency}):`));
  if (!isNaN(amount)) {
    if (amount > maxAmount) {
      console.log(`Введена сума більша за доступну. Максимальна сума зняття: ${maxAmount} ${currency}`);
    } else if (amount < minAmount) {
      console.log(`Введена сума менша за доступну. Мінімальна сума зняття: ${minAmount} ${currency}`);
    } else {
      userData[currency] -= amount;
      console.log(`От Ваші гроші ${amount} ${currency} ${bankData[currency].img}`);
    }
  } else {
    console.log("Введіть числове значення");
  }
}
  
function getMoney() {
  return new Promise((resolve, reject) => {
    const answer = confirm("Подивитися баланс карті?");
    if (answer) {
      resolve();
    } else {
      reject('Відміна запиту на перегляд балансу');
    }    
  })
} 

let NewPromise = getMoney();

NewPromise
  .then(
    () => checkBalance(), 
    () => WithdrawMoney()
  )
  .catch((err) => console.log(err))
  .finally(() => console.log('Дякую, гарного дня 😊'))