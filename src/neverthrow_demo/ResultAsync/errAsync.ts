import { errAsync } from "neverthrow";

const myResultAsync = errAsync(new Error("something error"));

async function run() {
  const myResult = await myResultAsync; // instance of `Err`

  myResult.isOk(); // false
  myResult.isErr(); // true
}

run();
