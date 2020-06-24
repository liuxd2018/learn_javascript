import {html, render} from 'https://unpkg.com/lit-html?module';

const myTmpl = (name) => html`<p>Hello ${name}</p>`;

console.log(render(myTmpl('World')))