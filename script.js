// получение данных
const userName = prompt('Ваше имя?', 'John');
const userSurname = prompt('Ваша фамилия?', 'Doe');
const userData = Number(prompt('Какого числа Вы родились?', '12'));
const userMonth = Number(prompt('В каком месяце Вы родились?', '11'));
const userYear = Number(prompt('В каком году Вы родились?', '1988'));
const age = 2022-userYear;
// проверка на високосный год
let leapYear;
if(userYear % 400 === 0){
    leapYear = ' (leap year)';
}
else if(userYear % 100 === 0){
    leapYear = '';
}
else if(userYear % 4 === 0){
    leapYear = ' (leap year)';
}
else{
    leapYear = '';
}
// определение знака зодиака
let zodiac;
if((userMonth === 1 && userData >= 20) || (userMonth === 2 && userData <= 18)){
    zodiac = 'Aquarius ♒';
}
else if((userMonth === 1 && userData <= 20) || (userMonth === 12 && userData >= 22)){
    zodiac = 'Capricorn ♑';
}
else if((userMonth === 2 && userData >= 19) || (userMonth === 3 && userData <= 20)){
    zodiac = 'Pisces ♓';
}
else if((userMonth === 3 && userData >= 21) || (userMonth === 4 && userData <= 19)){
    zodiac = 'Aries ♈';
}
else if((userMonth === 4 && userData >= 20) || (userMonth === 5 && userData <= 20)){
    zodiac = 'Taurus ♉';
}
else if((userMonth === 5 && userData >= 21) || (userMonth === 6 && userData <= 20)){
    zodiac = 'Gemini ♊';
}
else if((userMonth === 6 && userData >= 21) || (userMonth === 7 && userData <= 22)){
    zodiac = 'Cancer ♋';
}
else if((userMonth === 7 && userData >= 23) || (userMonth === 8 && userData <= 22)){
    zodiac = 'Leo ♌';
}
else if((userMonth === 8 && userData >= 23) || (userMonth === 9 && userData <= 22)){
    zodiac = 'Virgo ♍';
}
else if((userMonth === 9 && userData >= 23) || (userMonth === 10 && userData <= 22)){
    zodiac = 'Libra ♎';
}
else if((userMonth === 10 && userData >= 23) || (userMonth === 11 && userData <= 21)){
    zodiac = 'Scorpio ♏';
}
else if((userMonth === 11 && userData >= 22) || (userMonth === 12 && userData <= 21)){
    zodiac = 'Sagittarius ♐';
}
else{
    zodiac = '';
}
// выведение данных
document.write(`User Bio: ${userName} ${userSurname}, ${age} years old` + `${leapYear}` + `, ${zodiac};`);
