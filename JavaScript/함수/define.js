// function square(number) {
//   return number * number;
// }

// var square = function square(number) {
//   return number * number;
// };

// 기명 함수 표현식
var foo = function multiply(a, b) {
  return a * b;
};

// 익명 함수 표현식
var bar = function (a, b) {
  return a * b;
};

// console.log(foo(10, 5));
// console.log(multiply(10, 5)); 에러 발생

console.dir(Function.prototype.constructor);

var square = new Function('number', 'return number * number');
console.log(square(10));
