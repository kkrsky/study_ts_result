import { okAsync } from "neverthrow";

const myResultAsync = okAsync({ myData: "test" }); // instance of `ResultAsync`

test("[okAsync] 正常系", async () => {
  const myResult = await myResultAsync; // instance of `Ok`

  expect(myResult.isOk()).toBe(true);
});
