function* ge(): Generator<number> {
    yield 1;
    yield 2;
    yield 3;
}

function* ge2(): Generator<number | string> {
    yield* ge()
    // return 2
    throw "h";
    

    yield "hello world";
}
try {
    for await(const v of ge2()) {
        console.log(v);
    }
} catch (error) {
    console.log(error + '++')
}
