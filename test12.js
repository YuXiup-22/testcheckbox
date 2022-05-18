let num1 = [1,2,3]
Array.prototype._map = function (callback) {
  if(typeof callback!=="function"){
    throw new Error("非函数")
  }
  // let res = []
  return this.reduce((pre,cur)=>{
    return pre.concat(callback(cur))
  },[])
}
console.log(num1._map(item=>item+1)); //true
console.log(num1); //[3,2,1]  

// let res= num1.reduce((pre,cur)=>{
//   pre.push(cur)
// },[])

// console.log(res);
// Array.prototype.myMap = function(fn,thisArg=[]) {
//   // 如果fn传入的不是一个函数则抛出异常
//   if (typeof fn != 'function') {
//     throw new Error(`${fn} is not a function`);
//   }
//   return this.reduce((pre,cur,index,arr) => {
//     return pre.concat(fn.call(thisArg,cur,index,arr)); 
//   },[])
// }
// const arr = [2,3,1,5];
// const temp = arr.myMap(item => item * 2)

// console.log(temp);