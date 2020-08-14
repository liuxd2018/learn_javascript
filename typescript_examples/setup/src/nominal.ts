// // type PersonId = number & {_type?: 'PersonId'}
// // type BlogPostId = number & {_type?: 'BlogPostId'}

// // let personId: PersonId = 12
// // let blogPostId: BlogPostId = 13

// // personId + blogPostId // works
// // personId = blogPostId // error

// // type Branding<T> = {
// //     _type? : T
// // }
// // type Brand<T, BrandTag> = T & Branding<BrandTag>

// // type PersonId = Brand<number, 'PersonId'>

// interface Person {
//   firstName: string;
//   lastName: string;
//   hello(): string;
// }

// function greeter(person: Person) {
//   return `Hello, ${person.firstName} ${person.lastName}`;
// }
// // implements will make sure your class compatible with the interface specified
// class Student implements Person {
//   // firstName: string;
//   // lastName: string;
//   fullName: string;
//   constructor(
//     public firstName: string,
//     middleInitial: string,
//     public lastName: string
//   ) {
//     this.fullName = `${firstName} ${middleInitial} ${lastName}`;
//     // this.firstName = firstName
//     // this.lastName = lastName
//   }

//   hello(name: string) {
//       return `hello ${name}`
//   }
// }

// type tt = typeof Student

// let user1 = { firstName: 'Jane', lastName: 'User' };
// let user2 = new Student('Jane', 'M.', 'User');

// greeter(user1);
// greeter(user2);

// type ini = {
//     // lastName: string;
//     [k in 'id' | 'name']: string;
// }

// type keys = keyof any

// let a: number = 1

// a = '1' as any

// function f(a:string[], i: number): string {
//     return a[i];
// }

// function f1(a:string | null): string  {
//     let y =a
//     if(y) {
//         y
//         a
//     }
// }

// function f2() {
//     let x: string;
//     function g() {
//         x = 's'
//     }
//     g()
//     let y: number = x;
// }
