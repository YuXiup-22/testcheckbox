// // 1.数组扁平化

// function flatten(arr) {
//   let res = []
//   for(let i = 0;i<arr.length;i++){
//     if(Array.isArray(arr[i])){
//       res = res.concat(flatten(arr[i]))
//     }else{
//       res.push(arr[i])
//     }
//   }
//   return res
// }
// var arr = [1,2,[3,[4,5]]]
// // console.log(flatten(arr)); // [1,2,3,4]
// console.log(arr.toString().split(',')); //[ '1', '2', '3', '4' ]

// // arr.toString().split(',');

// function flat(arr) {
//   return arr.reduce((pre,cur)=>{
//     return pre.concat(Array.isArray(cur)?flat(cur):cur)
//   },[])
// }

// console.log("reduce",flat(arr));

// // ES6 的flat
// function _flat(arr,depth) {
//   if(!Array.isArray(arr)||depth<=0){
//     return arr
//   }
//   return arr.reduce((pre,cur)=>{
//     return pre.concat(Array.isArray(cur)?_flat(cur,depth-1):cur)
//   },[])
// }
// console.log(_flat(arr,0)); //[ 1, 2, [ 3, [ 4, 5 ] ] ]
// console.log(_flat(arr,1)); //[ 1, 2, 3, [ 4, 5 ] ]

// // 2.new 字符创建对象的过程
//  fun1 = ()=>{
//   console.log(1);
// }
// console.log(typeof fun1);
// function newObject() {
//   // 拿到构造函数，因为arguments是一个伪数组，没有数组的方法，所以使用this绑定来执行
//   let constructor = Array.prototype.shift.call(arguments)
//   // 判断是否是构造函数
//   if(typeof constructor !=='function'){
//     throw new Error('数据类型不匹配')
//   }
//   // 1.声明一个新的对象
//   let newObj = null
//   // 2.将构造函数的原型作为新对象的原型
//   newObj = Object.create(constructor.prototype)
//   // 3.执行构造函数，返回新对象
//   let res = null
//   res = constructor.apply(newObj,arguments)
//   let flag = res && (typeof res ==='object'|| typeof res === 'function')
//   return flag?res:newObj

// }
// function con(age,name) {
//   this.age = age
//   this.name = name
// }
// let obj = newObject(con,21,'yuxi')

function makeRandomList(left,right,count){
  let res = new Set()
  while(res.size<count){
    let num = left + Math.floor(10*Math.random()%left)
    if(num<right){
      res.add(num)
    } 
  }
  return Array.from(res)
}
let res = makeRandomList(3,9,3)
console.log(res);