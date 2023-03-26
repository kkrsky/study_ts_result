import { setTimeout } from "timers/promises";
import { ok } from "neverthrow";

async function asyncFunction(value: number): Promise<number> {
  await setTimeout(1000);
  return value * 2;
}

async function run() {
  const result = await ok([1, 2, 3])
    .andThen((numArr) => {
      numArr.push(12);
      return ok(numArr);
    })
    .asyncMap(async (numArr) => {
      return await Promise.all(numArr.map((n) => asyncFunction(n)));
    });

  console.log("run", result.unwrapOr(null));
  return result;
}

test("[asyncMap] 正常系", async () => {
  const result = await run();
  expect(result.unwrapOr(null)).toEqual([2, 4, 6, 24]);
});
