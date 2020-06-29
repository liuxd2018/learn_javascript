# js async
        single value    multiple values
sync    function        generator function(=> Generator<T>)
async   async function  async generator function(=> AsyncGenerator<T>)


object      iterable(iterator) | generator | in-memory datastructures
promise     async iterable(async iterator) | async generator | readable stream IO

func()          for...of
await func()    for await...of

arrow function
async arrow function