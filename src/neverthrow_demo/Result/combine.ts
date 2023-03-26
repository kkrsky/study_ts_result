import { Result, ok, err } from "neverthrow";

const result1 = ok(2);
const result2 = ok("foo");
const result3 = err("Something went wrong");

const resultList = [result1, result2, result3];
// const combinedResult: Result<[number, string, boolean], string> = combine(result1, result2, result3);
// console.log(combinedResult); // Err('Something went wrong')

const combinedList = Result.combine(resultList);
console.log(combinedList);
