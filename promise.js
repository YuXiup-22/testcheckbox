// 定义Promise的三种状态
const PROMISE_STATUS_FULFILLED = "fuilfilled"
const PROMISE_STATUS_PENDING = "pending"
const PROMISE_STATUS_REJECTED = "rejected"

// 优化部分，在then中捕捉异常后，reject出去给下一个then
function execFunctionWithCatchError(executor,value,resolve,reject){
  try {
    let res = executor(value)
    resolve(res)
  } catch (error) {
    reject(error)
  }
}

class myPromise{
  // 在new一个promise的时候，会传入回调函数，并且会被立即执行
  constructor(executor){
    this.status = PROMISE_STATUS_PENDING
    // resolve时传递的结果
    this.value = undefined
    // reject时传递的结果
    this.reason = undefined
    // then的优化1：收集多个then方法
    this.onFulfilled = []
    this.onRejected = []

    //2.1 resolve方法
    let resolve = (value)=>{
      // 注意只有在状态为pending时，才能进行，一旦状态改变，则无法继续
      // 例如，先进行reject后，紧接着又有一行resolve代码，但是resolve是不执行的
      if(this.status === PROMISE_STATUS_PENDING){
        
        // 该方法，在主线程结束后执行,所以把then的回调函数放在这里
        queueMicrotask(()=>{
          // 优化：由于执行收集的then回调都放在微任务中进行，所以在收集回调的时候，此时状态都没改变
          //      所以，我们在微任务中执行的时候，根据resolve和reject的前后顺序，依次执行回调，
          //      但是一旦改变状态后，其他状态就不能执行，所以要先做判断
          if(this.status !== PROMISE_STATUS_PENDING) return 
          
          // 1.首先改变状态 优化一：如果先改变了状态，但是后续then方法收集回调的时候就会影响
          // 所以立即执行回调，但是此时value值还没有拿到，需要等到主线程结束后，执行微任务时拿到
          // 所以此时先不改状态，等主线程中的then回调收集后再改状态
          this.status = PROMISE_STATUS_FULFILLED
          // 2.拿到要resolve出去的值
          this.value = value
          // 3.将resolve中的value传递给then中的回调，并且执行then中的回调
          // BUT 由于promise是异步的，then中不能马上拿到结果，并且执行回调，
          // 在主线程结束之后，开始执行微任务，即promise的then
          // 优化多个then：
          this.onFulfilled.forEach(fn=>fn(this.value))
        })
        
      }
    } 
    // 2.2 rejectd方法
    let reject = (reason)=>{
      if(this.status === PROMISE_STATUS_PENDING){
        queueMicrotask(()=>{
          if(this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          // console.log(reason);
          // this.onRejected(reason)
          this.onRejected.forEach(fn=>fn(this.reason))
        })
      }
    }

    // 1.回调函数会被立即执行 优化捕捉异常
    try{
      // 当在执行时，遇到异常，会捕捉到，利用reject出去 注意此时，如果异常在resolve和
      // reject方法之后，则不会被捕捉到
      executor(resolve,reject)
    }catch(err){
      reject(err)
    }

    // 2.由于回调函数会在函数内使用resolve和reject方法，但是两个方法都不是其自带的，而是Promise类提供的
    // 所以我们需要在类中定义该两个方法，然后在回调函数执行的时候传入进去，使得回调函数的两个形参resolve
    // 和reject能够在函数内部起作用。
    // 注意，我们在回调函数执行前就定义改两个方法，所以写在上面
    }
  // 在这里写then方法，相当于在构造函数的原型上，写then方法
  // 这里的形参会被调用then方法时赋值
  then(onFulfilled,onRejected){
    // 链式调用优化 then之后，返回Promise
    return new myPromise((resolve,reject)=>{
      // 这里面为立即执行函数，所以要拿到then中结果后，resolve出去

      // 将传入的两个回调函数，赋值给类中相应的变量，以便于在resolve
      // 和reject时，调用相应的方法
      // 当状态没有改变时
      if(this.status === PROMISE_STATUS_PENDING){
        // 收集对应的then的回调 优化多个then回调

        // 我们需要在这里拿到结果，所以传递一个回调函数进去，当上面resolve和reject执行时，
        // 可以在这里拿到结果  value也是上面调用时传入的
        this.onFulfilled.push((value)=>{
          // try {
          //   // 捕捉在onFulfilled中遇到的异常
          //   let newvalue = onFulfilled(value)
          //   resolve(newvalue)
          // } catch (error) {
          //   reject(error)
          // }
          // 使用如下替换上面部分，因为then中的方法都会捕捉异常，后续会复用
          execFunctionWithCatchError(onFulfilled,value,resolve,reject)
        })  
        this.onRejected.push((reason)=>{
          // let value = onRejected(reason)
          // resolve(value)
          execFunctionWithCatchError(onRejected,reason,resolve,reject)

        })  
      }
      // promise状态改变后的then回调函数执行
      if(this.status === PROMISE_STATUS_FULFILLED){
        // 此时立即执行对于的then回调函数，不收集了，因为此时已经延迟了
        // 拿到then中执行的结果，用resolve给下一个then
        // let value = onFulfilled(this.value)
        // resolve(value)

        execFunctionWithCatchError(onFulfilled,this.value,resolve,reject)

      }
      if(this.status ===  PROMISE_STATUS_REJECTED){
        // let value = onRejected(this.reason)
        // resolve(value)

        execFunctionWithCatchError(onRejected,this.reason,resolve,reject)
      }
    })

    
  }
  // 类的方法，对于多个对象，全部为fufilled时，范围promise的结果为所有的[]
  // 但是只要有一个为reject，则立即返回promise，且结果为reject中的
  static all(iterable){
    // 这里也是返回一个promise
    return new myPromise((resolve,reject)=>{
      let values = []
      iterable.forEach(promise=>{
        // 拿到传入pormise的结果
        promise.then(res=>{
          values.push(res)
          // 当都执行完以后，再resolve出去
          if(values.length === iterable.length){
            resolve(values)
          }
        },err=>{
          // 一旦某一个promise有reject，就立马将其结果传递
          reject(err)
        })
      })
    })
  }
  // 一旦状态改变，就立马传递出去
  static race(iterable){
    return new myPromise((resolve,reject)=>{
      iterable.forEach(promise=>{
        promise.then(res=>{
          resolve(res)
        },err=>{
          reject(err)
        })
      })
    })
  }
}

// 测试一下 是否resolve和reject只能执行一个
// 这里的回调函数设置了两个形参，在myPromise内部执行回调函数的时候
// 会给两个形参，分别赋值对于的方法
// const promise = new myPromise((resolve,reject)=>{
//   console.log("状态为pending");

