// typeof
// console.log(typeof 'string'); //string

// 1.instanceof  注意right为类型的构造函数
// function myinstanceof(left,right) {
//   // 注意实例对象选择用getPrototypeOf，避免一些__proto__不被支持
//   let leftpropo = Object.getPrototypeOf(left),
//       rightpropo = right.prototype
//   // 寻找左边的原型链上找得到右边的原型
//   while(leftpropo){
//     if(leftpropo === rightpropo){
//       return true
//     }
//     leftpropo = Object.getPrototypeOf(leftpropo)
//   }
//   return false
// }
// console.log(myinstanceof([],Function)); 

// 2.手写new操作符
function myNew() {
  let constructor = Array.prototype.shift.call(arguments)
  // 判断是否是构造函数
  if(typeof constructor!=='function'){
    throw new Error("数据类型不符合")
  }
  let proto = Object.getPrototypeOf(constructor)
  // 创建指向原型的对象
  let newObj = Object.create(proto)
  // 执行构造函数
  let res = constructor.call(newObj,arguments)

  let flag = res && (typeof res==="object"||typeof res ==="function")

  // 构造函数执行成功
  return flag?res:newObj
}

// 防抖函数
function debounce(fn,delay) {
  // 保存上一次执行的时间
  let timer = null

  return function (...args) {
    if(timer){
      clearTimeout(timer)
    }

    timer = setTimeout(()=>{
      fn.apply(this,args)
    },delay)
  }
}

// 节流函数
function throttle(fn,interval) {
  // 上一次执行时间,为0，使得第一次可以执行
  let lasttime = 0

  let _throttle = function (...args) {
    // 获取当前执行的时间
    let nowTime = new Date().getTime()

    if(nowTime-lasttime>=interval){
      lasttime = nowTime

      return fn.apply(this,args)

    }
  }

  return _throttle
}

// call函数 注意call,输入的参数非数组
Function.prototype.mycall = function(thisArg,...args){
  // 获取当前被执行的函数
  let fn = this

  // 将thisArg转为对象
  thisArg = (thisArg!==null&&thisArg!==undefined)?Object(thisArg):window

  thisArg.fn = fn

  let res = thisArg.fn(...args)
  // 删除对象的属性，如果该属性没有被引用，则最终被释放，或GC
  delete thisArg.fn 

  return res
}
// apply 参数输入的是数组
Function.prototype.myapply = function(thisArg,argArray){
  let fn = this
  thisArg = (thisArg!==null&&thisArg!==undefined)?Object(thisArg):window

  thisArg.fn = fn

  // 注意拿到的是数组，要判断是否传入参数
  args = argArray || []
  let res= thisArg.fn(...args)
  delete thisArg.fn
  return res
}

// bind 参数的传入可以分为两部分
Function.prototype.mybind = function(thisArg,...args){
  let fn = this
  thisArg = (thisArg!==null&&thisArg!==undefined)?thisArg:window

  function proxy(...args2) {
    thisArg.fn = fn
    let res = thisArg.fn(...args,...args2)
    delete thisArg.fn
    return res
  }

  return proxy
}

function mycurry(fn) {
  return function currying1(...args){
    if(args.length>=fn.length){
      return fn.apply(this,args)
    }else{
      return function currying2(...args2) {
        return currying1(args.concat(args2))
      }
    }
  }
}

function curry(fn) {
  return function curry1(...args){
    if(args.length>=fn.length){
      return fn.apply(this,args)
    }else{
      return function curry2(...arg2){
        return curry1.apply(this,args.concat(arg2))
      }
    }
  }
}

// 深拷贝
function isObject(value) {
  let res = typeof value
  return (value!==null)&&(res==='object'||res==="function")
} 

function deepClone(obj) {
  // 判断是否是对象 如果是基本类型就直接返回
  if(!ifObject(obj)) return obj

  let newObj = Array.isArray(obj)?[]:{}

  for(const key in obj){
    newObj[key] = deepClone(obj[key])
    // 浅拷贝
    // newObj[key] = obj[key]
  }
  return newObj
}

// 浅拷贝的一种方法
Object.myAssign = function(target,...sorces) {
  if(target===null) {
    throw new Error('类型不匹配')
  }
  // 将target转为对象 ，如果是对象，直接返回自生
  let res = Object(target)
  sorces.forEach((obj)=>{
    if(obj!==null){
      for(const key in obj){
        res[key] = obj[key]
      }
    }
  })

  return res
}

// 数组的扁平化
let num = [1,[2,3]]
function flatten(arr) {
  let res = []
  for(let i = 0;i<num.length;i++){
    if(typeof num[i] === 'object'){
      // concat不会改变原数组，返回新的数组，但是浅拷贝
      res = res.concat(flatten(num[i]))
    }else{
      res[i] = num[i]
    }
  }
  return res
}

