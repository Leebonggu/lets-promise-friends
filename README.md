# JS 비동기 처리 <span style="font-size: 10px">(with 김태곤)</span>

## Session 1.비동기 처리란?

### 비동기 왜 사용하나?
- 잘 알려진 사용 예시
  - setTimeout, setInterval ...
  -load, click 등 이벤트 처리
  - 파일 입출력, 네트워크 요청
- 정확한 실행 시점을 알 수 없는 경우, 처리에 시간이 많이 걸리는 동작의 경우에 사용
- 동작 정의를 미리해놓고, 행위가 발생했을 때 정의해놓은 기능을 실행
- 비동기가 어렵게 느껴지는 이유는 절차식 프로그래밍에 익숙하기 때문
  - 코드의 순서가 실행 순서와 일치함
  - 최대한 절차식처럼 보이게 작성하면 이해가 쉬움

### 처리방식1: Callback

- 특정 동작을 실행할 때 실행하는 함수
- 모든 콜백함수가 비동기를 처리하는 것은 아님
- 하지만 비동기 처리를 위해 사용하는 경우가 많음
  - 이벤트 처리, setTimeout, setInterval, Node 파일 입출력, 네트워크 API
- 비동기를 위해 콜백을 하나만 사용하는 것이 아니라, 여러개를 사용함 -> 콜백지옥
- 콜백지옥
  - 여러 비동기 처리에 콜백함수를 사용할 때 발생
  - 코드가 직관적으로 이해하기 어려움
  - 콜백지옥은 10년정도 된 논의
  - 완화방법은 존재 
    - 얼리리턴
    - 콜백으로 사용된 함수를 하나씩 분리
  - 대안으로 등장한 **Promise**

### 처리방식2: Promise

- 비동기 동작의 처리를 담당하는 **객체**
  - 이행(fulfilled), 거부(rejected), 대기(pending) 상태를 비동기 동작을 처리
  - 결정(settled:)  이행(fulfilled), 거부(rejected)
- 성공, 실패에 한 가지 상태가 더 있는 것
  - 성공, 실패, 대기
- 음식 주문 배달 예시
  - 주문을 하면, 비동기 처리의 시작. 즉 대기 상태
  - 음식이 제대로 도착하면 주문 성공
  - 주문이 거부되거나, 배달사고가 나면 주문 실패
- Promise의 가장 큰 장점은 비동기작업이 몇단계가 진행되어도, 플랫하게 처리 가능하다(깊이가 깊어지는것을 막을 수 있음).
  - 연속적은 동작이 많아도 플랫하게 처리 가능
- Promise 객체는 .then, .catch, .finally 파이프라인을 통해 값을 처리


```js
new Promise(resolve, reject) => { ... })
  .then(성공시 콜백, 실패시 콜백)
  .catch(실패시 콜백)  // === .then(undefined, 실패식콜백)
  .finally(성공,실패에 상관없이 반드시실행)
```

- 콜백에서 프로미스를 반환하면, 다음 then에서 처리

```js
fetch()
  .then(res => res.json())
  .then(data => data)
  .catch(err => err)
```

- .catch다음에도 .then 사용가능
- Thenable ?
  - 써드파티 호환성 위함
  - 어떤 객체에 then이 있으면, 프로미스로 처리된다.

- **다중처리**
  - 배열iterable로 전달받은 Promise 객체가 있을 때
    - Promise.any: 먼저 이행된 값
    - Promise.all : 모두 이행
    - Promise.race: 가장 먼저 결정된 값
    - Promise.allSettled: 모두 결정되면 결과 객체 배열이 전달
      - 결과 객체 배열 
        - .status: 이행 혹은 거부(fulfilled or rejected)
        - .value: 이행된 경우에 존재
        - .reason: 거부된 경우에만 존재
- Promisify
  - 호출을 Promise 생성자로 감싸고, resolve, reject를 콜백 안에서 실행. 그밖의 코드는 .then

```js
setTimeout(() => {...}, ms)

new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, ms) 
}).then(...)
```
### 처리방식3: Async/Await

- **Async 함수**: 항상 Promise를 반환하는 함수
  - 내부에서 프로미스 객체를 사용하지 않거나, promise 객체를 리턴하지 않을 경우 사용할 필요 없음
- **Await 연산자**: Promise 상태가 결정될 때까지 대기
  - then이 몇개가 이어지던, 모두 결정될떄가지 대기
  - Await는 비동기 실행 순서를 마치 동기식처럼 제어해서, 이해하기 쉬운 코드가 된다.
- 에러처리의 경우 try, catch를 사용한다.
- await를 만나면 실행을 중단하고, microtask 큐에 넣는다.
  - 비동기로 동작한다는 뜻
  - 다른 함수의 실행이 끼어즐 수 있음
- async 함수 내부 또는 모듈의 탑 레벨(Top-Level)에서만 가능
- async 함수 내부 또는 모듈의 TopLevel에서만 가능

### 비동기 유의사항

- 비동기 함수 간에는 실행 순서가 보장되지 않는다(기본적)
  - 순서보장을 원하면 await
- 벙렬처리는 Promise내부 함수 사용 가능
- 비동기 처리가 필요하면, 최대한 async/await 활용
- 콜백함수라면 Promise화를 고려
- DOM이벤트 핸들러로 async 사용가능

## Session 2. QnA

### Q. 비동기처리는 왜, 어떻게 써야하는가?

```
A. 사용하는 가장 큰 이유는 성능.

정확한 실행시점 알 수 없고, 언제 요청이 들어오는지도 알 수 없다. 그 요청을 기다리느라 프로그램이 아무 동작도 하지 않는다면, 성능적으로 문제가 생김.
```

### Q. 모듈의 Top Level에서 사용 가능하다?

```
A. 모듈의 탑 레벨이다. ESM모듈을 사용했을 때의 경우를 말함. 탑 레벨은 아무런 함수에도 포함되지 않은 경우를 뜻함.
```

### Q. 실패시 재요청 및 해결방법

```
A. 정의하기 나름. 

실패했을 때 어떻게 처리할 것인지는 프로그램마다 다름. 스킬이라기보다는 정책의 문제.
다 보여줄것인가? 실패한 것들만 보여줄 것인가?
```

### Q. 마이크로 태스트 큐 & 블록킹

```
A. 각 태스크가 한 호흡에 실행된다고 보면 된다.
```

## Session 3. 실습
## Session 4. QnA

### Q. 사용꿀팁

```
A. 기능별로 async 함수를 만들어 놓고, 관리하면 편하다.
```

### Q. 에러핸들링

```
A. 가능한 범위를 좁게 만들어서 처리하는게 좋다.
```

### Q. 비동기코드, 개발시 원칙

```
A. 혼자 작업할 때는 막 작업한다.
다른 사람과 협업할 때, 신경써야할 것이 많다.
클린코드의 개념도 사람마다, 조직마다 다르다.

코드에 의도가 들어나느게 좋다.
가능한 함수, 모듈은 한가지 일만 하는게 좋다.
```


### Q. 좋은 프론트엔드 개발자?

```
A. (본인피셜)

사용자를 고려하는 개발을 한다.
프론트엔드 개발자는 2가지 파트이다.
프론트엔드와 개발자.
코드레벨에서 더 좋은 개발을 할 수 있을까 고민하는 사람이 있고,
유저와 만나는 부분에 더 고민하는 사람이 있다.

근데, 분리해서 보지말고 둘 다 관심갖는 사람이 되면 좋지 않을까?

===> 요약 UX에도 관심을...
```