import { Result, ok, err } from "neverthrow";

test("[combineWithAllErrors] 異常系", () => {
  const result1 = ok(2);
  const result2 = err("my error");
  const result3 = ok("foo");
  const result4 = err("Something went wrong");

  const resultList = [result1, result2, result3, result4];

  const combinedList = Result.combine(resultList);
  // console.log("combinedList:", combinedList);

  const combinedAllErrorsList = Result.combineWithAllErrors(resultList);
  // console.log("combinedAllErrorsList:", combinedAllErrorsList);

  expect(combinedList._unsafeUnwrapErr()).toEqual("my error");
  expect(combinedAllErrorsList._unsafeUnwrapErr()).toEqual([
    "my error",
    "Something went wrong",
  ]);
});
