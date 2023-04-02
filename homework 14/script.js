let block = document.querySelector('.block');
block.style.top = 0;
block.style.left = 0;
let windowWidth = document.body.clientWidth;
let windowHeight = document.body.clientHeight;

setInterval(
  ()=>{
    let randomNumber = 20 + Number((Math.random() + '').slice(2, 3));
    console.log(randomNumber);
    blockTop = parseInt(block.style.top) + randomNumber;
    blockLeft = parseInt(block.style.left) + randomNumber;    
    if(blockLeft + block.clientWidth < windowWidth && blockTop + block.clientHeight < windowHeight){
      block.style.left = blockLeft + 'px';    
      block.style.top = blockTop + 'px';
    }
  }, 1000)

setInterval(
  ()=>{
    let randomColor = (Math.random() + '').slice(2, 8);
    block.style.backgroundColor = '#' + randomColor;
  }, 500)

  