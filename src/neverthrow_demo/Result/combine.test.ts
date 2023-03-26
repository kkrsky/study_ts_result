import { Result, ok, err } from "neverthrow";

test("[combine] 正常系", () => {
  const result1 = ok(2);
  const result2 = ok("foo");
  const result3 = ok("Something ok");

  const resultList = [result1, result2, result3];

  const combinedList = Result.combine(resultList);

  expect(combinedList.isOk()).toBe(true);
  expect(combinedList.unwrapOr(null)).toEqual([2, "foo", "Something ok"]);
});

test("[combine] 正常系 タプル", () => {
  const result1 = ok(2);
  const result2 = ok("foo");
  const result3 = ok("Something ok");

  const tuple = <T extends any[]>(...args: T): T => args;
  const resultList = tuple(result1, result2, result3);

  const combinedList = Result.combine(resultList);

  expect(combinedList.isOk()).toBe(true);
  expect(combinedList.unwrapOr(null)).toEqual([2, "foo", "Something ok"]);
});

test("[combine] 異常系", () => {
  const result1 = ok(2);
  const result2 = ok("foo");
  const result3 = err("Something went wrong");

  const resultList = [result1, result2, result3];

  const combinedList = Result.combine(resultList);

  expect(combinedList.isOk()).toBe(false);
  expect(combinedList._unsafeUnwrapErr()).toBe("Something went wrong");
});
