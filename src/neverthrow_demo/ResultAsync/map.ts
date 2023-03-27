import { setTimeout } from "timers/promises";
import { Result, ok, err, ResultAsync, okAsync, errAsync } from "neverthrow";


async function asyncDivide(a: number, b: number): Promise<number> {
  await setTimeout(1000);

  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

function resultNumArray(arr: number[]): ResultAsync<number[], Error> {
  if (arr.length > 2) {
    return okAsync(arr);
  }

  return errAsync(Error("arr.length <=2"));
}

const baseNumArray = [1, 2, 3, 4, 5];
const halfNumArray = resultNumArray(baseNumArray).map(async (numArr) => {
  return await Promise.all(
    numArr.map(async (num) => {
      return await asyncDivide(num, 2);
    })
  );
});

halfNumArray.then((halfNumArr) => {
  if (halfNumArr.isErr()) {
    console.log("error:", halfNumArr.error);
  } else {
    console.log(baseNumArray, "->", halfNumArr.value);
  }
});
