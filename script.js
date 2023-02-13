let arr;
let sum = 0;
let count = 0;
let dob = 1;
let sumParPos = 0;
let sumNeparPos = 0;
let countNeg = 0;
arr = [16, -37, 54, -4, 72, -56, 47, 4, -16, 25, -37, 46, 4, -51, 27, -63, 4, -54, 76, -4, 12, -35, 4, 47];
let min = arr[0];
let max = min;
let countNepar = 0;
let countPar = 0;

document.write(`Масив чисел: ${arr} <br>`);
const filtered = arr.filter((el) => {
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
for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max){ 
      max = arr[i];
    }
    if (arr[i] < min){
      min = arr[i];
    }
}
document.write(`Мінімальний елемент масиву = ${min} <br>`);
for(let i = 0; i < arr.length; i++){
    if(arr[i] === min){
        document.write(`Порядковий номер мінімального елементу масиву = ${i} <br>`);
    }
}
document.write(`Максимальний елемент масиву = ${max} <br>`);
for(let a = 0; a < arr.length; a++){
  if(arr[a] === max){
    document.write(`Порядковий номер максимального елементу масиву = ${a} <br>`);
  }
}
let NewArr = arr;
for(let i = 0; i < arr.length; i++){
  if(NewArr[i] !== max){
    NewArr[i] = 0;
  }
}
document.write(`Кількість негативних елементів = ${countNeg} <br>`);
document.write(`Кількість непарних позитивних елементів = ${countNepar} <br>`);
document.write(`Кількість парних позитивних елементів = ${countPar} <br>`);
document.write(`Сума парних позитивних елементів = ${sumParPos} <br>`);
document.write(`Сума непарних позитивних елементів = ${sumNeparPos} <br>`);
document.write(`Добуток позитивних елементів = ${dob} <br>`);
document.write(`Масив в якому присутне найбільше число решта дорівнюють нулю: ${NewArr}`);
