import * as base64 from "https://deno.land/x/base64/base64url.ts";

const b64: string = base64.fromUint8Array(new TextEncoder().encode("this is too much, 我么的世纪, If you need a URL and file name safe base64 variant"));
const buf: Uint8Array = base64.toUint8Array(b64);

console.log(b64);