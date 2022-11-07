// 1. 무명의 리터럴로 표현이 가능하다.
// 2. 변수나 자료 구조에 저장할 수 있다.
var increase = function (num) {
  return ++num;
};

var decrease = function (num) {
  return --num;
};

var predicates = { increase, decrease };

// 3. 함수의 매개변수에 전달할 수 있다.
function makeCounter(predicate) {
  var num = 0;

  // 4. 반환값으로 사용할 수 있다.
  // 클로저
  return function () {
    num = predicate(num);
    return num;
  };
}

// 서로 다른 렉시컬 환경
var increaser = makeCounter(predicates.increase);
console.log(increaser());
console.log(increaser());

var decreaser = makeCounter(predicates.decrease);
console.log(decreaser());
console.log(decreaser());
