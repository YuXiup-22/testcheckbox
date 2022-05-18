// const addP = (msg, ms) => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(msg);
//   }, ms);
// })

// const arr = [addP('11111', 3000), addP('22222', 1000), addP('33333', 10000)];

// async function foo(arr) {
//   for (const p of arr) {
//     console.log(await p);
//   }
// }
// foo(arr)

// function retry(count,await,fn) {
//   if(count>0){
//     setTimeout(()=>{

//     },await)
//   }
// }

// 数组去重
// 使用set
// let arr = [1,1,3,4,5]
// Array.from(new Set(arr))
// // 使用map
// function deDouble(arr) {
//   let map = {}
//   let res = {}
//   let length = arr.length
//   for(let i = 0;i<length;i++){
//     // 根据键，判断有无对于的值
//     if(!map.hasOwnProperty(arr[i])){
//       map[arr[i]] = 1
//       res.push(arr[i])
//     }
//   }
//   return res
// }
// console.log(typeof null==='object');
var a = Object.prototype.toString;
console.log(null instanceof Object);
