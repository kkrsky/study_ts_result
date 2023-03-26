import { resultArray } from "./mapErr";

test("test mapErr failed", () => {
  const newResult = resultArray(["hello", "world"]).mapErr((err: Error) => {
    console.log("mapErr:", err);
    // Errorデータを書き換え
    return err;
  });

  console.log("isOk:", newResult.isOk());
  console.log("isErr:", newResult.isErr());
  console.log(newResult);
  // console.log("_unsafeUnwrap", newResult._unsafeUnwrap());
  // console.log("_unsafeUnwrapErr", newResult._unsafeUnwrapErr());

  expect(newResult.isOk()).toBe(false);
  expect(newResult).toEqual({ error: Error("arr.length <=2") });
});

test("test mapErr pass", () => {
  const newResult = resultArray(["hello", "world", "!"]).mapErr(
    (err: Error) => {
      // エラーデータがないので何もなし。
      console.log("mapErr:", err);
      return err;
    }
  );

  console.log("isOk:", newResult.isOk());
  console.log("isErr:", newResult.isErr());
  console.log(newResult);

  expect(newResult.isOk()).toBe(true);
  expect(newResult.unwrapOr(null)).toEqual(["hello", "world", "!"]);
});
