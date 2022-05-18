// function Foo(car){
//   this.bar = function(){
//     this.bar = ()=>{
//       console.log(this.car);
//     }
//     Foo.bar = () =>{
//       console.log(this.car);
//     }
//   }
//   this.car = car
// }
// const m = new Foo(3)
// m.bar()
// Foo(45)
// Foo.bar()
// var a =Object.toString;
// console.log(a.call([1]));
let a=1
let  b=4
a=a+b
b = a- b 
a = a-b
console.log(a);