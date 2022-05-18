// var uniquePaths = function(m, n) {
//   let dp = new Array(m).fill(0).map(()=>Array(n).fill(0))
//     // 给最边缘都赋值1，因为这些属于起始地，到这些地方都是累计1
//     for(let i = 0;i<m;i++){
//         dp[i][0] = 1
//     }
//     for(let i = 0;i<n;i++){
//         dp[0][i] = 1
//     }
//     for(let i = 1;i<m;i++){
//         for(let j= 1;j<n;j++){
//             dp[i][j] = dp[i-1][j]+dp[i][j-1]
//         }
//     }
//     return dp[m-1][n-1]
// };
// uniquePaths(3,7)

// 1.找到每次减值时，数组中的最大值 
// 2.直到不能减
// let nums = [0,2,1]
// let getMax = function(nums){
//   let len = nums.length
//   let max = nums[0]
//   let index = 0
//   for(let i =0;i<len;i++){
//     if(max<nums[i]) {
//       max = nums[i]
//       index = i
//     }
//   }
//   return index
// }
// function minMax( nums ,  k ,  x ) {
//   // write code here
//   while(x--){
//     let maxIndex = getMax(nums)
//     nums[maxIndex] = nums[maxIndex]-k
//   }
//   console.log(nums[getMax(nums)])
// }
// minMax(nums,1,2)

function numsOfStrings( n ,  k ) {
  // write code here
  let res = 26
  while(--k){
    res = res*(res-1)
  }
  return res
}
numsOfStrings(2,1)