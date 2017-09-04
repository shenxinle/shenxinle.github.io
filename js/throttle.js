/**
* 节流函数
* 对于 resize、scroll这种连续触发的事件（每隔几十毫秒)，通过节流函数降低回调的执行频率
*/
var throttle = function (fn, delay, atleast) {
  var timer, previous;

  return function () {
    var now = +new Date();

    if (!previous) previous = now;
    if (now - previous >= atleast) {
      fn();
      previous = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn();
      }, delay);
    }
  }
}

// test
var begin = +new Date();
window.addEventListener('scroll', throttle(function () {
  console.log(+new Date() - begin);
}, 100, 200), false);