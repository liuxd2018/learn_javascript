async function hello(str:string): Promise<string> {
    return str;
}

let s = await hello('h')

console.log(s)

const a = 'a'

const func = () => {
    const a = 'b'
    console.log(a)
}

func();

console.log(import.meta.url)
console.log(Deno.cwd()) // require --allow-read