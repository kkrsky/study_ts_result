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

const result1 = safeDivide(6, 2);
console.log(result1); // Ok(3)

const result2 = safeDivide(6, 0);
console.log(result2); // Err('Cannot divide by zero')

// 非同期系 (非同期系はfromThrowableを使えない？)
async function fetchData(isDebug: boolean): Promise<{ data: string }> {
  // 何らかのデータを取得する処理
  await setTimeout(1000);
  if (isDebug === true) return { data: "success fetch data" };
  // else return { data: "test" };
  else throw new Error("Failed to fetch data");
}

type FetchDataError = { message: string };
const fetchDataError = (): FetchDataError => Error("Cannot fetch data");

// const safeFetchData = fromThrowable(async (isDebug) => {
//   return await fetchData(isDebug);
// }, fetchDataError);

const safeFetchData = fromThrowable(fetchData, fetchDataError);
// 正常系

safeFetchData(true)
  .asyncMap(async (data) => {
    const resData = await data;
    console.log("safeFetchData:正常系", resData);
    return resData;
  })
  .mapErr((error) => {
    console.log("safeFetchData:正常系", error);
    return error;
  });

// // 異常系
// try {
//   safeFetchData(false)
//     .asyncMap(async (data) => {
//       const resData = await data;

//       console.log("safeFetchData:異常系", resData);
//       return resData;
//     })
//     .mapErr((error) => {
//       console.log("safeFetchData:異常系", error);
//       return error;
//     });
// } catch (error) {
//   console.log("catch error");
// }
