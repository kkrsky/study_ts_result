import { setTimeout } from "timers/promises";
import { Result, ok, err, ResultAsync, okAsync, errAsync } from "neverthrow";

async function asyncDivide(a: number, b: number): Promise<number> {
  await setTimeout(1000);

  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

function resultNumArray(arr: number[]): ResultAsync<number[], Error> {
  if (arr.length > 2) {
    return okAsync(arr);
  }

  return errAsync(new Error("arr.length <=2"));
}

test("[map] 正常系", async () => {
  const baseNumArray = [1, 2, 3, 4, 5];
  const halfNumArray = resultNumArray(baseNumArray).map(async (numArr) => {
    return await Promise.all(
      numArr.map(async (num) => {
        return await asyncDivide(num, 2);
      })
    );
  });

  const result = await halfNumArray;

  expect(result.isOk()).toBe(true);
  expect(result.unwrapOr(null)).toEqual([0.5, 1, 1.5, 2, 2.5]);
});

test("[map] 異常系", async () => {
  const baseNumArray = [1, 2];
  const halfNumArray = resultNumArray(baseNumArray).map(async (numArr) => {
    return await Promise.all(
      numArr.map(async (num) => {
        return await asyncDivide(num, 2);
      })
    );
  });

  const result = await halfNumArray;

  expect(result.isOk()).toBe(false);
  expect(result._unsafeUnwrapErr()).toEqual(Error("arr.length <=2"));
});
