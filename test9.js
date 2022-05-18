// let s = 'RUL'
// let num = s.split('')
// let x=0,y = 0
// for(let i = 0;i<num.length;i++){
//   if(num[i]==='R'){
//     x++
//     continue
//   }
//   if(num[i]==='L'){
//     x--
//     continue
//   }
//   if(num[i]==='U'){
//     y++
//     continue
//   }
//   if(num[i]==='D'){
//     y--
//     continue
//   }
// }
// console.log(`(${x},${y})`)
let n = 5,k = 1
let num = [1,2,3,4,5]
let count = 0
let res = 0
let temp = 1

for(let i = 0;i<n;i++){
  res = num[i]
  let cur = []
  cur.push(num[i])
  j = i+1
  while(j<n){
    // 和的累加
    while(--k){
      j = j + temp
      res = res + num[j]
    }
    // 累加完判断是否为偶数
    if(res%2===0){
      count++
    }
    j++
    temp++
  }
  while(k--){
    for(let j = i+1;j<k;j++){
      res = res + num[i]
    }
  }
  if(res%2===0){
    count++
  }

}