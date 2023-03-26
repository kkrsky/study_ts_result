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

const result = ok(96)
  .andThen(itsUnder100)
  .andThen(itsEven)
  .andThen(itsPositive);

result.match(
  (n) => console.log(n),
  (e) => console.log(e.message)
);
