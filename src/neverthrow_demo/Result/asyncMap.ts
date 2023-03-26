import { setTimeout } from "timers/promises";
import { Result, ResultAsync, err, ok } from "neverthrow";

async function asyncFunction(value: number): Promise<number> {
  await setTimeout(1000);
  return value * 2;
}

// function wait(msec: number) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, msec);
//   });
// }

async function run() {
  const result = await ok([1, 2, 3])
    .andThen((numArr) => {
      numArr.push(12);
      return ok(numArr);
    })

    //   .map(async (numArr) => {
    //     console.log("[map]numArr:", numArr);
    //     return numArr.map((n) => asyncFunction(n));
    //   });
    // // result=Ok<Promise<Promise<number>[]>, never>
    // // Promise {[ Promise { 2 }, Promise { 4 }, Promise { 6 }, Promise { 22 } ]}

    .asyncMap(async (numArr) => {
      // console.log("[asyncMap]numArr:", numArr);
      return await Promise.all(numArr.map((n) => asyncFunction(n)));
    });
  // result=Ok<Promise<number>[], never>
  // [ 2, 4, 6, 22 ]

  console.log("run1", result.unwrapOr(null));
}

function run2() {
  const result = ok([1, 2, 3])
    .andThen((numArr) => {
      numArr.push(12);
      return ok(numArr);
    })
    .asyncMap(async (numArr) => {
      return await Promise.all(numArr.map((n) => asyncFunction(n)));
    });

  console.log("run2", result.unwrapOr(null));
}

run();
run2();