  // throw new Error("快来捕捉异常啦")
  // resolve(1)
  // 优化三：在执行这部分立即执行函数时，我们需要捕捉异常，但遇到异常后，无论是resolve还是reject
  //        最后都会reject出去，然后then拿到结果
  // throw new Error("快来捕捉异常啦")
  // reject(2)
// })

// 第二部分 then方法
// 先在这里写好then方法，然后去上面实现 
// 优化部分： 1.then的链式调用，then之后返回promise继续链式调用，注意：无论是resolve和reject，
//              返回的结果：链式调用的then的resolve拿到
//           2.异常捕捉，在then中捕捉异常
// promise.then(res=>{
//   console.log("resolve1",++res);
//   throw new Error("then中的异常捕捉")
//   return res
// },err=>{
//   console.log("reject1",err);
//   return err
// }).then(res=>{
//   console.log("resolve2",res+1);
// },err=>{
//   console.log("reject2",err);
//   throw new Error("then中的异常捕捉2")
// }).then(res=>{},err=>{
//   console.log("reject3",err);
// })

// then的优化部分：
//  如果调用then多次，那么then的回调函数也会拿到对应的结果，执行多次
//  对于方法：then回调使用数组收集
// promise.then(res=>{
//   console.log("resolve2",res+1);
// },err=>{
//   console.log("reject2",err+1);
// })
//  在promise已经改变状态后，又调用then方法，此时根据promise的状态，
//  then来执行对于的回调函数
// setTimeout(()=>{
//   promise.then(res=>{
//     console.log("延迟then方法resolve",res+2);
//   },err=>{
//     console.log("延迟then方法reject",err+2);
//   })
// },2000) 

// 这里测试all方法
const p1 = new myPromise((resolve,reject)=>{
  setTimeout(()=>{
    reject(1111)
  },5000)
})
const p2 = new myPromise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(2222)
  },2000)
})
const p3 = new myPromise((resolve,reject)=>{
  setTimeout(()=>{
    resolve(3333)
  },1000)
})

// myPromise.all([p1,p2,p3]).then(res=>{
//   console.log(res);
// },err=>{
//   console.log(err);
// })
// 这里测试race方法
myPromise.race([p1,p2,p3]).then(res=>{
  console.log(res);
},err=>{
  console.log(err);
})
