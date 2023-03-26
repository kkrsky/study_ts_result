import { err } from "neverthrow";

export const myResult = err("error!"); // instance of `Err`

myResult.isOk(); // false
myResult.isErr(); // true
