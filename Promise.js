// 首先，Promise是一个类
class Promise {
    constructor(callbackFn) {
        this.status = "pending"; //状态
        this.value = null;  //Promise返回的值，给到then，then的参数可以接收到
        this.fulfillAry = [];  //Promise resolve时的回调函数集
        this.errorCallback = [];    //Promise reject时的回调函数集

        let resolve = result => {
            // 异步执行所有的回调函数
            let timer = setTimeout(() => {
                clearTimeout(timer);
                // 这个是为了只能有一种情况执行，resolve()和reject()
                if (this.status !== "pending") return;
                this.status = "resolved";
                // 这个值有可能是一个静态值也有可能是一个Promise
                this.value = result;
                // 把当前这个值传到then作为参数
                this.fulfillAry.forEach(item => item(this.value));
            }, 0)
        }

        let reject = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== "pending") return;
                this.status = "rejected";
                this.value = reason;
                this.errorCallback.forEach(item => item(this.value));
            }, 0)
        }

        try {
            callbackFn(resolve, reject);
        } catch (err) {
            rejectFn(err);
        }
        
    }


    //执行完成excutor紧接着执行then，执行then方法，会把传递的回调函数放到执行的区域中，等待触发执行
    then(fulfillCallback, rejectCallback) {

        // 如果不是函数，只是一个值传递，我们就直接把值往下传递下去
        typeof fulfillCallback !== "function" ? fulfillCallback = result => result : null;
        if (typeof rejectCallback !== "function") {
            rejectCallback = reason => {
                throw new Error(reason instanceof Error ? reason.message : reason);
            }
        }

        // 如果then的参数是回调函数，这里返回的一个Promise是为了链式调用
        return new Promise((resolve, reject) => {
            this.fulfillAry.push(() => {
                try {
                    let x = fulfillCallback(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            })

            this.errorCallback.push(() => {
                try {
                    let x = rejectCallback(this.value);
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }

    catch(rejectCallback) {
        return this.then(null, rejectCallback);
    }
}

module.exports = Promise;