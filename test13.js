
// function getTarget(target,num) {
//   let res = []
//   // let path = []
//   for(let i = 0;i<num.length-1;i++){
//     let j = i+1
//     while(j<num.length&&num[i]+num[j]!==target){
//       j++
//     }
//     if(num[i]+num[j]===target){
//       res.push([i,j])
//     }
//   }

//   return res
// }
// let res = getTarget(2,[-1,1,1,3])

// let s = '1'
// let n = s-0
// console.log(n)



var length = 10; 
function fn() {  
  console.log(this); //window
  return this.length+1;
 }
var obj = {  
   length: 5, 
   test1: function() {  
     return fn();  
    } 
};
  obj.test2=fn; 
  //下面代码输出是什么  
  console.log(obj.test1()) //NAN 调用this的时候，fn没有被其他对象调用
  console.log(fn()===obj.test2()) //false