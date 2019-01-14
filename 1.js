const promise1 = new Promise((resolve, reject) => {resolve(100)});
const promise2 = new Promise((resolve, reject) => {resolve(100)});
console.log(promise1 === promise2);


/* 题目1 */
console.log(1);
new Promise((resolve, reject) => {

    console.log(2);
    resolve();
}).then(() => {
    console.log(3);
});
console.log(4);


/* 题目2 */
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});

console.log('script end');
