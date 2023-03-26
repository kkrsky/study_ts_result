import { Result, err, ok } from "neverthrow";

const sq = (n: number): Result<number, number> => ok(n ** 2);

test("test andThen", () => {
  expect(ok(2).andThen(sq).andThen(sq)._unsafeUnwrap()).toBe(16);
  expect(ok(2).andThen(sq).andThen(err)._unsafeUnwrapErr()).toBe(4); // Err(4)
  expect(ok(2).andThen(err).andThen(sq)._unsafeUnwrapErr()).toBe(2); // Err(2)
  expect(err(3).andThen(sq).andThen(sq)._unsafeUnwrapErr()).toBe(3); // Err(3)
});
