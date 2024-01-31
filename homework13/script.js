const SINGLE_LIST_HEAD = {
  value: 0,
  next: null
}

const DEFAULT_PARAMETRS = [1, 'two', () => console.log('hello'), true];

function createObj(value) {
  return {
    value: value,
    next: null
  };
}

function findLastElement(){
  let current = SINGLE_LIST_HEAD;
  while (current.next !== null) {
    current = current.next;
  }
  return current;
}

function addObj(value){
  newElement = createObj(value);
  lastElement = findLastElement();
  lastElement.next = newElement;
}

DEFAULT_PARAMETRS.forEach(el => addObj(el));

console.log(SINGLE_LIST_HEAD.next.value); 
console.log(SINGLE_LIST_HEAD.next.next.next.value); 