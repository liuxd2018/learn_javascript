function fibonacci(n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}

function makeFibFunc() {
    let memo = [0, 1]
    function fib(n) {
        let result = memo[n]
        if(typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2)
            memo[n] = result
        }
        return result
    }
    return fib
}

const fib = makeFibFunc();


// cleverly used __closure__, to remember the result of call the function

// you can use a immediately invoke function

const fib = (() => {
    let memo = [0, 1]
    // use function declaration, to give `fib.name` a value 
    return function fib(n) {
        let result = memo[n]
        if(typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2)
            memo[n] = result
        }
        return result
    }
})()