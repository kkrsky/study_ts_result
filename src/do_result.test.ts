import { validFunc } from "./do_result";
import { isErr } from "./result";

let validResult = validFunc("hello");

if (isErr(validResult)) {
  console.log("Error:", validResult);
} else {
  console.log("Success:", validResult.value);
}

validResult = validFunc(10);

if (isErr(validResult)) {
  console.log("Error:", validResult);
} else {
  console.log("Success:", validResult.value);
}

validResult = validFunc(true);

if (isErr(validResult)) {
  console.log("Error:", validResult);
} else {
  console.log("Success:", validResult.value);
}
