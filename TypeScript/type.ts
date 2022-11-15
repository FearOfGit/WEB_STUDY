// string, number, boolean
// 문자열 - 25, Infinity, NaN - true, false
// typeof -> 타입을 반환해준다.
console.log(typeof '');
console.log(typeof NaN);
console.log(typeof 5);
console.log(typeof true);

// 타입을 적지 않아도 타입 추론이 된다.
let value: string = 'hello world';

// object
// key, value
// 인터페이스로 객체 타입을 지정할 수 있다.
interface PersonType {
  name: string;
  age: number;
  isStudent: boolean;
  phone?: string;
}
const person: PersonType = {
  name: 'park',
  age: 20,
  isStudent: true,
};
const getPersonAge = (person: PersonType) => {
  console.log(person.age);
};

// array, Tuple, Enum
// Array<string> 제네릭 방식
const array1: string[] = ['a', 'b', 'c'];
// 유니온 타입
const array2: (string | number)[] = ['a', 10, 'b'];
console.log(typeof array1); // object, 자바스크립트에서 배열은 객체이다.
let user: [string, number, boolean] = ['hello', 10, true]; // 길이와 인덱스의 타입이 정해져 있다.
enum BloodType {
  A = 100,
  B = 200,
  O = 300,
  AB,
}
const myBloodType = BloodType.AB;
console.log(myBloodType); // 301

// any, void, never
let value2: any = 5;
value2 = 'hello';
value2 = true;
value2 = [1, 2];
value2 = {};
function print(): void {
  console.log('출력..');
}
let value3: never;
// value3 = undefined;
// value3 = null;
// value3 = 'hello';
// value3 = 5;
const someFunc = () => {
  throw new Error(); // never
  // 또는 무한 루프
};

// null, undefined
let value4: string = 'hello';
// value4 = null;
// value4 = undefined;
const loggedInUsername: string = 'Park';
const users = [
  { name: 'kim', age: 20 },
  { name: 'Hong', age: 25 },
];
const loggedInUser = users.find((u) => u.name === loggedInUsername);
console.log(loggedInUser?.age);

//symbol
// 3개는 각각 모두 다른 값
// symbol은 생성될 때마다 유니크한 값이다.
// 따라서 키끼리 충돌할 일이 없다.
let sym1 = Symbol();
let obj = {
  name: 'Park',
  [sym1]: 'value',
};
console.log(obj[sym1]);
let sym2 = Symbol('desc1');
let sym3 = Symbol('desc2');
console.log(typeof sym1); // symbol
console.log(sym2 === sym3); // false

// unknown
function f1(a: any) {
  a.toUpperCase(); // 오류가 발생하지 않는다. 정상 작동을 보장하지 않는다.
}
function f2(a: unknown) {
  if (typeof a === 'string') {
    return a.toUpperCase();
  } else {
    return '문자열이 아니다.';
  }
}
