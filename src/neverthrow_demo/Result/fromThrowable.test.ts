import { setTimeout } from "timers/promises";
import { Result, fromThrowable, ok, err } from "neverthrow";

// 同期系
type DivideError = { message: string };
const divideError = (): DivideError => Error("Cannot divide by zero");

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}

const safeDivide = fromThrowable(divide, divideError);

const result2 = safeDivide(6, 0);
console.log(result2); // Err('Cannot divide by zero')

test("[fromThrowable] 同期系 正常系", () => {
  const result1 = safeDivide(6, 2);
  console.log(result1); // Ok(3)

  expect(result1.isOk()).toBe(true);
  expect(result1.unwrapOr(null)).toBe(3);
});

test("[fromThrowable] 同期系 異常系", () => {
  const result2 = safeDivide(6, 0);
  console.log(result2); // Err('Cannot divide by zero')

  expect(result2.isOk()).toBe(false);
  expect(result2._unsafeUnwrapErr()).toEqual(Error("Cannot divide by zero"));
});

// 非同期系 (非同期系はfromThrowableを使えない？ awaitしている間にthrowされたエラーが表に出てきてしまう。)
async function fetchData(isDebug: boolean): Promise<{ data: string }> {
  // 何らかのデータを取得する処理
  await setTimeout(1000);
  if (isDebug === true) return { data: "success fetch data" };
  else throw new Error("Failed to fetch data");
}

type FetchDataError = { message: string };
const fetchDataError = (): FetchDataError => new Error("Cannot fetch data");

const safeFetchData = fromThrowable(fetchData, fetchDataError);

test("[fromThrowable] 非同期系 正常系", async () => {
  // 正常系
  const result = await safeFetchData(true)
    .asyncMap(async (data) => {
      const resData = await data;
      // console.log("safeFetchData:正常系", resData);
      return resData;
    })
    .mapErr((error) => {
      // console.log("safeFetchData:正常系", error);
      return error;
    });

  // result: Ok { value: { data: 'success fetch data' } }
  expect(result.isOk()).toBe(true);
  expect(result.unwrapOr(null)).toEqual({ data: "success fetch data" });
});

// test("[fromThrowable] 非同期系 異常系", async () => {
//   // 異常系
//   const result = await safeFetchData(false)
//     .asyncMap(async (data) => {
//       const resData = await data;
//       // console.log("safeFetchData:異常系", resData);
//       return ok(resData);
//     })
//     .mapErr((error) => {
//       // console.log("safeFetchData:異常系", error);
//       return err(error.message);
//     });

//   // result: Ok { value: { data: 'success fetch data' } }
//   expect(result.isOk()).toBe(false);
//   expect(result._unsafeUnwrapErr).toEqual(Error("Cannot fetch data"));
// });
