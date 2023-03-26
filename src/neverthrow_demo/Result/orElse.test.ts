import { Result, err, ok } from "neverthrow";

enum DatabaseError {
  PoolExhausted = "PoolExhausted",
  NotFound = "NotFound",
}

test("test orElse", () => {
  const dbQueryResult: Result<string, DatabaseError> = err(
    DatabaseError.NotFound
  );

  const updatedQueryResult = dbQueryResult.orElse((dbError) =>
    dbError === DatabaseError.NotFound
      ? ok("User does not exist") // error recovery branch: ok() must be called with a value of type string
      : //
        //
        // err() can be called with a value of any new type that you want
        // it could also be called with the same error value
        //
        //     err(dbError)
        err(500)
  );

  expect(updatedQueryResult._unsafeUnwrap()).toBe("User does not exist");

  const dbQueryResult2: Result<string, DatabaseError> = err(
    DatabaseError.PoolExhausted
  );

  const updatedQueryResult2 = dbQueryResult2.orElse((dbError) =>
    dbError === DatabaseError.NotFound
      ? ok("User does not exist") // error recovery branch: ok() must be called with a value of type string
      : //
        //
        // err() can be called with a value of any new type that you want
        // it could also be called with the same error value
        //
        //     err(dbError)
        err(500)
  );

  expect(updatedQueryResult2._unsafeUnwrapErr()).toBe(500);
});
