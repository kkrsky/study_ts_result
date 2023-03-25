export class DataIsStringError extends Error {
  constructor(name: string, message?: string) {
    super(message);
    this.name = name;
  }
}

export class DataIsNumberError extends Error {
  constructor(name: string, message?: string) {
    super(message);
    this.name = name;
  }
}

export const validFunc = <T>({ data }: { data: T }) => {
  try {
    if (typeof data === "string")
      throw new DataIsStringError("DataIsStringError");

    if (typeof data === "number")
      throw new DataIsNumberError("DataIsNumberError");

    console.log("正常系");
  } catch (err) {
    if (err instanceof DataIsStringError) {
      console.log("this is DataIsStringError");
      return;
    }

    if (err instanceof DataIsNumberError) {
      console.log("this is DataIsNumberError");
      return;
    }

    console.log("this is else");
  }
};
