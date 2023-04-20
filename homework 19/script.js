let form = document.querySelector('form');
let createdHeroes = document.querySelector('#createdHeroes');
let selectData; 

let render = (hero) => {
  let heroBlock = document.createElement('form');
  heroBlock.innerHTML = `
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" data-name="name" value='${hero.name}' />
  </div>
  <div>
    <label for="comics">Comics:</label>
    <select id="comics" data-name="comics">
      ${selectData.map(item => `
        <option value="${item.name}" ${item.name === hero.comics ? 'selected' : ''}>${item.name}</option>
      `).join('')}
    </select>
  </div>
  <div>
    <label for="favourite">Favourite:</label>
    <input type="checkbox" id="favourite" ${hero.favourite ? 'checked' : ''}>
  </div>
  <button type='button' id='delete_${hero.id}' data-id='${hero.id}'>Delete</button>
  <button type='button' id='update_${hero.id}' data-id='${hero.id}'>Update</button>
  `
  createdHeroes.append(heroBlock);

  let deleteButton = heroBlock.querySelector(`#delete_${hero.id}`);
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    let id = deleteButton.dataset.id;
    deleteHero(id);
    heroBlock.remove();
  });

  let updateButton = heroBlock.querySelector(`#update_${hero.id}`);
  updateButton.addEventListener('click', (e) => {
    e.preventDefault();
    let id = updateButton.dataset.id;
    updateHero(id, heroBlock);
  });
}

const select = document.querySelector('select');
fetch('https://63693f7228cd16bba71904e4.mockapi.io/universes')
  .then(res => res.json())
  .then(data => {
    selectData = data;
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.name;
      option.text = item.name;
      select.appendChild(option);
    });
  })
  .catch(error => console.error(error));

  const checkHeroExists = async (name) => {
    const res = await fetch('https://63693f7228cd16bba71904e4.mockapi.io/heroes');
    const heroes = await res.json();
    return heroes.some(hero => hero.name === name);
  };

let create_Hero = async(obj) => {
  const heroExists = await checkHeroExists(obj.name);
  if (heroExists) {
    console.log('Користувач з таким ім`ям вже є в базі');
    return;
  }
  let result = await fetch('https://63693f7228cd16bba71904e4.mockapi.io/heroes', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj)
  }).then(res => res.json())
  render(result);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let name = document.querySelector('input[data-name="name"]');
  let comics = document.querySelector('select');
  let favourite = document.querySelector('input[type="checkbox"]');

  let newHero = {
    name: name.value,
    comics: comics.value,
    favourite: favourite.checked
  }

  create_Hero(newHero);
})

let getHeroes = async () =>{
  let result = await fetch('https://63693f7228cd16bba71904e4.mockapi.io/heroes', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  }).then(res => res.json())
  
  result.forEach(el =>{
    render(el)
  });
}

getHeroes();

let deleteHero = async (id) => {
  let result = await fetch(`https://63693f7228cd16bba71904e4.mockapi.io/heroes/${id}`, {
    method: 'DELETE',
    }).then(res => res)
}

let updateHero = async (id, heroBlock) => {
  let name = heroBlock.querySelector('input[data-name="name"]');
  let comics = heroBlock.querySelector('select');
  let favourite = heroBlock.querySelector('input[type="checkbox"]');

  let updatedHero = {
    name: name.value,
    comics: comics.value,
    favourite: favourite.checked
  };

  let result = await fetch(`https://63693f7228cd16bba71904e4.mockapi.io/heroes/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedHero)
  }).then(res => res.json())
  .catch(error => console.error(error));
}
