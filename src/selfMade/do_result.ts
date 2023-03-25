import { Result, ok, err } from "./result";

export type ValidError = { type: "DataIsString" } | { type: "DataIsNumber" };

type Data = String | Number | Boolean;

export type ValidFunc = (data: Data) => Result<Data, ValidError>;

export const validFunc: ValidFunc = (data) => {
  if (typeof data === "string") return err({ type: "DataIsString" });

  if (typeof data === "number") return err({ type: "DataIsNumber" });

  console.log("正常系");
  return ok(data as Data);
};
