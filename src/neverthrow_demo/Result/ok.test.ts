import { myResult } from "./ok";

test("test ok", () => {
  console.log(myResult);

  expect(myResult.isOk()).toBe(true);
  expect(myResult.isErr()).toBe(false);
  expect(myResult.value).toEqual({ myData: "test" });
  expect(myResult.unwrapOr(null)).toEqual({ myData: "test" });
});
