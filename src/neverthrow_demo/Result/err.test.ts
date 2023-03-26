import { myResult } from "./err";

test("test err", () => {
  console.log(myResult);

  expect(myResult.isOk()).toBe(false);
  expect(myResult.isErr()).toBe(true);
  expect(myResult).toEqual({ error: "error!" });
  expect(myResult.unwrapOr(null)).toEqual(null);
});
