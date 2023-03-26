import { setTimeout } from "timers/promises";
import { Result, ResultAsync, err, errAsync, ok, okAsync } from "neverthrow";

// 使い方がわからないので、あきらめ。

const sq = (n: number): Result<number, number> => ok(n ** 2);

async function asyncFunction(
  num: number
): Promise<ResultAsync<number, string>> {
  await setTimeout(1000);
  if (num === 0) return errAsync("err");
  return okAsync(num ** 2);
}

// function asyncFunction2(num: number) {
//   return okAsync(async () => {
//     await setTimeout(1000);
//     return num ** 2;
//   });
// }

// ok(2).andThen(asyncFunction).andThen(asyncFunction); // Ok(16)
// ok(2).asyncAndThen(asyncFunction); // Ok(16)
ok(2)
  // .asyncAndThen(asyncFunction)
  .asyncAndThen((val) => {
    console.log("asyncAndThen", val);
    return okAsync(val);
  })

  .andThen((val) => {
    console.log("andThen:", val);
    return okAsync(val);
  }); // Ok(16)

// ok(2)
//   .asyncAndThen(async (value) => {
//     console.log(`value: ${value}`);
//     const res=await asyncFunction(value)
//     // return okAsync(res.unwrapOr(null))
//     // return okAsync(value * 2);
//   })

//   .andThen((value) => {
//     console.log(`value: ${value}`);
//     return ok(value * 2);
//   })
//   .map((value) => {
//     console.log(`final value: ${value}`);
//     return value;
//   });
