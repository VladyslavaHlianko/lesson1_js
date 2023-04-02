// Zavdannya 2
document.querySelector('button').onclick = doMath;

function doMath() {
  let a = Number(document.getElementById('firstNumber').value);
  let b = Number(document.getElementById('secondNumber').value);
  let znak = document.getElementById('operator').value;
  var result;
  if(znak === '^'){
    result = Math.pow(a,b);
    document.getElementById('answer').innerHTML = result;
  }
  else{
    result = eval(a+znak+b);
    document.getElementById('answer').innerHTML = result;
  }
}

// Zavdannya 1
const arr = [1, 'dhf', 5, 13, 'dsg', -1, 6, 15, 'dgg', 3.5];
let suma = 0;
let count = 0;
let ser;
document.write('<h2>Завдання 1: </h2>');
document.write(`<h3>Масив:</h3> ${arr} <br>`);
function f() {
  for(let i=0; i<arr.length;i++){
   if(+arr[i]){
      suma = suma + arr[i];
      count = count + 1;
    } 
    ser = suma / count;
  }document.write(`<h3>Середнє арифметичне числових елементів масиву:</h3> ${suma} / ${count} = ${ser}`);
}
f();

// Zavdannya 3
let n;
let z;
let mas = [];
let result = [];
document.write('<h2>Завдання 3:</h2><h3>Масив, який створив користувач:</h3>');
function ArrFunction(){
  let m = Number(prompt('Введіть довжину основного масиву')); 
  do{
    for (var i = 1; i <= m; i++){
      n = Number(prompt(`Введіть довжину ${i} масиву в основному масиві`));
      mas[i]=n;
      for (var j = 1; j <= n; j++){
          z = Number(prompt(`Введіть ${j} значення в масиві`));
          mas[j] = z;
          result = `${result} ${mas[j]}`;
        }
      document.write(`[ ${result} ]`);
      result='';
      }
  }while(i<m)
}
ArrFunction();


// Zavdannya 4
document.write('<h2>Завдання 4:</h2>');
function changeString(string, a, formatter, b){
  string = prompt('Введіть рядок або слово');
  document.write(`<h3>Рядок до виконання функції:</h3> ${string}`);
  a = prompt('Введіть букву для видалення');
  b = prompt('Введіть іншу букву для видалення');
  string = string.replaceAll(a, '');
  string = string.replaceAll(b, '');
  var formatter = string.toUpperCase();
  document.write(`<h3>Рядок після виконання функції:</h3> ${formatter}`);
}
changeString();
