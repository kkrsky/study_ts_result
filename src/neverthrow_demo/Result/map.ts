import { Result, err, ok } from "neverthrow";

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return err("division by zero");
  } else {
    return ok(a / b);
  }
}

export function resultArray(arr: string[]): Result<string[], Error> {
  if (arr.length > 2) {
    return ok(arr);
  }

  return err(Error("arr.length <=2"));
}
