export const hello = 'h'

export type Hello = 'hello' | 'ni'

export function print(input: Hello): void {
    console.log(input)
}