import Benchmark from "benchmark";
import { auth } from "../src/auth";
const suite = new Benchmark.Suite();
console.log(new Date().toString());
suite
  .add("auth", function () {
    auth(
      //@ts-ignore
      {
        headers: {
          "x-jwt-payload":
            "ewogICJzdWIiOiAiMTIzc2Q0NTY3ODkwIiwKICAibmFtZSI6ICJKb2huIERvZSIsCiAgImV4cCI6IDE2ODI4MDYwMjMxMTksCiAgImFkbWluIjogdHJ1ZQp9",
        },
      },
      { admin: true }
    );
  })
  // add listeners
  .on("cycle", function (event: { target: any }) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run();
// run async