// reduce扁平化
function flatten(num) {
  num.reduce((pre,cur)=>{
    pre.concat(Array.isArray(num)?flatten(cur):cur)
  },[])
}

// split 和 toString
function flatten(num) {
  return num.toString().split(',')
}

// ES6 flat
function flatten(num) {
  // 展开深度为无穷大
  return num.flat(Infinity)
}

// 数组的去重 
function uniqueArray(arr) {
  return Array.from(new Set(arr))
}

// 使用对象去重
function uniqueArray(arr) {
  let map = {}
  let res = []

  for(let i = 0;i<arr.length;i++){
    if(!map.hasOwnPropoty(num[i])){
      map[num[i]] = 1
      res.push(num[i])
    }
  }
  return res
}

// 实现数组的flat方法
Array.prototype.myflat = function (depth) {
  let arr = this
  let res = []
  if(depth<=0) return arr
  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){

    }
  }

  return res
}

function _flat(arr,depth) {
  // 当此时不是数组，或者不需要扁平化时，直接返回
  if(!Array.isArray(arr)||depth<=0){
    return arr
  }
  return arr.reduce((pre,cur)=>{
    if(Array.isArray(cur)){
      return pre.concat(_flat(cur,depth-1))
    }else{
      return pre.concat(cur)
    }
  },[])
}

Array.prototype._filter = function (callback) {
  if(typeof callback !=="function"){
    return 
  }
  let arr = this
  let res =[]
  for(let i = 0;i<arr.length;i++){
    // 只有满足回调函数，即返回true才能添加进来，否则被过滤掉
    callback(arr[i]) && res.push(arr[i])
  }
  return res
}

// map方法，对原数组进行映射改变后
Array.prototype._map = function(callback){
  if(typeof callback !=="function"){
    throw Error("")
  }
  let res = []
  for(let i = 0;i<this.length;i++){
    res.push(callback(this[i]))
  }
  return res
}

// 使用reduce实现map
Array.prototype._map = function (callback) {
  if(typeof callback!=="function"){
    throw new Error("")
  }
  return this.reduce((pre,cur)=>{
    pre.concat(callback(cur))
  },[])
}

// 发布订阅者模式  
class eventEmitter{
  constructor(){
    this.eventMap = {}
  }


  // 绑定事件
  _on(eventName,callback,isOnce){
    // 判断输入值是否符合要求
    if(typeof eventName !=="string"){
      throw new Error("eventtName不符合数据类型")
    }
    if(typeof callback!=="function"){
      throw new Error("callback不符合数据类型")
    }
    // 都符合要求，则将对于的callback添加到对应的数组中
    let handleActions = this.eventMap[eventName]
    if(!handleActions){
      handleActions = []
      // 将数组加入进去
      this.eventMap[eventName] = handleActions
    }
    handleActions.push({
      callback,
      isOnce
    })
  }
  // 如果要给on添加防抖函数
  on(eventName,callback,isOnce){
    return debounce(this._on,500)
    // 然后再在外面输入参数 
  }
  // 只绑定一次
  once(eventName,callback){
    return this.on(eventName,callback,true)
  }
  // 触发事件 传入要触发事件的名称，和需要传入的参数
  emit(eventName,...args){
    // 判断类型是否符合
    if(typeof eventName!=="string"){
      throw new Error("eventtName不符合数据类型")
    }
    // 拿到具体的callback 可能为空
    let handleActions = this.eventMap[eventName] || []
    let len = handleActions.length
    for(let i = 0;i<len;i++){
      if(!handleActions[i]) continue

      let {callback,isOnce} = handleActions[i]

      // 判断是否只执行一次
      if(isOnce){
      //  执行一次后
        callback.apply(this,args)
         // 删除对应名的callback
        this.off(eventName,callback)
        // 因为删除后，此时的i表示下一个callback，所以不需要加1
        i--
      }else{
        callback.apply(this,args)
      }
    }
  }
  // 取消事件 
  off(eventName,callback){
    // 判断输入值是否符合要求
    if(typeof eventName !=="string"){
      throw new Error("eventtName不符合数据类型")
    }
    if(typeof callback!=="function"){
      throw new Error("callback不符合数据类型")
    }
    let handleActions = this.eventMap[eventName] || []
    for(let i = 0;i<handleActions.length;i++){
      if(!handleActions[i]) continue
      // 找到要取消的回调
      if(handleActions[i].callback === callback){
        // 删除
        handleActions.splice(i,1)
        i--
      }
    }
    if(handleActions.length===0){
      delete this.eventMap[eventName]
    }
  }
}

// 防抖
function debounce(fn,delay) {
  let timer = null

  return function (...args) {
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fn.apply(this,args)
    },delay)
  }
}
// 节流
function throttle(fn,delay) {
  let pre = 0
  return function () {
    
  }
}