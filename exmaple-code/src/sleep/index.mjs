/**
 * setTimeout 대신 Promise 기반 sleep 함수
 */

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(()=> {
      resolve()
    } , ms)
  })
}

console.log(10);
await sleep(3000)
console.log(20)