// let s = "Who Are are you"
// let num = s.split(" ")
// let res = []
// for(let i =0;i<num.length;i++){
//   let j = i+1
//   while(j<num.length && num[i].toLowerCase()===num[j].toLowerCase()){
//     j++
//   }
//   res.push(num[i])
//   i = j - 1
// }
// console.log(res.join(' '));
// let s = "Who are Are you"
// let num = s.split(" ")

// 小明在尝试把一些分子为1的分数（1/x）转化为小数。使用普通计算器的除法功能可以实现，但是保留的小数位数非常有限。而小明希望得到n位小数，而且要从小数点后面第d位开始的n位小数。例如，x=13, d=4, n=3时，1/13=0.07692307692……，从小数点后第四位开始取三位数，答案是923。现在小明想要计算一些数更大的情况（2 <= x <= 10000, 1 <= d <= 1000000000, 1 <= n <= 10000），请你写个程序帮帮他。
let s = "13 11 3"
console.log(1/13);
let x,d,n;
[x,d,n] = s.split(' ')
x = parseInt(x)
d = parseInt(d)
n = parseInt(n)
let long = 0
let c = 1
let m = []
let resNum = 0
if(c<x){
  c = c*10
}
while(long<n+d){
  resNum = Math.floor(c/x)
  m.push(resNum)
  c = (c % x)*10
  long++
}
console.log(m);
// let float = 1/x+""
// let num = float.split(".")
// let len = num[1].length
// while(len<d+n){
//   num[1] = num[1]+'0'
//   len++
// }
let res = m.slice(d-1,d+n-1).join('')
console.log(res);

