import { errAsync } from "neverthrow";

const myResultAsync = errAsync(new Error("something error"));

test("[okAsync] 異常系", async () => {
  const myResult = await myResultAsync; // instance of `Ok`

  expect(myResult.isOk()).toBe(false);
  expect(myResult._unsafeUnwrapErr()).toEqual(Error("something error"));
});
