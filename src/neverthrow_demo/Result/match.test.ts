import { Result, err, ok } from "neverthrow";

// https://speakerdeck.com/naoya/typescript-niyoru-graphql-batukuendokai-fa?slide=48
function itsUnder100(n: number): Result<number, Error> {
  return n <= 100 ? ok(n) : err(new Error("Number is over 100"));
}

function itsEven(n: number): Result<number, Error> {
  return n % 2 === 0 ? ok(n) : err(new Error("Number is odd"));
}

function itsPositive(n: number): Result<number, Error> {
  return n >= 0 ? ok(n) : err(new Error("Number is negative"));
}

test("test match", () => {
  // 正常系
  const result = ok(96)
    .andThen(itsUnder100)
    .andThen(itsEven)
    .andThen(itsPositive);

  result.match(
    (n) => console.log(n),
    (e) => console.log(e.message)
  );

  // 上記のmatch関数と同じ挙動。
  result.map(console.log).mapErr(console.log);

  expect(result.unwrapOr(null)).toBe(96);

  // 異常系
  const result2 = ok(101)
    .andThen(itsUnder100)
    .andThen(itsEven)
    .andThen(itsPositive);

  result2.match(
    (n) => console.log(n),
    (e) => console.log(e.message)
  );

  expect(result2._unsafeUnwrapErr()).toEqual(Error("Number is over 100"));
});
