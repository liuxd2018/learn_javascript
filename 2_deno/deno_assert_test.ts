import { assert, assertEquals, assertArrayContains } from "https://deno.land/std/testing/asserts.ts";

Deno.test("Hello Test", () => {
  assert("Hello");
  assertEquals({a: 1}, {a: 1,})

  let arr = [{a: 1}, {a: 1, b: 'b'}]
  assertArrayContains(arr, [{a: 1, b: 'b'}])

  assert('')
});