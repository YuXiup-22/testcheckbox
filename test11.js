// const p1 = new Promise((resolve,reject)=>{
//   reject(4)
// })
// const thenalbe = {
//   then(){
//     console.log("new");
//     return '10'
//   }
// }
// const p2 = new Promise((resolve,reject)=>{
//   console.log(2);
//   resolve(1)
// })
// p2.then(res=>{
//   console.log("res1", res);
//   return thenalbe
// },err=>{
//   console.log("err1",err);
// }).then(res=>{
//   console.log("res2", res);
// },err=>{
//   console.log("err2",err);
// })

// new Promise(resolve => {
//   resolve(1);
// }).then(t => {
//   console.log(t)
//   return function then(resolve, reject){
//     console.log(2);
//     resolve(3)
//   }
// },err=>console.log('err')).then(res=>console.log(res),err=>console.log(err))

function getSomething() {
  return "something";
  }
  async function testAsync() {
  // return Promise.resolve("hello async");
  return 1
  }
  async function test() {
  const v1 = await getSomething();
  const v2 = await testAsync();
  console.log(v1, v2);
  }
  test();
  
  