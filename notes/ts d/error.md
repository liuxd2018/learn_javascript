```ts
interface Error {
    name: string;
    message: string;
    stack?: string;
}

interface ErrorConstructor {
    new(message?: string): Error;
    (message?: string): Error;
    readonly prototype: Error;
}

declare var Error: ErrorConstructor;

interface EvalError extends Error {
}

interface EvalErrorConstructor extends ErrorConstructor {
    new(message?: string): EvalError;
    (message?: string): EvalError;
    readonly prototype: EvalError;
}

declare var EvalError: EvalErrorConstructor;

interface RangeError extends Error {
}

interface RangeErrorConstructor extends ErrorConstructor {
    new(message?: string): RangeError;
    (message?: string): RangeError;
    readonly prototype: RangeError;
}

declare var RangeError: RangeErrorConstructor;

interface ReferenceError extends Error {
}

interface ReferenceErrorConstructor extends ErrorConstructor {
    new(message?: string): ReferenceError;
    (message?: string): ReferenceError;
    readonly prototype: ReferenceError;
}

declare var ReferenceError: ReferenceErrorConstructor;

interface SyntaxError extends Error {
}

interface SyntaxErrorConstructor extends ErrorConstructor {
    new(message?: string): SyntaxError;
    (message?: string): SyntaxError;
    readonly prototype: SyntaxError;
}

declare var SyntaxError: SyntaxErrorConstructor;

interface TypeError extends Error {
}

interface TypeErrorConstructor extends ErrorConstructor {
    new(message?: string): TypeError;
    (message?: string): TypeError;
    readonly prototype: TypeError;
}

declare var TypeError: TypeErrorConstructor;

interface URIError extends Error {
}

interface URIErrorConstructor extends ErrorConstructor {
    new(message?: string): URIError;
    (message?: string): URIError;
    readonly prototype: URIError;
}

declare var URIError: URIErrorConstructor;
```