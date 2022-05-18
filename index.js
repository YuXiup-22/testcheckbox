// // 0.给函数的原型添加一个方法，使得每个函数都有这个方法
// Function.prototype.myCall=function(thisargs,...args){
//   // 1.拿到传入的this指向,利用对象的方法，将其转化为对象
//   thisargs = thisargs?Object(thisargs):Window

//   // 2.拿到要执行的函数。因为某个函数调用myCall是，maCall的this绑定对象就是该函数
//   var fn = this

//   // 3.给新绑定的对象添加执行函数
//   thisargs.fn = fn

//   // 4.执行函数，拿到结果，利用扩展运算父，将参数填入
//   var res = thisargs.fn(...args)

//   // 5.将新对象的方法fn删除掉，因为其本身就没有
//   delete thisargs.fn

//   // 6.返回结果，无论原函数有无返回，都需要返回，大不了返回空
//   return res
// }

// function fn(num1,num2){
//   // 拿到空数组
//   // var args = [1,2,3]
//   console.log(num1+num2);
// }
// var args 
// fn(...args);

// Function.prototype.myBind = function(thisargs,...args1){
//   // 1.拿到当前调用该方法的对象
//   var fn=this

//   // 2.判断当前传入的绑定对象有无值
//   thisargs = (thisargs!==null&&thisargs!==undefined)?Object(thisargs):Window

//   // 3.注意此时定义返回的函数，接收的参数变成数组，剩余参数
//   return function proxyFn(...args2){
//     // 3.给该对象添加调用的方法,闭包这里
//     thisargs.fn = fn
//     // 4.拿到最后的参数结果,就是绑定传入和最后实际调用方法传入，
//     var finalArgs = [...args1,...args2]
//     // 5.拿到结果,扩展运算符，解构数组
//     var res = thisargs.fn(...finalArgs)

//     // 6.删除新方法
//     delete thisargs.fn
//     // 7.返回结果
//     return res
//   }
// }

// var nums = [1,2,3,4]
// var nums2 = nums.slice(1,2)
// console.log(nums2);
// console.log(nums)

// function bar(x){
//   return function(y){
//     return function(z){
//       return x+y+z
//     }
//   }
// }
// bar(10)(20)(30)

// var bar = x => y=>z=>x+y+z

// var bar = x =>{
//   return y=>{
//     return z=>{
//       return x+y+z
//     }
//   }
// }
// 因为里面只有一步，所以可以去括号 和return  最后就成了最简单的那种

// 函数的柯里化
// 1.传入要进行柯里化的函数
function myCurrying(fn){
  // 2.返回柯里化后函数的第一层，接收参数，可能接收全部，或者部分
  return function curring1(...args1){
    // 3.判断接收多少参数，从而判断是否执行fn  fn.lenght可以拿到函数最多可接收参数的个数
    if(args1.length>=fn.length){
      // 4.全部拿到，此时就执行fn,
      // 可以供以后要改变绑定对象使用,没有改变指向windows，独立函数因为
      // console.log(this);
      return fn.apply(this,args1)
    }
    // 5.若传入部分参数，还要返回函数，接收剩下的
    else{
      return function curring2(...args2){
        // 将参数合并到一起传入,此刻this,如果没有手动替代的化，应该是windows,独立函数
        console.log(this);
        return curring1.apply(this,[...args1,...args2])
      }
    }
  }
}
function fn(x,y,z){
  return x+y+z
}
var res = myCurrying(fn)(10)(20,30)
console.log(res);