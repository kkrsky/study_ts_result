import { andThen } from "./andThen";
import { err, ok, Result } from "./result";

const DataIsStringError = {
  type: "DataIsStringError",
} as const;
type DataIsStringError = typeof DataIsStringError;

const validFunc = (
  data: string | number
): Result<string, DataIsStringError> => {
  if (typeof data === "string") {
    return err(DataIsStringError);
  }

  return ok(`data is ${data}`);
};

test("1ウェイトラック関数", () => {
  const input = 5;
  const result = validFunc(input);

  expect(result.ok).toBe(true);
});

test("[成功ケース] andThen関数で、1ウェイトラック関数を2ウェイトラック関数に変換する", () => {
  const twoTrackValidFunc = andThen(validFunc);

  const input = ok(5);
  const result = twoTrackValidFunc(input);

  expect(result.ok).toBe(true);
  // expect(result.value).toBe("data is 5");
});

test("[失敗ケース] andThen関数で、1ウェイトラック関数を2ウェイトラック関数に変換する", () => {
  const twoTrackValidFunc = andThen(validFunc);

  const input = ok("hello");
  const result = twoTrackValidFunc(input);

  expect(result.ok).toBe(false);
  // expect(result).toEqual({ type: "DataIsStringError" });
});
