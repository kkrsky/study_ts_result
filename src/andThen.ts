import { Result, isErr } from "./result";
type AndThen = <Before, After, E>(
  fn: (before: Before) => Result<After, E>
) => <F>(input: Result<Before, F>) => Result<After, E | F>;

export const andThen: AndThen = (fn) => (input) => {
  if (isErr(input)) return input;

  return fn(input.value);
};
