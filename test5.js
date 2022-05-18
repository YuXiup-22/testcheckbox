
function jqueryUrl(url){
  //将地址从"？"位置分割成两部分
  var arr = url.split('?');
  //取地址右边参数部分从"&"位置继续分割，成为单独参数列表
  var params = arr[1].split('&'); //得到[a=1,b=2,c=3]
  //定义一个空对象
  var obj = {};
  for(var i=0;i<params.length;i++){
      var param = params[i].split('='); //得到[a,1]、[b,2]、[c,3]
      obj[param[0]] = param[1]; //为对象赋值
  }
  return obj;
}
var url = "http://www.baidu.com?a=1&b=2&c=3";
console.log(jqueryUrl(url));