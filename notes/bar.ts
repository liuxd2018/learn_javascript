export interface Options {
    name :string
}

export function doThing(options: Options) {
    console.log(options.name)
}