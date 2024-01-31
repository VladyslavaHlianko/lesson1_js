const block = document.querySelector('.block');
let square = block.getBoundingClientRect();
let topPos = square.top;
let leftPos = square.left;

const windowWidth = document.body.clientWidth;
const windowHeight = document.body.clientHeight;

function moveWithArrow(event) {
  square = block.getBoundingClientRect();
  topPos = square.top;
  leftPos = square.left;

  if (event.keyCode === 38 && topPos > 0) {
    topPos -= 10;
    block.style.top = topPos + 'px';
  } else if (event.keyCode === 40 && topPos + block.clientHeight < windowHeight) {
      topPos += 10;
      block.style.top = topPos + 'px';
  } else if (topPos <= 0 && event.keyCode === 38) {
      topPos += 20;
      block.style.top = topPos + 'px';
      block.classList.add('block_text');
      setTimeout(() => {
        block.classList.remove('block_text');
      }, 2000);
  } else if (topPos + block.clientHeight >= windowHeight && event.keyCode === 40) {
      topPos -= 20;
      block.style.top = topPos + 'px';
      block.classList.add('block_text');
      setTimeout(() => {
        block.classList.remove('block_text');
      }, 2000);
  }

  if (event.keyCode === 37 && leftPos > 0) {
    leftPos -= 10;
    block.style.left = leftPos + 'px';
  } else if (event.keyCode === 39 && leftPos + block.clientWidth < windowWidth) {
      leftPos += 10;
      block.style.left = leftPos + 'px';
  } else if (leftPos + block.clientWidth >= windowWidth && event.keyCode === 39) {
      leftPos -= 20;
      block.style.left = leftPos + 'px';
      block.classList.add('block_text');
      setTimeout(() => {
        block.classList.remove('block_text');
      }, 2000);
  } else if (leftPos <= 0 && event.keyCode === 37) {
      leftPos += 20;
      block.style.left = leftPos + 'px';
      block.classList.add('block_text');
      setTimeout(() => {
        block.classList.remove('block_text');
      }, 2000);
  }
}
document.addEventListener('keydown', moveWithArrow);

function moveWithSpace(event) {
  if (event.keyCode === 32) {
    topPos -= 10;
    block.style.top = topPos + 'px';
    setTimeout(() => {
      topPos += 10;
      block.style.top = topPos + 'px';
    }, 500)
  }
}
document.addEventListener('keydown', moveWithSpace);

function moveWithCtrl(event) {
  if (event.ctrlKey && event.keyCode === 17) {
    block.style.width = block.clientWidth * 1.25 + 'px';
    block.style.height = block.clientHeight * 0.6 + 'px';
  }
}
document.addEventListener('keydown', moveWithCtrl);

block.style.left = (window.innerWidth - block.offsetWidth) / 2 + 'px';
block.style.top = (window.innerHeight - block.offsetHeight) / 2 + 'px';