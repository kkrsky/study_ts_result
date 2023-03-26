import { Result, ok, err } from "neverthrow";

const result1 = ok(2);
const result2 = err("my error");
const result3 = ok("foo");
const result4 = err("Something went wrong");

const resultList = [result1, result2, result3, result4];

const combinedList = Result.combine(resultList);
console.log("combinedList:", combinedList);

const combinedAllErrorsList = Result.combineWithAllErrors(resultList);
console.log("combinedAllErrorsList:", combinedAllErrorsList);
