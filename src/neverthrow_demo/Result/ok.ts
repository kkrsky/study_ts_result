import { ok } from "neverthrow";

export const myResult = ok({ myData: "test" }); // instance of `Ok`

myResult.isOk(); // true
myResult.isErr(); // false
