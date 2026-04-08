function fibonacci(n) {
    let a = 0, b = 1, next;
    console.log(a);
    console.log(b);
    next = a + b;
    while(next <= n) {
        console.log(next);
        a = b;
        b = next;
        next = a + b;
    }
}
fibonacci(10);