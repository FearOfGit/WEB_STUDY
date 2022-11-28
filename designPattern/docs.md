# 디자인 패턴 in JavaScript

> 소프트웨어 설계의 주어진 컨텍스트 내에서 일반적으로 발생하는 문제에 대한 일반적이고 재사용 가능한 솔루션입니다. 소스나 기계어로 직접 변환할 수 있는 완성된 디자인이 아닙니다. 오히려 다양한 상황에서 사용할 수 있는 문제를 해결하는 방법에 대한 설명 또는 템플릿입니다. 디자인 패턴은 프로그래머가 응용 프로그램이나 시스템을 디자인할 때 일반적인 문제를 해결하는 데 사용할 수 있는 공식화된 모범 사례입니다.

## 생성 디자인(Creational Design)

### 생성자 / 빌더 패턴(Constructor / Builder Pattern)

- 복잡한 오브젝트의 구성(construction)을 해당 표현과 분리하여 동일한 구성 프로세스를 통해 다양한 표현을 생성할 수 있다.

```js
class Person {
  constructor(name, age, mother) {
    this.name = name;
    this.age = age;
    this.mother = mother;
  }
}

const park = new Person('park', 27, null);
const kim = new Person('kim', 60, null);
const granma = new Person('hong', 90, null);

park.mother = kim;
kim.mother = granma;
```

### Factory Pattern

- 단일 오브젝트를 만들기 위한 인터페이스를 정의하지만 서브 클래스가 인스턴스화(instantiate)할 클래스를 결정하도록 한다. 팩토리 메서드를 사용하면 클래스가 서브 클래스에 대한 인스턴스화(instantiation)를 연기할 수 있다.

- 적절한 오브젝트를 반환하기 위해 다양한 인수를 사용할 수 있는 단일 함수를 설정하는 패턴이다.

```js
function animalFactory() {
  this.createAnimal = function (animalType) {
    let animal;

    switch (animalType) {
      case 'dog':
        animal = new Dog();
        break;
      case 'cat':
        animal = new Cat();
        break;
      case 'horse':
        animal = new Horse();
        break;
      default:
        animal = new Monkey();
        break;
    }

    return animal;
  };
}

const Dog = function () {
  this.makeSound = () => {
    console.log('woof woof!');
  };
};

const Cat = function () {
  this.makeSound = () => {
    console.log('prrr prrr meow!');
  };
};

const Horse = function () {
  this.makeSound = () => {
    console.log('neeeighhh!');
  };
};

const Monkey = function () {
  this.makeSound = () => {
    console.log('ooooh ahh oooh oooh!');
  };
};

const factory = new animalFactory();

const jojo = factory.createAnimal('dog');
jojo.makeSound();

const smokey = factory.createAnimal('cat');
smokey.makeSound();

const princess = factory.createAnimal('horse');
princess.makeSound();

const kong = factory.createAnimal('monkey');
kong.makeSound();
```

### Prototype Pattern

- 프로토타입 인스턴스를 사용하여 생성할 오브젝트의 종류를 지정하고 기존 오브젝트의 ‘뼈대(skeleton)’에서 새 오브젝트를 생성하여 성능을 높이고 메모리 공간(footprints)을 최소화합니다.

```js
const macBook = {
  color: 'silver',
  turnOn() {
    console.log('turning on...');
  },
  turnOff() {
    console.log('turning off...');
  },
};

const myComputer = Object.create(macBook, { owner: { value: 'Tim' } });
console.log(myComputer.__proto__ === macBook); //true

const newComputer = { ...macBook, owner: 'John' };
console.log(newComputer.__proto__ === macBook); //false

macBook.power = 'USB-C';
console.log(myComputer.power); //'USB-C'
console.log(newComputer.power); //undefined
```

### Singleton Pattern

- 클래스에 인스턴스가 하나만 있는지 확인하고 이에 대한 전역 액세스 포인트를 제공합니다.
- 다른 인스턴스를 만드려고 시도하면 이미 존재하는 참조(reference)를 반환합니다.

```js
const Database = (function () {
  let instance;

  function createDatabaseInstance() {
    return new Object('Database Instance');
  }

  function getDatabaseInstance() {
    if (!instance) {
      instance = createDatabaseInstance();
    }

    return instance;
  }

  return { getDatabaseInstance };
})();

const databaseInstance1 = Database.getDatabaseInstance();
const databaseInstance2 = Database.getDatabaseInstance();

console.log(databaseInstance1 === databaseInstance2); // true
```

## 구조 디자인(Structural Design)

### Adapter Pattern / Wrapper Pattern

- 클래스의 인터페이스를 클라이언트가 기대하는 다른 인터페이스로 변환합니다. 어댑터를 사용하면 호환되지 않는 인터페이스로 인해 할 수 없었던 클래스가 함께 작동할 수 있습니다.

### Composite Pattern

- 오브젝트를 트리 구조로 구성하여 부분-전체(part-whole) 계층 구조를 나타냅니다. 컴포짓을 사용하면 클라이언트가 개별 오브젝트와 오브젝트 컴포지션을 균일하게 처리할 수 있습니다.

- 트리 구조

### Module Pattern

- 전역적으로 사용되는 클래스, 싱글톤, 메서드와 같은 여러 관련 요소를 단일 개념 엔터티로 그룹화합니다.

### Decorator Pattern

- 동일한 인터페이스를 동적으로 유지하는 오브젝트에 추가 책임을 부여합니다. 데코레이터는 기능 확장을 위해 서브클래싱에 대한 유연한 대안을 제공합니다.
