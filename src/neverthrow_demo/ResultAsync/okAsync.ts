import { okAsync } from "neverthrow";

const myResultAsync = okAsync({ myData: "test" }); // instance of `ResultAsync`

async function run() {
  const myResult = await myResultAsync; // instance of `Ok`

  myResult.isOk(); // true
  myResult.isErr(); // false

  console.log(myResult);
}

run();
