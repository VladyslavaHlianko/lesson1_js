const obj = {
  x: 10,
  y: 20,
  inner: {
      x: 20,
      z: 30
  },
  foo2: {
      k: 23,
      p: 13
  }
} 

function convert(){
const newObj = Object.assign({}, obj, obj.inner, obj.foo2);
Object.keys(newObj).forEach(el => {
  if(typeof newObj[el] === 'object'){
    delete(newObj[el]); 
    return newObj;    
  }
}) 
console.log(newObj);
}
convert();