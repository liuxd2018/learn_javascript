class A {
    readonly name: string
    constructor(name: string) {
        this.name = name
    }
   
}

const a  = new A('a')

console.log(a.name)
console.log(Object.getOwnPropertyDescriptors(a))