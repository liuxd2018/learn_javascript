// function norm(numbers:number[]): number {
//     let result = 0;
//     for(const number of numbers) {
//         result += number * number
//     }
//     return Math.sqrt(result);
// }



function norm<T extends number>(numbers:ReadonlyArray<T>) {
    let result = 0;
    for(const number of numbers) {
        result += number * number
    }
    return Math.sqrt(result);
}

const numbers = [3, 4]
console.log(norm(numbers))