const vegetables = [
  {
      name: `tomato`,
      icon: `🍅`,
      price: 2.3
  },
  {
      name: `carrot`,
      icon: `🥕`,
      price: 1.5
  },
  {
      name: `corn`,
      icon: `🌽`,
      price: 2.78,
      season: true
  }
];

class Vegetable{
  constructor(obj){
      this.name = obj.name;
      this.icon = obj.icon;
      this.price = obj.price;
      this.season = obj.season;
      this.type = `Vegetable`;
      this.seasonKoef = 1.3;
  }

  getPrice() {
      if (this.season) {
          this.newPrice = (this.price * this.seasonKoef).toFixed(3);
          this.seasonName = '. Season: true';
      } else {
          this.newPrice = this.price;
          this.seasonName = '';
      }
  }

  getInfo() {
      this.getPrice();
      return `<li> Type: ${this.type}. SeasonKoef: ${this.seasonKoef}. Name: ${this.name}. Icon: ${this.icon}. Price: ${this.newPrice}${this.seasonName}</li>`;
  }
}

const objects = vegetables.map(el => new Vegetable(el)).map(el => el.getInfo());
const ulElement = `<ul>${objects.join('')}</ul>`;
document.write(ulElement);