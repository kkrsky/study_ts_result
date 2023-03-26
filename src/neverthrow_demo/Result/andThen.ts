import { Result, err, ok } from "neverthrow";

const sq = (n: number): Result<number, number> => ok(n ** 2);

ok(2).andThen(sq).andThen(sq); // Ok(16)

ok(2).andThen(sq).andThen(err); // Err(4)

ok(2).andThen(err).andThen(sq); // Err(2)

err(3).andThen(sq).andThen(sq); // Err(3)
