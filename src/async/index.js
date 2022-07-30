const fnAsync = () => {
    return new Promise((resolve, reject) => {
        (true)
            ? setTimeout(() => resolve('Async done!'), 2000)
            : reject(new Error('Test error'))
    });
};

const anotherFn = async () => {
    const something = await fnAsync();
    console.log(something);
    console.log('Hello');
}

console.log('Before');
anotherFn();
console.log('After');