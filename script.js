let num;
let dob = 1;
do {
  num = Number(prompt('Введіть число, яке буде дорівнювати довжині масиву'));
  num = Math.round(num);
  if (num < 0){
    num = Math.abs(num);
  }
} while (num < 2 || num > 10)
let arr = new Array(num);
for (let i = 0; i < arr.length; i++){
  let randomValue = Math.round(Math.random()*10);
  arr[i] = randomValue;
}
for (let el of arr){
  dob = dob * el;
}
console.log(`Масив чисел \n${arr}`);
console.log(`Добуток = ${dob}`);