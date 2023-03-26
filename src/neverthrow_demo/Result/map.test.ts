import { resultArray } from "./map";

test("test map failed", () => {
  const newResult = resultArray(["hello", "world"]).map((arr: Array<string>) =>
    arr.map((item) => {
      return item + "taro";
    })
  );

  console.log("isOk:", newResult.isOk());
  console.log("isErr:", newResult.isErr());
  console.log(newResult);
  // console.log("_unsafeUnwrap", newResult._unsafeUnwrap());
  // console.log("_unsafeUnwrapErr", newResult._unsafeUnwrapErr());

  expect(newResult.isOk()).toBe(false);
  expect(newResult).toEqual({ error: Error("arr.length <=2") });
});

test("test map pass", () => {
  const newResult = resultArray(["hello", "world", "!"]).map(
    (arr: Array<string>) =>
      arr.map((item) => {
        return item + "taro";
      })
  );

  console.log("isOk:", newResult.isOk());
  console.log("isErr:", newResult.isErr());
  console.log(newResult);

  expect(newResult.isOk()).toBe(true);
  expect(newResult.unwrapOr(null)).toEqual(["hellotaro", "worldtaro", "!taro"]);
});
