import { setTimeout } from "timers/promises";
import { ResultAsync } from "neverthrow";

async function asyncDivide(a: number, b: number): Promise<number> {
  await setTimeout(1000);

  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

async function run() {
  const res = await ResultAsync.fromPromise(
    asyncDivide(6, 2),
    () => new Error("Database error")
  );
  // `res` has a type of ResultAsync<number, Error>
  console.log(res);
  // Ok { value: 3 }
}

run();
