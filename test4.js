// 数组的map方法
// Array.prototype.mymap = function(fn){
//   if(typeof fn !=='function') return
//   // let resA = []
//   return this.reduce((pre,cur)=>{
//     let res  = fn(cur)
//     return pre.push(res)
//   },[])
//   // return resA
// }
// let arr = [1,2,3]
// let res = arr.mymap(item=>item*2)
// console.log(res);

function myflat(arr){
  // let res= []
  return arr.reduce((pre,cur)=>{
   pre = pre.concat(Array.isArray(cur)?myflat(cur):cur)
  },0)
  // return res
}
let arr = [1,[2,3]]
let res = myflat(arr)
console.log(res);
