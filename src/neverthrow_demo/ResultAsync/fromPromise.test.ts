import { setTimeout } from "timers/promises";
import { ResultAsync } from "neverthrow";

async function asyncDivide(a: number, b: number): Promise<number> {
  await setTimeout(1000);

  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

test("[fromPromise] 正常系", async () => {
  const res = await ResultAsync.fromPromise(
    asyncDivide(6, 2),
    () => new Error("Calculate error")
  );
  // `res` has a type of ResultAsync<number, Error>
  // console.log(res);
  // Ok { value: 4 }

  expect(res.isOk()).toBe(true);
  expect(res.unwrapOr(null)).toBe(3);
});

test("[fromPromise] 異常系", async () => {
  const res = await ResultAsync.fromPromise(
    asyncDivide(6, 0),
    () => new Error("Calculate error")
  );

  console.log("[fromPromise] 異常系:", res);
  expect(res.isOk()).toBe(false);
  expect(res._unsafeUnwrapErr()).toEqual(Error("Calculate error"));
});

test("[fromPromise] 異常系 非同期関数内でthrowされたエラーを利用", async () => {
  const res = await ResultAsync.fromPromise(asyncDivide(6, 0), (e) => e);

  console.log("[fromPromise] 異常系:", res);
  expect(res.isOk()).toBe(false);
  expect(res._unsafeUnwrapErr()).toEqual(Error("Cannot divide by zero"));
  // [Error: Cannot divide by zero]
});
