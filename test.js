/* 1. 查看Promise的原型链上的方法 */
// console.log(new Promise((resolve, reject)=>{resolve()}));


/* 2. 测试我们实现的Promise的效果 */
let Promise = require("./Promise.js");

//    Promise本身可以理解为同步的
new Promise((resolve, reject)=> {
    setTimeout(() => {
        //执行resolve会把之前基于then存放的方法依次执行
        resolve(100);
    }, 1000);
}).then((res) => {
    console.log(1, res);

    return new Promise((resolve, reject)=>{
        reject(res);
    })
}).catch(err => {
    console.log("catch=====>",err);

    return 300;
}).then((res) => {
    console.log(2, res);
})



