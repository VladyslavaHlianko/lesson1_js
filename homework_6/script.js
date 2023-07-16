let arr= [16, -37, 54, -4, 72, -56, 47, 4, -16, 25, -37, 46, 4, -51, 27, -63, 4, -54, 76, -4, 12, -35, 4, 47];
let sum = 0;
let count = 0;
let dob = 1;
let sumParPos = 0;
let sumNeparPos = 0;
let countNeg = 0;
let min = arr[0];
let max = min;
let countNepar = 0;
let countPar = 0;

document.write(`Масив чисел: ${arr} <br>`);
const filtered = arr.forEach((el) => {
if (el > 0) {
  sum = sum + el;
  count = count + 1;
  dob = dob * el;
}
if (el < 0) {
  countNeg = countNeg + 1;
}
if (el > 0 && el % 2 !== 0) {
  countNepar = countNepar + 1;
  sumNeparPos = sumNeparPos + el;
}
if (el > 0 && el % 2 === 0) {
  countPar = countPar + 1;
  sumParPos = sumParPos + el;
}
})
document.write(`Сума позитивних елементів = ${sum} <br>`);
document.write(`Кількість позитивних елементів = ${count} <br>`);
let minIndex = 0;
let maxIndex = 0;
for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max){ 
      max = arr[i];
      maxIndex = i;
    }
    if (arr[i] < min){
      min = arr[i];
      minIndex = i;
    }
}
document.write(`Мінімальний елемент масиву = ${min} <br>`);
document.write(`Порядковий номер мінімального елементу масиву = ${minIndex} <br>`);
document.write(`Максимальний елемент масиву = ${max} <br>`);
document.write(`Порядковий номер максимального елементу масиву = ${maxIndex} <br>`);
// let NewArr = arr;
for(let i = 0; i < arr.length; i++){
  if(arr[i] !== max){
    arr[i] = 0;
  }
}
document.write(`Кількість негативних елементів = ${countNeg} <br>`);
document.write(`Кількість непарних позитивних елементів = ${countNepar} <br>`);
document.write(`Кількість парних позитивних елементів = ${countPar} <br>`);
document.write(`Сума парних позитивних елементів = ${sumParPos} <br>`);
document.write(`Сума непарних позитивних елементів = ${sumNeparPos} <br>`);
document.write(`Добуток позитивних елементів = ${dob} <br>`);
document.write(`Масив в якому присутне найбільше число решта дорівнюють нулю: ${arr}`);
