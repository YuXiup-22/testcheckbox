// 继承
// 1.原型链继承

// 1.1
function Person() {
  this.name = 'yuxi';
}
// 1.2 注意每创建一个函数，也创建了其原型对象
Person.prototype.running = function(){
  console.log(" is running...");
}
// 1.3 定义子类构造函数
function stu() {
  this.age = 11
}
// // 1.4 创建父类构造函数的对象 将父类构造函数的对象 作为 子类构造函数的原型
// var p1 = new Person()
// stu.prototype = p1
// // 1.5 在子类构造函数的原型上添加方法
// stu.prototype.reading = function(){
//   console.log(this.name+"is reading...");
// }
// var s1 = new stu()
// console.log(Object.getPrototypeOf(s1));
// console.log(s1);

// var createAnother = function(sub){
//   var clone = Object(sub)
//   clone.getintro = function(){
//       return this.name + this.age
//   }
//   return clone
// }

// var test  = {
//   name:"xuxiaotong",
//   age:21,
// }
// var test1 = createAnother(test)
function CreateObject(Obj){
	function fn(){}
	fn.prototype = Obj
  // console.log(new fn());
  var fn1 = new fn()
	return fn1
}

//封装继承函数
function inhreit(SubType,SuperType){
  // 返回一个继承Person原型对象所有属性和方法的对象
	SubType.prototype = CreateObject(SuperType.prototype)
	// Object.definePrototype(SubType.prototype,"constructor",{
	// 	value:SubType
	// })
  // 子类构造函数的Prototype是
  console.log(SubType.prototype);
  // SubType.prototype.constructor = SubType
}

inhreit(stu,Person)
console.log(new stu());


// 寄生组合式继承

function CreateObject(obj) {
  function fn() {}
  fn.prototype = obj
  return new fn()
}

function inherit(subType,superType) {
  var proto = CreateObject(superType)
  subType.prototype = proto
  subType.prototype.constructor = subType
}

