const res = require("express/lib/response")
const { type } = require("express/lib/response")

// 1.object.create
function create(obj){
  var fu = function(){
  }
  fu.prototype = obj
  return new fu()
}
// 2.instanceof
function myinstanceof(left,right){
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left),
      prototype = right.prototype
  // 判断是否在原型上
  while(true){
    if(!proto) return false
    if(proto===prototype) return true

    proto = Object.getPrototypeOf(proto)
  }
}
// new 操作符
function createobj(){
  let newObj = null
  let res = null
  let constructor = Array.prototype.shift.apply(arguments)
  // 判断传入的是否是构造函数
  if(typeof constructor !=='function'){
    return
  }
  // 
  newObj = Object.create(constructor.prototype)
  res = constructor.apply(newObj,arguments)
  let flag = res&&(typeof res ==='function'||typeof res==='object')
  res = flag?res:newObj
  return res
}
// 防抖
function debounce(fn,delay){
  let timer = null

  return function(){
    // timer存在，则消除
    if(timer){
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(()=>{
      fn.apply(this,arguments)
    },delay)
  }
}
// 节流
function throttle(fn,delay){
  let curtime = 0

  return function(){
    let now = Date.now()
    if(now-cur>=delay){
      now = Date.now()
      return fn.apply(this,arguments)
    }
  }
}
// 手写类型判断
function gettype(value){
  if(value === null){
    return value+''
  }
  // 如果是引用类型
  if(typeof value==='object'){
    let res = Object.prototype.toString.call(value)
    type = res.split(" ")[1].split("")
    type.pop()//去掉最后的括号
    return type.join("").toLowerCase()
  }else{
    return typeof value
  }
}
// call 
Function.prototype.mycall = function(thisargs,...args){
  thisargs = (thisargs!==null&&thisargs!==undefined)?Object(thisargs):window

  let fn = this
  thisargs.fn = fn
  let res = thisargs.fn(...args)
  delete thisargs.fn
  return res
}
// apply
Function.prototype.myapply = function(thisargs,args){
  thisargs = (thisargs!==null&&thisargs!==undefined)?Object(thisargs):window

  let fn = this
  thisargs.fn = fn

  args = args?args:[]
   var res = thisargs.fn(...args)
   delete thisargs.fn
   return res
}
// bind
Function.prototype.mybind = function(thisargs,...args1){
  thisargs = (thisargs!==null&&thisargs!==undefined)?Object(thisargs):window
  let fn =this

  return function proxyfn(...args2) {
    thisargs.fn = fn
    let args = [...args1,...args2]
    let res = thisargs.fn(...args)
    delete thisargs.fn
    return res
  }
}
// 柯里化
function currying(fn){
  return function currying1 (...arg1){
    // 接收到所有参数
    if(arg1.length>=fn.length){
      return fn.apply(this,...arg1)
    }
    else{
      return function currying2(...arg2){
        return currying1.apply(this,[...arg1,...arg2])
      }
    }
  }
}
function isObject(obj){
  let type = typeof obj
  return obj!==null&&(type==='object'||type==='function')
}
// 深拷贝
function deepcopy(obj){
  // 不是对象，且不为空
  if(!ifObject(obj)) return obj
  const newObj = Array.isArray(obj)?[]:{}
  for(item in obj){
    newObj[item] = deepcopy(obj[item])
    // 浅拷贝 newObj[item] = obj[item]
  }
  return newObj
}

function sleep(delay) {
  return new Promise(resolve=>{
    setTimeout(resolve,delay)
  })
}
// Object.assign
function assign(target,...source){
  if(target===null) return
  let res = Object(target)
  source.forEach(function(obj){
    if(obj!==null){
      for(key in obj){
        if(obj.hasOwnProperty(key)){
          res[key] = obj[key]
        }
      }
    }
  })
  return res
}

// 日期格式转换
function format(input,format){
  let day = input.get
}
// 数组扁平化
 function myflat(arr){
   let res = []

   for(let i = 0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      res = res.concat(myflat(arr[i]))
    }else{
      res.push(arr[i])
    }
   }
   return res
 }

 function myflat(arr){
   return arr.reduce((pre,cur)=>{
    pre = pre.concat(Array.isArray(cur)?myflat(cur):cur)
   },[])
 }
//  数组去重
function uniqueArray(arr){
  return Array.from(new Set(arr))
}

function uniqueArray(arr){
  let map = new Map()
  let res = []
  for(let i =0;i<arr.length;i++){
    if(!map.hasOwnProperty(arr[i])){
      map[arr[i]]=1
      res.push(arr[i])
    }
  }
  return res
}

// 数组的map方法
Array.prototype.mymap = function(fn){
  if(typeof fn !=='function') return
  return this.reduce((pre,cur)=>{
    let res  = fn(cur)
    pre.push(res)
  },[])
}