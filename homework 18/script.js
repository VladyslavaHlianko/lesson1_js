const BASE_URL = 'https://api.chucknorris.io/jokes/'

let form = document.querySelector('form')
let content = document.querySelector('#block')
let favorite = document.querySelector('#favorite')

let radio1 = document.querySelector('#random');
let radio2 = document.querySelector('#categories');
let radio3 = document.querySelector('#search');
let freeSpeech = document.querySelector('#search_categories');
let choose_categories = document.querySelector('.choose_categories');
let categorySelect;

function renderCategories(categories) {
  let choose_categories = document.querySelector('.choose_categories');
  choose_categories.innerHTML = '';
  categories.forEach(category => {
    let input = document.createElement('input');
    let label = document.createElement('label');
    input.id = category;
    input.type = 'checkbox';
    label.classList.add('checkbox');
    label.innerText = category;
    choose_categories.append(input);
    choose_categories.append(label);
    label.setAttribute('for', `${category}`);
  });
}
  
function getCategories() {
  fetch(`${BASE_URL}categories`)
    .then(response => response.json())
    .then(categories => {
      renderCategories(categories);
    });
}
  
function getJokeByCategory() {
  const categorySelect = document.querySelectorAll('.choose_categories input[type="checkbox"]:checked');
  const categories = Array.from(categorySelect).map(input => input.id).join(',');
  const categoriesArray = categories.split(',');
  
  categoriesArray.forEach(category => {
    fetch(`${BASE_URL}random?category=${category}`)
      .then(response => response.json())
      .then(joke => {
        render(joke);
      });
  });
}
  
function getRandomJoke() {
  fetch(`${BASE_URL}random`)
    .then(response => response.json())
    .then(joke => {
      render(joke);
    });
}

function getJokeBySearch() {
  let query = freeSpeech.value;
  fetch(`${BASE_URL}search?query=${query}`)
    .then(response => response.json())
    .then(response => response.result.forEach(joke => {
      render(joke);
    }));
}


radio1.addEventListener("click", () => {
  freeSpeech.style.display = 'none';
  choose_categories.style.display = 'none';
});

radio2.addEventListener("click", () => {
  getCategories();
  choose_categories.style.display = 'flex';
  freeSpeech.style.display = 'none';
});

radio3.addEventListener("click", () => {
  freeSpeech.style.display = 'block';
  choose_categories.style.display = 'none';
});

let addFavorite = (joke, store) => {
  store.push({...joke, like: true });
  localStorage.setItem('favorite', JSON.stringify(store));
  render({...joke, like: true});
}

let removeFavorite = (joke, store) => {
  let updatedStore = store.filter(el => el.id !== joke.id);
  localStorage.setItem('favorite', JSON.stringify(updatedStore));
  
  favorite.querySelector(`.block_joke[data-id=id_${joke.id}]`).remove();
  let img = content.querySelector(`.block_joke[data-id=id_${joke.id}] img`);
  // img.src = './img/Vector.svg';
}

let getStore = () => JSON.parse(localStorage.getItem('favorite')) ?? []

let clickHeart = (joke) => {
  let img = document.querySelector(`.block_joke[data-id=id_${joke.id}] img`);
  let store = getStore();

  if(img.src.includes('heart')){
    img.src = './img/Vector.svg';
    removeFavorite(joke, store);
  }else{
    img.src = './img/heart.svg';
    addFavorite(joke, store);
  }
}

let markIfFavorite = (joke, img) => {
  let store = getStore();
  store.findIndex(el => el.id === joke.id) >= 0 && (img.src = './img/heart.svg');

}

let render = (joke) => {
  let content = document.querySelector('#block');
  let svg = document.createElement('div');
  let block = document.createElement('div');
  let img_svg = document.createElement('img');
  let joke_content = document.createElement('div');
  let joke_wrapper = document.createElement('div'); 
  let jokeId = document.createElement("a");
  let date = document.createElement('h3');
  let date_block = document.createElement('div');
  let link_svg = document.createElement('img');
  link_svg.src = './img/link.svg';

  let created = new Date(`${joke.created_at}Z`);
  let now = new Date();
  let miliSec = Math.abs(created - now);
  let hour = Math.floor(miliSec / (1000 * 60 * 60));

  date_block.classList.add('date_block');
  jokeId.innerText = `${joke.id} `;
  date.innerText = `Last update: ${hour} hours ago`;
  date.classList.add('date');
  let block_categ = document.createElement('div');
  img_svg.src = './img/message.svg';
  svg.classList.add('svg_block');
  jokeId.href = `${joke.url}`;
  let p = document.createElement('p');
  let img = document.createElement('img');
  p.innerHTML = joke.value;
  svg.append(img_svg);
  block.append(img);
  img.src = './img/Vector.svg';
  block.dataset.id = `id_${joke.id}`;
  jokeId.append(link_svg);
  joke_content.append(jokeId);
  joke_content.append(p);
  date_block.append(date);
  joke_content.append(date_block);

  if(joke.categories && joke.categories.length > 0){
    block_categ.innerText = `${joke.categories}`;
    block_categ.classList.add('block_categ');
    date_block.append(block_categ);
  }

  joke_wrapper.append(svg);
  joke_wrapper.append(joke_content);
  block.append(joke_wrapper);
  img.addEventListener('click', () => clickHeart(joke));
  joke_content.classList.add('joke_content');
  joke_wrapper.classList.add('joke_wrapper');

  img.classList.add('heart');
  p.classList.add('joke');
  block.classList.add('block_joke');
  if(joke.like){
    favorite.append(block);
    img.src = './img/heart.svg';
  }else{
    markIfFavorite(joke, img);
    content.append(block);
  }
}

let button = document.querySelector('.favorite_button');
let wrap = document.querySelector('#wrap');

button.addEventListener('click', () => {
  button.classList.toggle('clicked');
  favorite.classList.toggle('favorite');
  wrap.classList.toggle('wrap');
});

form.addEventListener('submit', (event) =>{
  event.preventDefault();
  
  if (radio1.checked) {
    getRandomJoke();
  } else if (radio2.checked) {
    getJokeByCategory();
  } else {
    getJokeBySearch();
  }
});

let renderFavorite = () => {
  let store = getStore()
  store.forEach( joke => render(joke))
}

renderFavorite()