function norm(list:number[]):number {
    let result = 0;
    for(let i = 0; i < list.length; i++) {
        result += list[i] * list[i]
    }
    return Math.sqrt(result)
}

let l = [3, 4]
console.log(norm(l))



export interface IVec<T> {
    get(index: number): T;
    len(): number;
}

export class Point implements IVec<number> {
    #a: number
    #b: number
    #c: number
    constructor(a: number, b: number, c: number) {
        this.#a = a;
        this.#b = b;
        this.#c = c;
    }
    get(index: number): number {
        if(index > 2 || index < 0) {
            throw new Error('index outof bound');
        } 
        switch (index) {
            case 0:
                return this.#a
            case 1:
                return this.#b
            case 2:
                return this.#c
            default:
                throw new Error("index is not integer");
        }
    }
    len():number {
        return 3;
    }
}

export function norm2(list: IVec<number>): number {
    let result = 0;
    for(let i = 0; i < list.len(); i++) {
        result += list.get(i) * list.get(i)
    }
    return Math.sqrt(result)
}

let p = new Point(1, 2, 2)
console.log(norm2(p))