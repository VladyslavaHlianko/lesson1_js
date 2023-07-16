const animals = [
	['🐭','mouse','Jerry'],
	['🐹','hamster','Biscuit'],
	['🐰','rabbit','Bugs'],
	['🦊','fox','Mrs. Fox'],
	['🐻','bear','Paddington']
];

const food = [
	['🍎','apple',10],
	['🍐','pear',12],
	['🍊','tangerine',15],
	['🍋','lemon',5],
	['🍌','banana',7]
];

const universes = [
	['🖤', 'DC', ['Superman', 'Batman', 'Wonder Woman']],
	['❤️', 'Marvel', ['Iron Man', 'the Hulk', 'Black Widow']]
];

function getInfo(headTable, arr){
    document.write(`<p class="head">${headTable}</p>`);
  for (let i = 0; i < arr.length; i++){
    for (let j = 0; j < arr[0].length; j++){
        // universes.forEach(element =>{
        //   universes = element.join(';');
        //   document.write(universes);
        // })
      var animalsImg = arr[i][j];
      document.write(`<div class='table'>${animalsImg}</div>`); 
      }   
    document.write(`<div></div>`); 
  }
}

getInfo(`Animals info`, animals);
getInfo(`Food info`, food);
getInfo(`Universes info`, universes);

